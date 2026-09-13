import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy, terms & disclaimer",
};

export default function LegalPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-28 md:px-8">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-display text-5xl">The fine print</h1>
        <p className="mt-4 text-muted">{site.partnerDisclaimer}</p>

        <section id="disclaimer" className="mt-14">
          <h2 className="font-display text-3xl">Wellness disclaimer</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
            <p>
              Strip Recovery markets elective wellness visits. We do not
              diagnose, treat, cure, or prevent disease. We do not treat alcohol
              poisoning, provide medical detox, or “cure hangovers.” Language
              such as rehydrate, reset, and feel more like yourself describes a
              wellness experience — not a clinical outcome.
            </p>
            <p>
              Services are for adults 18 years or older. If you have a medical
              emergency, chest pain, trouble breathing, confusion, or suspect
              alcohol poisoning, call 911. Do not use this site for emergency
              care.
            </p>
            <p>
              Formulas are clinician-approved through partner operators and
              administered by licensed nurses. Suitability is determined at the
              visit. We may decline service.
            </p>
          </div>
        </section>

        <section id="privacy" className="mt-14">
          <h2 className="font-display text-3xl">Privacy</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
            <p>
              We collect what you type on the booking form (name, phone, hotel /
              area, timing, party size, optional add-ons) plus advertising
              attribution (UTMs, click IDs) so we can fulfill the visit and
              measure ads.
            </p>
            <p>
              We share that packet with the partner fulfillment team. We do not
              sell your number. We may text or call about this booking. We do
              not store patient charts or PHI on this marketing site.
            </p>
            <p>
              Meta, Google, or similar pixels may run if a pixel ID is
              configured, to measure LanderView, BookClick, and BookSubmit. You
              can use platform ad settings and browser controls to limit ads.
            </p>
            <p>
              Contact: {site.email}. This policy can be updated; the date on
              this page is the source of truth.
            </p>
          </div>
        </section>

        <section id="terms" className="mt-14">
          <h2 className="font-display text-3xl">Terms</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
            <p>
              Submitting a request is not a confirmed appointment until a
              coordinator texts or calls you. Pricing starts at the figure shown
              and may change with add-ons, group size, or location outside the
              Strip corridor. Travel fee is $0 on the corridor as messaged;
              that can be edited in config.
            </p>
            <p>
              You confirm you are 18+. You agree we may contact you at the
              number provided about this visit. Cancellation and no-show terms
              are given on confirm.
            </p>
            <p>
              This site is provided as-is for marketing. Las Vegas, Nevada
              governing law, without conflict rules.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
