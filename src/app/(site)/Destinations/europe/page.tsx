import type { Metadata } from "next";
import { getDestinations } from "@/sanity/lib/content";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { destinationHref } from "@/lib/travel";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import EuropeView from "./EuropeView";

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: "Middle East Tours: Dubai, Petra, Cairo & More",
  description: "Tailored Middle East trips: Dubai, Doha, Petra, Cairo and Giza and more, each with a day-by-day itinerary, culture notes and travel tips.",
  path: "/Destinations/europe",
  image: "/images/asia/dubai.webp",
});

export default async function EuropePage() {
  const destinations = await getDestinations("europe");
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/Destinations" },
            { name: "Middle East", path: "/Destinations/europe" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Middle East Tours: Dubai, Petra, Cairo & More",
            itemListElement: destinations.map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: d.name,
              url: `${SITE_URL}${destinationHref("europe", d.name)}`,
            })),
          },
        ]}
      />
      <EuropeView destinations={destinations} />
    </>
  );
}
