"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Destination } from "@/types/destination";

interface Props {
  destination: Destination;
  onClose: () => void;
}

export default function DestinationModal({ destination, onClose }: Props) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // ✅ click anywhere to close
    >
      {/* Modal content */}
      <div
        className="bg-wanderer-moss rounded-2xl w-11/12 max-w-6xl h-[80vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()} // ✅ prevent closing when clicking inside
      >
        {/* Image Side */}
        <div className="relative">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-wanderer-gold py-2 px-4 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Details Side */}
        <div className="p-8 overflow-auto">
          <h2 className="text-3xl font-bold text-black mb-4">
            {destination.name}
          </h2>
          <p className="text-neutral-200 mb-6">{destination.whyVisit}</p>

          <h4 className="text-xl font-semibold mb-2 text-wanderer-gold">
            Itinerary ({destination.duration} days)
          </h4>
          <ul className="list-decimal list-inside mb-4 text-neutral-200 space-y-1">
            {destination.itinerary.map((item, i) => (
              <li key={i}>
                <strong>{item.day}:</strong> {item.details}
              </li>
            ))}
          </ul>

          <h4 className="text-xl font-semibold mb-2 text-wanderer-gold">
            Culture & Food
          </h4>
          <p className="text-neutral-200 mb-4">{destination.culture}</p>

          <h4 className="text-xl font-semibold text-wanderer-gold mb-2">
            Insider Tips
          </h4>
          <p className="text-neutral-200">{destination.tips}</p>
        </div>
      </div>
    </motion.div>
  );
}
