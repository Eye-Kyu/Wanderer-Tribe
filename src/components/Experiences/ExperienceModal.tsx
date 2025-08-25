"use client";

import { Experience } from "@/types/experience";
import { motion } from "framer-motion";

interface Props {
  experience: Experience;
  onClose: () => void;
}

export default function ExperienceModal({ experience, onClose }: Props) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl p-6 max-w-3xl w-full relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-2">{experience.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{experience.location}</p>
        <img
          src={experience.image}
          alt={experience.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="mb-2">{experience.description}</p>
        <ul className="mb-4">
          {experience.highlights.map((h, idx) => (
            <li key={idx}>• {h}</li>
          ))}
        </ul>
        <div>
          <strong>Tips:</strong>
          <ul>
            {experience.tips.map((t, idx) => (
              <li key={idx}>• {t}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
