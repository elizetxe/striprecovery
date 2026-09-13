"use client";

import { useId, useState } from "react";
import { faqs } from "@/lib/faq";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="divide-y divide-[var(--hair)] border-y border-[var(--hair)]">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        const panel = `${base}-p-${i}`;
        const btn = `${base}-b-${i}`;
        return (
          <div key={item.q}>
            <button
              id={btn}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panel}
              className="flex w-full items-start justify-between gap-6 py-5 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-display text-xl text-ink md:text-[1.35rem]">
                {item.q}
              </span>
              <span
                className="mt-1 text-gold"
                aria-hidden
              >
                {isOpen ? "–" : "+"}
              </span>
            </button>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              hidden={!isOpen}
              className="pb-5 text-[0.95rem] leading-relaxed text-muted"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
