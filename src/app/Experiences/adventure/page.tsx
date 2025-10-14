// src/app/experiences/adventure/page.tsx
"use client";

import { AdventureExperiences } from "@/data/adventure";
import ExperiencePageLayout from "@/components/Experiences/ExperiencePageLayout";

export default function AdventurePage() {
  return (
    <ExperiencePageLayout
      title="Adventure Travel"
      subtitle="Thrill-seeking adventures across mountains, forests, and oceans."
      heroImage="/images/adventure/interlaken-paragliding.jpeg"
      experiences={AdventureExperiences}
    />
  );
}
