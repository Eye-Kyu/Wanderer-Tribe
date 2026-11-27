// src/app/experiences/adventure/page.tsx

import { getExperiences } from "@/sanity/lib/content";
import ExperiencePageLayout from "@/components/Experiences/ExperiencePageLayout";

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

export default async function AdventurePage() {
  const adventureExperiences = await getExperiences("adventure");
  return (
    <ExperiencePageLayout
      title="Adventure Travel"
      subtitle="Thrill-seeking adventures across mountains, forests, and oceans."
      heroImage="/images/adventure/interlaken-paragliding.jpeg"
      experiences={adventureExperiences}
    />
  );
}
