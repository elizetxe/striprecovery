import { offer, site } from "@/lib/config";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${site.name} — ${offer.name}`,
    brand: { "@type": "Brand", name: site.name },
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      parentOrganization: { "@type": "Organization", name: "Longevity Vegas" },
    },
    areaServed: "Las Vegas Strip, Nevada",
    description:
      "Mobile post-celebration wellness drip. Licensed nurse to Strip hotels. Elective wellness, not medical treatment.",
    offers: {
      "@type": "Offer",
      price: offer.priceFrom,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
