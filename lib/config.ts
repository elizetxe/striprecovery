export const site = {
  name: "Strip Recovery",
  subtitle: "by Longevity Vegas",
  tagline: "We come to you.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://striprecovery.vercel.app",
  email: "book@striprecovery.com",
  notifyEmail:
    process.env.BOOKING_NOTIFY_EMAIL ?? "joshuaelizetxe@gmail.com",
  quizUrl: "https://longevityvegas.com",
  couponPrefix: "SR-",
  /**
   * Set a CallRail / partner tracking number when you have one.
   * Leave phoneEnabled false until a real line is staffed — form is the conversion.
   */
  phoneEnabled: Boolean(process.env.NEXT_PUBLIC_PHONE_TEL),
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "(702) 000-0000",
  phoneTel: process.env.NEXT_PUBLIC_PHONE_TEL ?? "",
  hours: "8am–10pm, 7 days",
  eta: "typically 45–90 minutes",
  serviceArea: "Hotels across the Strip corridor",
  partnerDisclaimer:
    "Strip Recovery is an acquisition brand of Longevity Vegas. Visits are fulfilled by licensed partner nurses and clinician-approved wellness formulas. This is elective wellness — not a medical practice, diagnosis, treatment, or emergency service.",
} as const;

export const offer = {
  id: "aftermath",
  name: "Aftermath",
  eyebrow: "The reset drip",
  priceFrom: 249,
  travelFee: 0,
  duration: "About 45 minutes in-room",
  blurb:
    "Post-celebration wellness in your hotel. Fluids, electrolytes, and a vitamin blend — given by a licensed nurse. Built to help you rehydrate and feel more like yourself.",
  includes: [
    "Licensed nurse to your room",
    "Fluids + electrolytes",
    "Vitamin blend (partner formula)",
    "No travel fee on the Strip corridor",
  ],
  addons: [
    {
      id: "glutathione",
      name: "Glutathione boost",
      price: 49,
      blurb: "Antioxidant add-on. Placeholder price — edit in config.",
    },
    {
      id: "vitc",
      name: "Vitamin C boost",
      price: 29,
      blurb: "Wellness add-on. Placeholder price — edit in config.",
    },
  ],
} as const;

export const whenOptions = [
  { id: "asap", label: "ASAP", hint: "Soonest nurse" },
  { id: "today", label: "Today", hint: "This afternoon" },
  { id: "tonight", label: "Tonight", hint: "After 6pm" },
] as const;

export const partyOptions = [
  { id: "1", label: "1" },
  { id: "2", label: "2" },
  { id: "3-4", label: "3–4" },
  { id: "5+", label: "5+" },
] as const;

export const groupNote =
  "2+ rooms or a full suite: tell us the headcount. Group rate is set on confirm — no public price yet.";

export type WhenId = (typeof whenOptions)[number]["id"];
export type PartyId = (typeof partyOptions)[number]["id"];
export type AddonId = (typeof offer.addons)[number]["id"];
