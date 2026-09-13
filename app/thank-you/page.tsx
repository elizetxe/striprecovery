import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Pixel } from "@/components/Pixel";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "You’re booked in",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  const display = code && /^SR-[A-Z0-9]{4}$/.test(code) ? code : `${site.couponPrefix}HOLD`;

  return (
    <>
      <Pixel />
      <Nav />
      <main className="mx-auto flex min-h-[100svh] max-w-xl flex-col justify-center px-5 py-28 text-center">
        <p className="eyebrow">Request received</p>
        <h1 className="mt-4 font-display text-5xl md:text-6xl">
          Sit tight. We’re on it.
        </h1>
        <p className="mt-5 text-muted">
          A coordinator will text within 60 seconds to confirm hotel, room, and
          arrival window. Show this code at the visit.
        </p>
        <p className="mt-10 rounded-2xl border border-[var(--hair)] bg-panel px-6 py-8 font-display text-4xl tracking-[0.2em] text-gold">
          {display}
        </p>
        <ol className="mt-10 space-y-3 text-left text-sm text-muted">
          <li>1. Keep your phone on. We text first.</li>
          <li>2. Have hotel + room ready (tower if you have one).</li>
          <li>3. Nurse arrives discreetly. You stay in the room.</li>
          <li>4. No charge until the visit is confirmed.</li>
        </ol>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {site.phoneEnabled ? (
            <a href={`tel:${site.phoneTel}`} className="ghost-btn">
              Call {site.phoneDisplay}
            </a>
          ) : null}
          <Link href="/" className="gold-btn">
            Back to Strip Recovery
          </Link>
        </div>
        <p className="mt-8 text-xs text-muted">
          Not urgent after all?{" "}
          <a href={site.quizUrl} className="text-gold">
            Longevity Vegas quiz
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
