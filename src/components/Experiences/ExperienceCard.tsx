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
      className="cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
      onClick={onSelect}
    >
      <Image
        src={experience.image}
        alt={experience.name}
        className="w-full h-56 object-cover"
        width={400}
        height={224}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{experience.name}</h3>
        <p className="text-sm text-gray-600">{experience.location}</p>

        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
