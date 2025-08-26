// src/app/experiences/luxury/page.tsx
"use client";

import { LuxuryExperiences } from "@/data/luxury";
import ExperiencePageLayout from "@/components/Experiences/ExperiencePageLayout";

export default function LuxuryPage() {
  return (
    <ExperiencePageLayout
      title="Luxury Escapes"
      subtitle="Indulge in unparalleled comfort, elegance, and exclusive experiences."
      heroImage="/images/experiences/luxury-hero.jpg"
      experiences={LuxuryExperiences}
    />
  );
}
