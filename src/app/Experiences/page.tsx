"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WellnessExperiences } from "@/data/wellness";
import { AdventureExperiences } from "@/data/adventure";
import { LuxuryExperiences } from "@/data/luxury";
import ExperienceCard from "@/components/Experiences/ExperienceCard";

type Section = "wellness" | "adventure" | "luxury";

const sectionMap = {
  wellness: { title: "Wellness Retreats", data: WellnessExperiences },
  adventure: { title: "Adventure Travel", data: AdventureExperiences },
  luxury: { title: "Luxury Escapes", data: LuxuryExperiences },
};

export default function ExperiencesPage() {
  const [activeSection, setActiveSection] = useState<Section>("wellness");

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* Page Heading */}
      <motion.h2
        className="text-5xl md:text-6xl font-heading text-center text-[#2D5BD2] mb-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Explore Experiences
      </motion.h2>

      {/* Dropdown / Tabs to switch section */}
      <div className="flex justify-center mb-12 space-x-4">
        {(["wellness", "adventure", "luxury"] as Section[]).map((section) => (
          <button
            key={section}
            onClick={() => handleSectionChange(section)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              activeSection === section
                ? "bg-[#2D5BD2] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {sectionMap[section].title}
          </button>
        ))}
      </div>

      {/* Experiences Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {sectionMap[activeSection].data.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onSelect={() => console.log(`Selected: ${experience.name}`)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
