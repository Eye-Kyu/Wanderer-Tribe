import type { Metadata } from "next";
import { getDestinations } from "@/sanity/lib/content";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { destinationHref } from "@/lib/travel";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import AsiaView from "./AsiaView";

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: "Asia Tours & Holidays",
  description: "Tailored Asia trips: Kyoto, Bali, Bangkok, Mount Fuji and more, with day-by-day itineraries, culture notes and travel tips for each destination.",
  path: "/Destinations/asia",
  image: "/images/asia/beijing.webp",
});

export default async function AsiaPage() {
  const destinations = await getDestinations("asia");
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/Destinations" },
            { name: "Asia", path: "/Destinations/asia" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Asia Tours & Holidays",
            itemListElement: destinations.map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: d.name,
              url: `${SITE_URL}${destinationHref("asia", d.name)}`,
            })),
          },
        ]}
      />
      <AsiaView destinations={destinations} />
    </>
  );
}
