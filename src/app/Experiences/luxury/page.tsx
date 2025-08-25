"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LuxuryExperiences } from "@/data/luxury";
import ExperienceCard from "@/components/Experiences/ExperienceCard";
import ExperienceModal from "@/components/Experiences/ExperienceModal";

export default function LuxuryPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <motion.h2
        className="text-5xl md:text-6xl font-heading text-center text-[#D27D2D] mb-16"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Luxury Escapes
      </motion.h2>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {LuxuryExperiences.map((exp, idx) => (
          <ExperienceCard
            key={exp.id}
            experience={exp}
            onSelect={() => setSelected(idx)}
          />
        ))}
      </div>

      {selected !== null && (
        <ExperienceModal
          experience={LuxuryExperiences[selected]}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
