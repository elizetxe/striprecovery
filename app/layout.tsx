import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import { site } from "@/lib/config";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Strip Recovery — Nurse to your Strip hotel. Aftermath from $249",
    template: "%s · Strip Recovery",
  },
  description:
    "Feeling wrecked on the Strip? A licensed nurse comes to your hotel. Aftermath recovery drip from $249. Discreet. No travel fee. Book in 45 seconds.",
  keywords: [
    "Las Vegas mobile IV",
    "Strip hotel IV",
    "Aftermath drip Las Vegas",
    "mobile wellness Las Vegas",
  ],
  openGraph: {
    title: "Feeling wrecked on the Strip?",
    description:
      "Licensed nurse to your hotel. Aftermath from $249. We come to you.",
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strip Recovery",
    description: "Nurse to your Strip hotel. Aftermath from $249.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-void text-ink">
        <a className="skip-link" href="#book">
          Skip to booking
        </a>
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
