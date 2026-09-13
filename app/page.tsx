import Image from "next/image";
import { BookFormFrame } from "@/components/BookFormFrame";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Pixel } from "@/components/Pixel";
import { StickyCta } from "@/components/StickyCta";
import { groupNote, offer, site } from "@/lib/config";

const steps = [
  {
    n: "01",
    title: "Book",
    body: "Name, mobile, hotel, when. Forty-five seconds. We text back.",
  },
  {
    n: "02",
    title: "Nurse arrives",
    body: "Licensed, discreet, to your room. No lobby walk of shame.",
  },
  {
    n: "03",
    title: "Reset",
    body: "Sit. Rehydrate. Feel more like yourself before checkout — or tonight.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd />
      <Pixel lander />
      <Nav />
      <main>
        <section className="relative min-h-[100svh] overflow-hidden">
          <Image
            src="/images/hero.jpg"
            alt="Las Vegas hotel suite at dawn, looking toward the Strip"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_50%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,6,10,0.88)_0%,rgba(7,6,10,0.55)_48%,rgba(7,6,10,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,6,10,0.75),transparent_42%)]" />

          <div className="relative mx-auto grid max-w-[var(--page)] gap-10 px-5 pb-16 pt-28 md:grid-cols-[1.05fr_0.95fr] md:items-end md:px-8 md:pb-20 md:pt-36">
            <div>
              <p className="eyebrow">Strip corridor · mobile · discreet</p>
              <h1 className="mt-4 max-w-[14ch] font-display text-[3.15rem] leading-[0.92] text-ink md:text-[4.6rem]">
                Feeling wrecked on the Strip?
              </h1>
              <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink/85">
                A licensed nurse comes to your hotel. Aftermath reset drip from $
                {offer.priceFrom}. No travel fee. You stay in the room.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-gold">
                <li className="rounded-full border border-[var(--hair)] px-3 py-1.5">
                  Licensed nurses
                </li>
                <li className="rounded-full border border-[var(--hair)] px-3 py-1.5">
                  Discreet arrival
                </li>
                <li className="rounded-full border border-[var(--hair)] px-3 py-1.5">
                  {site.serviceArea}
                </li>
              </ul>
              <div className="mt-8 hidden gap-3 md:flex">
                <a href="#book" className="gold-btn">
                  Book the visit
                </a>
                <a href="#how" className="ghost-btn">
                  How it works
                </a>
              </div>
            </div>
            <BookFormFrame variant="card" />
          </div>
        </section>

        <section className="border-y border-[var(--hair)] bg-void-2">
          <div className="mx-auto grid max-w-[var(--page)] grid-cols-2 gap-px md:grid-cols-4">
            {[
              "Licensed nurses",
              "No travel fee",
              "Hotels on the corridor",
              "Adults 18+",
            ].map((item) => (
              <p
                key={item}
                className="px-5 py-4 text-center text-[0.72rem] uppercase tracking-[0.2em] text-muted"
              >
                {item}
              </p>
            ))}
          </div>
        </section>

        <section id="how" className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-[var(--page)] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem]">
              <Image
                src="/images/nurse.jpg"
                alt="Discreet licensed nurse arriving at a hotel suite"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow">Three steps</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">
                Book. Nurse arrives. Reset.
              </h2>
              <ol className="mt-10 space-y-8">
                {steps.map((step) => (
                  <li key={step.n} className="flex gap-5">
                    <span className="font-display text-3xl text-gold">{step.n}</span>
                    <div>
                      <h3 className="text-lg text-ink">{step.title}</h3>
                      <p className="mt-1 text-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="px-5 py-6 md:px-8">
          <div className="mx-auto grid max-w-[var(--page)] overflow-hidden rounded-[1.8rem] border border-[var(--hair)] bg-panel lg:grid-cols-2">
            <div className="relative min-h-[18rem]">
              <Image
                src="/images/drip.jpg"
                alt="Aftermath wellness drip in a luxury hotel suite"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-7 md:p-10">
              <p className="eyebrow">{offer.eyebrow}</p>
              <h2 className="mt-3 font-display text-4xl">{offer.name}</h2>
              <p className="mt-2 text-gold">
                from ${offer.priceFrom} · {offer.duration}
              </p>
              <p className="mt-4 text-muted">{offer.blurb}</p>
              <ul className="mt-6 space-y-2 text-sm text-ink/90">
                {offer.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-gold">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#book" className="gold-btn">
                  Book Aftermath
                </a>
                <a href="/book?glutathione=1" className="ghost-btn">
                  Add a boost
                </a>
              </div>
              <p className="mt-4 text-xs text-muted">
                Elective wellness. Not a hangover cure, detox, or medical treatment.
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-[var(--page)] items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Bachelor · bachelorette · suites</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">
                2+ rooms. Same corridor. One text.
              </h2>
              <p className="mt-4 max-w-md text-muted">{groupNote}</p>
              <a href="/book?party=5%2B" className="gold-btn mt-8">
                Book a group
              </a>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem]">
              <Image
                src="/images/suite.jpg"
                alt="Luxury Strip suite living room in morning light"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-16 md:px-8">
          <div className="absolute inset-0">
            <Image
              src="/images/corridor.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-void/70" />
          </div>
          <div className="relative mx-auto max-w-[var(--page)] text-center">
            <p className="eyebrow">Stay in the room</p>
            <p className="mx-auto mt-4 max-w-2xl font-display text-3xl md:text-5xl">
              Hotel corridor energy. Not a clinic. Not a frat house. A nurse at the door.
            </p>
          </div>
        </section>

        <section id="faq" className="px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-3 font-display text-4xl">Straight answers</h2>
            <div className="mt-10">
              <Faq />
            </div>
            <p className="mt-10 text-sm text-muted">
              Not urgent?{" "}
              <a href={site.quizUrl} className="text-gold underline decoration-gold/30">
                Take the Longevity Vegas quiz →
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
