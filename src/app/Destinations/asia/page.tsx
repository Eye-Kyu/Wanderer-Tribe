"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Destinations } from "@/data/asia";
import DestinationCard from "@/components/DestinatioCard";
import DestinationModal from "@/components/DestinationModal";
import TagFilter from "@/components/TagFilter";
import { Destination } from "@/types/destination";
import HeroImage from "@/components/InnerHeroImage";

export default function AsiaPage() {
  const [filteredDestinations, setFilteredDestinations] =
    useState<Destination[]>(Destinations);
  const [selected, setSelected] = useState<Destination | null>(null);

  return (
    <div className="bg-[#152523]">
      <HeroImage src="/images/asia/beijing.jpeg" overlay="bg-black/50">
        <div>
          <h1 className="text-5xl font-bold mb-3">Welcome to Wanderer</h1>
          <p className="text-lg">Discover breathtaking destinations</p>
        </div>
      </HeroImage>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        {/* Animated heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-heading text-center mb-12 text-white"
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
    </div>
  );
}
