"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Destinations } from "@/data/europe";
import DestinationCard from "@/components/DestinatioCard";
import DestinationModal from "@/components/DestinationModal";
import TagFilter from "@/components/TagFilter";
import { Destination } from "@/types/destination";
import HeroImage from "@/components/InnerHeroImage";

export default function EuropePage() {
  const [filteredDestinations, setFilteredDestinations] =
    useState<Destination[]>(Destinations);
  const [selected, setSelected] = useState<Destination | null>(null);

  return (
    <div className="bg-[#152523]">
      <HeroImage src="/images/asia/dubai.webp" overlay="bg-black/50">
        <div>
          <h1 className="text-5xl font-bold mb-3">Welcome to Wanderer</h1>
          <p className="text-lg">Discover breathtaking destinations</p>
        </div>
      </HeroImage>

      <section className="py-20 px-6 max-w-7xl mx-auto ">
        {/* Animated heading */}
        <motion.h2
          className="text-5xl md:text-6xl font-heading text-center text-white mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover The Middle East
        </motion.h2>

        {/* Filter Dropdown */}
        <div className="flex justify-center mb-10">
          <TagFilter
            destinations={Destinations}
            onFilter={setFilteredDestinations}
          />
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-2 gap-6 space-y-6">
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onSelect={() => setSelected(destination)}
            />
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <DestinationModal
            destination={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </section>
    </div>
  );
}
