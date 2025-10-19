"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TagBadge from "./TagBadge";
import { Destination } from "@/types/destination";

interface Props {
  destination: Destination;
  onSelect: (dest: Destination) => void;
  onClick?: () => void;
}

export default function DestinationCard({ destination, onSelect }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg w-full h-[350px] sm:h-[400px] lg:h-[420px]" // ✅ consistent card height
      onClick={() => onSelect(destination)}
    >
      {/* Image fills the container */}
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority
      />

      {/* Overlay gradient & content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
        <h3 className="text-2xl text-white font-bold">{destination.name}</h3>
        <div className="flex flex-wrap text-white gap-2 mt-2">
          {destination.tags.map((tag, idx) => (
            <TagBadge key={idx} tag={tag} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
