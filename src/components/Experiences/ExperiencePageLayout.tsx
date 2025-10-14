// src/components/Experiences/ExperiencePageLayout.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExperienceHero from "./ExperienceHero";
import ExperienceCard from "./ExperienceCard";
import ExperienceModal from "./ExperienceModal";
import { Experience } from "@/types/experience";

interface Props {
  title: string;
  subtitle: string;
  heroImage: string;
  experiences: Experience[];
}

export default function ExperiencePageLayout({
  title,
  subtitle,
  heroImage,
  experiences,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags for the dropdown
  const allTags = Array.from(new Set(experiences.flatMap((exp) => exp.tags)));

  const filteredExperiences = activeTag
    ? experiences.filter((exp) => exp.tags.includes(activeTag))
    : experiences;

  return (
    <div className="bg-[#152523] space-y-9">
      <ExperienceHero title={title} subtitle={subtitle} image={heroImage} />

      {/* Tag Filter Dropdown */}
      <div className="flex justify-center mb-8 space-x-4 ">
        <select
          value={activeTag || ""}
          onChange={(e) =>
            setActiveTag(e.target.value === "" ? null : e.target.value)
          }
          className="px-4 md:px-5 py-2 rounded-lg text-bronze bg-wanderer-ivory"
        >
          <option value="">All Experiences</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag} className="bg-wanderer-gold">
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Experiences Grid */}
      <section className="py-12 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag || "all"}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {filteredExperiences.map((exp, idx) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                onSelect={() => setSelected(idx)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {selected !== null && (
        <ExperienceModal
          experience={filteredExperiences[selected]}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
