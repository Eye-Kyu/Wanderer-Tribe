
import { getExperiences } from "@/sanity/lib/content";
import ExperiencePageLayout from "@/components/Experiences/ExperiencePageLayout";

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

export default async function WellnessPage() {
  const wellnessExperiences = await getExperiences("wellness");
  return (
    <ExperiencePageLayout
      title="Wellness Retreats"
      subtitle="Reconnect, rejuvenate, and find inner balance in breathtaking destinations."
      heroImage="/images/bali-yoga.jpeg"
      experiences={wellnessExperiences}
    />
  );
}
