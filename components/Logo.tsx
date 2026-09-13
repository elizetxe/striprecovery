import Link from "next/link";
import { site } from "@/lib/config";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} home`}>
      <span
        className="grid h-9 w-9 place-items-center rounded-full border border-[var(--hair)] text-[0.7rem] font-semibold tracking-[0.18em] text-gold"
        aria-hidden
      >
        SR
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[1.2rem] tracking-wide text-ink">
          {site.name}
        </span>
        {compact ? null : (
          <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-muted">
            {site.subtitle}
          </span>
        )}
      </span>
    </Link>
  );
}
