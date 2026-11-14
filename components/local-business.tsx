import { lessonCatalog } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { instagramUrl, site, siteUrl } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const prices = lessonCatalog.map((lesson) => lesson.priceCents);
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const sameAs = instagramUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.legalName,
    url: siteUrl(),
    image: `${siteUrl()}/opengraph-image`,
    telephone: site.phoneTel,
    email: site.email,
    priceRange: `${formatMoney(low)}–${formatMoney(high)}`,
    currenciesAccepted: "ZAR",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.streetAddress,
      addressLocality: "Muizenberg",
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: site.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:30",
      closes: "17:00",
    },
    areaServed: "Muizenberg, Cape Town",
    ...(sameAs ? { sameAs: [sameAs] } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
