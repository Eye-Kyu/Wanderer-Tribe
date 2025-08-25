// src/app/africa/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Destinations } from "@/data/africa";
import DestinationCard from "@/components/DestinatioCard";
import DestinationModal from "@/components/DestinationModal";
import TagFilter from "@/components/TagFilter";
import { Destination } from "@/types/destination";

export default function AfricaPage() {
  const [selectedDestination, setSelectedDestination] = useState<number | null>(
    null
  );
  const [filteredDestinations, setFilteredDestinations] =
    useState<Destination[]>(Destinations);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* Heading */}
      <motion.h2
        className="text-5xl md:text-6xl font-heading text-center text-[#2D5BD2] mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Discover Africa
      </motion.h2>

      {/* Tag Filter */}
      <TagFilter
        destinations={Destinations}
        onFilter={setFilteredDestinations}
      />

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredDestinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onSelect={() => setSelectedDestination(destination.id)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedDestination !== null && (
        <DestinationModal
          destination={Destinations.find((d) => d.id === selectedDestination)!}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </section>
  );
}
