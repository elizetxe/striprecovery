import { site } from "@/lib/config";
import { Logo } from "./Logo";

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[var(--page)] items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Logo />
        <nav className="flex items-center gap-1 text-sm text-ink/90 md:gap-2">
          <a
            href="/#book"
            className="hidden rounded-full px-3 py-2 text-muted hover:text-ink sm:inline"
          >
            Book
          </a>
          <a
            href="/#faq"
            className="hidden rounded-full px-3 py-2 text-muted hover:text-ink sm:inline"
          >
            FAQ
          </a>
          <a
            href="/legal"
            className="hidden rounded-full px-3 py-2 text-muted hover:text-ink md:inline"
          >
            Legal
          </a>
          {site.phoneEnabled ? (
            <a href={`tel:${site.phoneTel}`} className="ghost-btn min-h-10 px-4 text-sm">
              Call
            </a>
          ) : null}
          <a href="/book" className="gold-btn min-h-10 px-4 text-sm">
            Book now
          </a>
        </nav>
      </div>
    </header>
  );
}
