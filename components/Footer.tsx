import Link from "next/link";
import { site } from "@/lib/config";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--hair)] bg-void-2 px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-[var(--page)] flex-col gap-8 md:flex-row md:justify-between">
        <div className="max-w-md">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {site.partnerDisclaimer}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted">
          <Link href="/book" className="hover:text-gold">
            Book
          </Link>
          <a href="/#faq" className="hover:text-gold">
            FAQ
          </a>
          <Link href="/legal" className="hover:text-gold">
            Privacy, terms & disclaimer
          </Link>
          <a
            href={site.quizUrl}
            className="hover:text-gold"
            rel="noreferrer"
          >
            Not urgent? Longevity Vegas quiz
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-[var(--page)] text-[0.7rem] uppercase tracking-[0.18em] text-muted/80">
        Elective wellness · Adults 18+ · Not emergency care
      </p>
    </footer>
  );
}
