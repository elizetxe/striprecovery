"use client";

import { useEffect, useState } from "react";
import { offer, site } from "@/lib/config";
import { EVENTS, track } from "./track-client";

export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.getElementById("book");
    if (!form) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(form);
    return () => io.disconnect();
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--hair)] bg-[rgba(7,6,10,0.88)] p-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-2">
        {site.phoneEnabled ? (
          <a
            href={`tel:${site.phoneTel}`}
            className="ghost-btn flex-1"
            onClick={() => track(EVENTS.BookClick, { source: "sticky-call" })}
          >
            Call
          </a>
        ) : null}
        <a
          href="/book"
          className="gold-btn flex-[2]"
          onClick={() => track(EVENTS.BookClick, { source: "sticky" })}
        >
          Book · from ${offer.priceFrom}
        </a>
      </div>
    </div>
  );
}
