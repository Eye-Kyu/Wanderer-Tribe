// src/app/experiences/luxury/page.tsx

import { getExperiences } from "@/sanity/lib/content";
import ExperiencePageLayout from "@/components/Experiences/ExperiencePageLayout";

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

export default async function LuxuryPage() {
  const luxuryExperiences = await getExperiences("luxury");
  return (
    <ExperiencePageLayout
      title="Luxury Escapes"
      subtitle="Indulge in unparalleled comfort, elegance, and exclusive experiences."
      heroImage="/images/luxury/french-riviera-yacht.jpeg"
      experiences={luxuryExperiences}
    />
  );
}
