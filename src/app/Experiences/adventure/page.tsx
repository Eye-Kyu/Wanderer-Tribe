"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdventureExperiences } from "@/data/adventure";
import ExperienceCard from "@/components/Experiences/ExperienceCard";
import ExperienceModal from "@/components/Experiences/ExperienceModal";

export default function AdventurePage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <motion.h2
        className="text-5xl md:text-6xl font-heading text-center text-[#2D5BD2] mb-16"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Adventure Travel Experiences
      </motion.h2>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {AdventureExperiences.map((exp, idx) => (
          <ExperienceCard
            key={exp.id}
            experience={exp}
            onSelect={() => setSelected(idx)}
          />
        ))}
      </div>

      {selected !== null && (
        <ExperienceModal
          experience={AdventureExperiences[selected]}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
