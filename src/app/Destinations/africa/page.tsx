// src/app/africa/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Destinations } from "@/data/africa";
import DestinationCard from "@/components/DestinatioCard";
import DestinationModal from "@/components/DestinationModal";
import TagFilter from "@/components/TagFilter";
import { Destination } from "@/types/destination";
import HeroImage from "@/components/InnerHeroImage";

export default function AfricaPage() {
  const [selectedDestination, setSelectedDestination] = useState<number | null>(
    null
  );
  const [filteredDestinations, setFilteredDestinations] =
    useState<Destination[]>(Destinations);

  return (
    <div className="bg-[#152523]">
      <HeroImage src="/images/africa.webp" overlay="bg-black/50">
        <div>
          <h1 className="text-5xl font-bold mb-3">Welcome to Wanderer</h1>
          <p className="text-lg">Discover breathtaking destinations</p>
        </div>
      </HeroImage>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          className="text-5xl md:text-6xl font-heading text-center text-white mb-10"
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
        <div className="columns-1 sm:columns-2 lg:columns-2 gap-3 space-y-6">
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
            destination={
              Destinations.find((d) => d.id === selectedDestination)!
            }
            onClose={() => setSelectedDestination(null)}
          />
        )}
      </section>
    </div>
  );
}
