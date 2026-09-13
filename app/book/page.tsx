import type { Metadata } from "next";
import Image from "next/image";
import { BookFormFrame } from "@/components/BookFormFrame";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Pixel } from "@/components/Pixel";
import { offer, site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Book Aftermath — nurse to your hotel",
  description:
    "Book a licensed nurse to your Strip hotel. Aftermath from $249. 45-second form. We text back in under 60 seconds.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{
    hotel?: string;
    when?: string;
    party?: string;
    glutathione?: string;
    vitc?: string;
  }>;
}) {
  const defaults = await searchParams;
  return (
    <>
      <Pixel lander />
      <Nav />
      <main className="relative min-h-[100svh] pt-24">
        <div className="absolute inset-0">
          <Image
            src="/images/corridor.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,6,10,0.92),rgba(7,6,10,0.72))]" />
        </div>
        <div className="relative mx-auto grid max-w-[var(--page)] gap-10 px-5 pb-24 md:grid-cols-[0.9fr_1.1fr] md:items-start md:px-8">
          <div className="pt-4">
            <p className="eyebrow">45 seconds · we text back</p>
            <h1 className="mt-4 font-display text-4xl leading-[0.95] md:text-6xl">
              Book the visit.
            </h1>
            <p className="mt-4 max-w-sm text-muted">
              Aftermath from ${offer.priceFrom}. Licensed nurse to the room.{" "}
              {site.tagline}
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ink/85">
              <li>▸ Name, mobile, hotel, when, party size</li>
              <li>▸ Confirm by text in under 60 seconds</li>
              <li>▸ No charge until the visit</li>
              <li>▸ Adults 18+ · discreet hotel arrival</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-[var(--hair)] bg-[rgba(10,8,14,0.82)] p-5 backdrop-blur-xl md:p-7">
            <BookFormFrame variant="page" defaults={defaults} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
