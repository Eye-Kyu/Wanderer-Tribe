"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Destinations } from "@/data/europe";
import DestinationCard from "@/components/DestinatioCard";
import DestinationModal from "@/components/DestinationModal";
import TagFilter from "@/components/TagFilter";
import { Destination } from "@/types/destination";

export default function EuropePage() {
  const [filteredDestinations, setFilteredDestinations] =
    useState<Destination[]>(Destinations);
  const [selected, setSelected] = useState<Destination | null>(null);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* Animated heading */}
      <motion.h2
        className="text-5xl md:text-6xl font-heading text-center text-[#2D5BD2] mb-16"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Discover Europe
      </motion.h2>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-10">
        <TagFilter
          destinations={Destinations}
          onFilter={setFilteredDestinations}
        />
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
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
  );
}
