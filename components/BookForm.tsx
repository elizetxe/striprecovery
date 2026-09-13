"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import {
  offer,
  partyOptions,
  site,
  whenOptions,
  type AddonId,
  type PartyId,
  type WhenId,
} from "@/lib/config";
import { stripHotels } from "@/lib/hotels";
import { EVENTS, readAttribution, track } from "./track-client";

export type BookFormDefaults = {
  hotel?: string;
  when?: string;
  party?: string;
  glutathione?: string;
  vitc?: string;
};

type Props = {
  variant?: "card" | "page";
  defaults?: BookFormDefaults;
};

function isWhen(v: string | undefined): v is WhenId {
  return whenOptions.some((o) => o.id === v);
}
function isParty(v: string | undefined): v is PartyId {
  return partyOptions.some((o) => o.id === v);
}

export function BookForm({ variant = "card", defaults = {} }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState("");

  const initialWhen = isWhen(defaults.when) ? defaults.when : "asap";
  const initialParty = isParty(defaults.party) ? defaults.party : "1";

  const [when, setWhen] = useState<WhenId>(initialWhen);
  const [party, setParty] = useState<PartyId>(initialParty);
  const [addons, setAddons] = useState<AddonId[]>(() => {
    const next: AddonId[] = [];
    if (defaults.glutathione === "1") next.push("glutathione");
    if (defaults.vitc === "1") next.push("vitc");
    return next;
  });

  const total = useMemo(() => {
    return (
      offer.priceFrom +
      offer.addons
        .filter((a) => addons.includes(a.id))
        .reduce((sum, a) => sum + a.price, 0)
    );
  }, [addons]);

  function toggleAddon(id: AddonId) {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") || "")) return;

    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      hotel: String(data.get("hotel") || "").trim(),
      when,
      partySize: party,
      addons,
      notes: String(data.get("notes") || "").trim(),
      ...readAttribution(),
      landingPage: window.location.href,
      referrer: document.referrer,
    };

    if (payload.name.length < 2) {
      setError("Name, please.");
      return;
    }
    if (payload.phone.replace(/\D/g, "").length < 10) {
      setError("A real mobile number — we text to confirm.");
      return;
    }
    if (payload.hotel.length < 2) {
      setError("Which hotel or area?");
      return;
    }

    track(EVENTS.BookClick, { source: "form" });

    start(async () => {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; code?: string; error?: string };
      if (!res.ok || !json.code) {
        setError(json.error || "Could not send. Call or retry.");
        return;
      }
      track(EVENTS.BookSubmit, { code: json.code, when, partySize: party, total });
      router.push(`/thank-you?code=${encodeURIComponent(json.code)}`);
    });
  }

  return (
    <form
      id="book"
      onSubmit={onSubmit}
      className={
        variant === "card"
          ? "relative overflow-hidden rounded-3xl border border-[var(--hair)] bg-[rgba(10,8,14,0.78)] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-6"
          : "relative"
      }
    >
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Book Aftermath</p>
          <p className="mt-1 font-display text-2xl text-ink">Nurse to the room</p>
        </div>
        <p className="text-right text-sm text-muted">
          from <span className="text-lg text-gold">${offer.priceFrom}</span>
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-[0.7rem] uppercase tracking-[0.16em] text-muted">
          Name
          <input
            name="name"
            autoComplete="name"
            required
            className="field mt-1.5"
            placeholder="Name on the room"
          />
        </label>
        <label className="block text-[0.7rem] uppercase tracking-[0.16em] text-muted">
          Mobile
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            className="field mt-1.5"
            placeholder="We’ll text in under 60 seconds"
          />
        </label>
        <label className="block text-[0.7rem] uppercase tracking-[0.16em] text-muted">
          Hotel / area
          <input
            name="hotel"
            list="strip-hotels"
            required
            defaultValue={defaults.hotel ?? ""}
            className="field mt-1.5"
            placeholder="Bellagio, Wynn, Aria…"
          />
          <datalist id="strip-hotels">
            {stripHotels.map((h) => (
              <option key={h} value={h} />
            ))}
          </datalist>
        </label>

        <fieldset>
          <legend className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            When
          </legend>
          <div className="seg mt-1.5 grid-cols-3">
            {whenOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className="seg-btn"
                data-on={when === opt.id}
                onClick={() => setWhen(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            Party size
          </legend>
          <div className="seg mt-1.5 grid-cols-4">
            {partyOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className="seg-btn"
                data-on={party === opt.id}
                onClick={() => setParty(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="space-y-2 rounded-2xl border border-[var(--hair)] p-3">
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            Optional boosts
          </p>
          {offer.addons.map((addon) => {
            const on = addons.includes(addon.id);
            return (
              <label
                key={addon.id}
                className="flex cursor-pointer items-center justify-between gap-3 text-sm"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggleAddon(addon.id)}
                    className="accent-[#e4c36a]"
                  />
                  {addon.name}
                </span>
                <span className="text-gold">+${addon.price}</span>
              </label>
            );
          })}
        </div>

        <input
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden
        />
      </div>

      {error ? (
        <p className="mt-3 text-sm text-[#e8a0a0]" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="gold-btn mt-5 w-full">
        {pending ? "Sending…" : `Request visit · from $${total}`}
      </button>
      <p className="mt-3 text-center text-[0.72rem] leading-relaxed text-muted">
        We’ll text within 60 seconds to confirm. No charge until the visit.
        Adults 18+ only. By tapping, you agree we may text/call about this
        booking and to our{" "}
        <a href="/legal" className="underline decoration-gold/40">
          terms
        </a>
        .
      </p>
      {site.phoneEnabled ? (
        <p className="mt-2 text-center text-[0.72rem] text-muted">
          Faster to talk?{" "}
          <a href={`tel:${site.phoneTel}`} className="text-gold">
            {site.phoneDisplay}
          </a>
        </p>
      ) : null}
    </form>
  );
}
