"use client";

import { WellnessExperiences } from "@/data/wellness";
import ExperiencePageLayout from "@/components/Experiences/ExperiencePageLayout";

export default function WellnessPage() {
  return (
    <ExperiencePageLayout
      title="Wellness Retreats"
      subtitle="Reconnect, rejuvenate, and find inner balance in breathtaking destinations."
      heroImage="/images/experiences/wellness-hero.jpg"
      experiences={WellnessExperiences}
    />
  );
}
