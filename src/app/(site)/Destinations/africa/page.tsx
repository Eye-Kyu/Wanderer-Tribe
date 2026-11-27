import type { Metadata } from "next";
import { getDestinations } from "@/sanity/lib/content";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { destinationHref } from "@/lib/travel";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import AfricaView from "./AfricaView";

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: "Africa Safaris & Tours",
  description: "Tailored Africa trips: Maasai Mara and Serengeti safaris, Cape Town, Victoria Falls, Marrakech, Zanzibar and more, each with a day-by-day itinerary.",
  path: "/Destinations/africa",
  image: "/images/africa.webp",
});

export default async function AfricaPage() {
  const destinations = await getDestinations("africa");
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/Destinations" },
            { name: "Africa", path: "/Destinations/africa" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Africa Safaris & Tours",
            itemListElement: destinations.map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: d.name,
              url: `${SITE_URL}${destinationHref("africa", d.name)}`,
            })),
          },
        ]}
      />
      <AfricaView destinations={destinations} />
    </>
  );
}
