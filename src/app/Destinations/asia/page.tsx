"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Destinations } from "@/data/asia";
import DestinationCard from "@/components/DestinatioCard";
import DestinationModal from "@/components/DestinationModal";
import TagFilter from "@/components/TagFilter";
import { Destination } from "@/types/destination";

export default function AsiaPage() {
  const [filteredDestinations, setFilteredDestinations] =
    useState<Destination[]>(Destinations);
  const [selected, setSelected] = useState<Destination | null>(null);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* Animated heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-heading text-center mb-12 text-[#D27D2D]"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Explore Asia
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
        {filteredDestinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            onSelect={() => setSelected(dest)}
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
