"use client";

import { Experience } from "@/types/experience";
import Image from "next/image";

interface Props {
  experience: Experience;
  onSelect: () => void;
}

export default function ExperienceCard({ experience, onSelect }: Props) {
  return (
    <div
      className="cursor-pointer rounded-xl bg-gradient-to-t from-[#33573b] to-transparent overflow-hidden shadow-lg shadow-black hover:shadow-xl transition"
      onClick={onSelect}
    >
      <Image
        src={experience.image}
        alt={experience.name}
        className="w-full h-full object-cover"
        width={400}
        height={224}
      />
      <div className="p-4">
        <h3 className="text-xl text-white font-semibold">{experience.name}</h3>
        <p className="text-sm text-black">{experience.location}</p>

        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-wanderer-gold text-gray-800 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
