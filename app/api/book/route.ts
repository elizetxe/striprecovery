import { NextResponse } from "next/server";
import { after } from "next/server";
import { offer, partyOptions, site, whenOptions } from "@/lib/config";
import { makeCoupon } from "@/lib/coupon";
import { ATTR_KEYS } from "@/lib/tracking";

export const runtime = "nodejs";

const hits = new Map<string, { n: number; t: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const row = hits.get(ip);
  if (!row || now - row.t > 10 * 60 * 1000) {
    hits.set(ip, { n: 1, t: now });
    return true;
  }
  if (row.n >= 8) return false;
  row.n += 1;
  return true;
}

function str(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  if (str(body.company)) {
    return NextResponse.json({ ok: true, code: makeCoupon() });
  }

  const name = str(body.name);
  const phone = str(body.phone);
  const hotel = str(body.hotel);
  const when = str(body.when);
  const partySize = str(body.partySize);
  const notes = str(body.notes);
  const addons = Array.isArray(body.addons)
    ? body.addons.map((a) => str(a)).filter(Boolean)
    : [];

  if (name.length < 2 || phone.replace(/\D/g, "").length < 10 || hotel.length < 2) {
    return NextResponse.json({ error: "Name, phone, and hotel are required." }, { status: 400 });
  }
  if (!whenOptions.some((w) => w.id === when)) {
    return NextResponse.json({ error: "Pick a time window." }, { status: 400 });
  }
  if (!partyOptions.some((p) => p.id === partySize)) {
    return NextResponse.json({ error: "Pick a party size." }, { status: 400 });
  }

  const allowedAddons = new Set(offer.addons.map((a) => a.id));
  const cleanAddons = addons.filter((id) => allowedAddons.has(id as typeof offer.addons[number]["id"]));
  const code = makeCoupon();

  const attr: Record<string, string> = {};
  for (const key of ATTR_KEYS) {
    const v = str(body[key]);
    if (v) attr[key] = v;
  }

  const lead = {
    code,
    name,
    phone,
    hotel,
    when,
    partySize,
    addons: cleanAddons,
    notes,
    offer: offer.name,
    priceFrom: offer.priceFrom,
    ...attr,
    landingPage: str(body.landingPage),
    referrer: str(body.referrer),
    ip,
    createdAt: new Date().toISOString(),
  };

  after(async () => {
    const webhook = process.env.BOOKING_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (err) {
        console.error("booking_webhook_failed", err);
      }
    }

    const resend = process.env.RESEND_API_KEY;
    if (resend) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resend}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            from: "Strip Recovery <book@striprecovery.com>",
            to: [site.notifyEmail],
            subject: `${code} · ${when} · ${hotel} · ${name}`,
            text: JSON.stringify(lead, null, 2),
          }),
        });
      } catch (err) {
        console.error("booking_email_failed", err);
      }
    }

    console.info("booking_lead", JSON.stringify(lead));
  });

  return NextResponse.json({ ok: true, code });
}
