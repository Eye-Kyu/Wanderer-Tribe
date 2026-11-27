// src/app/experiences/luxury/page.tsx

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
  title: "Luxury Escapes & Holidays",
  description: "Maldives overwater villas, a private yacht on the French Riviera, safari lodges, luxury trains and private islands: luxury escapes tailored to you.",
  path: "/Experiences/luxury",
  image: "/images/luxury/french-riviera-yacht.webp",
});

export default async function LuxuryPage() {
  const luxuryExperiences = await getExperiences("luxury");
  return (
    <>
    <JsonLd
      data={[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experiences", path: "/Experiences" },
          { name: "Luxury Escapes", path: "/Experiences/luxury" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Luxury Escapes & Holidays",
          itemListElement: luxuryExperiences.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: e.name,
            url: `${SITE_URL}${experienceHref("luxury", e.name)}`,
          })),
        },
      ]}
    />
    <ExperiencePageLayout
      title="Luxury Escapes"
      subtitle="Indulge in unparalleled comfort, elegance, and exclusive experiences."
      heroImage="/images/luxury/french-riviera-yacht.webp"
      experiences={luxuryExperiences}
      category="luxury"
    />
    </>
  );
}
