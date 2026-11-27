
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
  title: "Wellness Retreats & Spa Holidays",
  description: "Yoga in Bali, Ayurveda in Kerala, thermal spas in Iceland, forest bathing in Japan and more wellness retreats, tailored to how you want to rest.",
  path: "/Experiences/wellness",
  image: "/images/bali-yoga.jpeg",
});

export default async function WellnessPage() {
  const wellnessExperiences = await getExperiences("wellness");
  return (
    <>
    <JsonLd
      data={[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experiences", path: "/Experiences" },
          { name: "Wellness Retreats", path: "/Experiences/wellness" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Wellness Retreats & Spa Holidays",
          itemListElement: wellnessExperiences.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: e.name,
            url: `${SITE_URL}${experienceHref("wellness", e.name)}`,
          })),
        },
      ]}
    />
    <ExperiencePageLayout
      title="Wellness Retreats"
      subtitle="Reconnect, rejuvenate, and find inner balance in breathtaking destinations."
      heroImage="/images/bali-yoga.jpeg"
      experiences={wellnessExperiences}
      category="wellness"
    />
    </>
  );
}
