// src/app/experiences/adventure/page.tsx

import type { Metadata } from "next";
import { getExperiences } from "@/sanity/lib/content";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { experienceHref } from "@/lib/travel";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import ExperiencePageLayout from "@/components/Experiences/ExperiencePageLayout";

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: "Adventure Travel Experiences",
  description: "Safari in Kenya, the Inca Trail, rock climbing in Thailand, Kilimanjaro, paragliding in Interlaken and more adventure trips, planned around you.",
  path: "/Experiences/adventure",
  image: "/images/adventure/interlaken-paragliding.webp",
});

export default async function AdventurePage() {
  const adventureExperiences = await getExperiences("adventure");
  return (
    <>
    <JsonLd
      data={[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experiences", path: "/Experiences" },
          { name: "Adventure Travel", path: "/Experiences/adventure" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Adventure Travel Experiences",
          itemListElement: adventureExperiences.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: e.name,
            url: `${SITE_URL}${experienceHref("adventure", e.name)}`,
          })),
        },
      ]}
    />
    <ExperiencePageLayout
      title="Adventure Travel"
      subtitle="Thrill-seeking adventures across mountains, forests, and oceans."
      heroImage="/images/adventure/interlaken-paragliding.webp"
      experiences={adventureExperiences}
      category="adventure"
    />
    </>
  );
}
