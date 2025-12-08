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
      className="w-full h-[350px] sm:h-[400px] lg:h-[500px] cursor-pointer rounded-lg overflow-hidden shadow-lg shadow-black hover:shadow-xl transition relative"
      onClick={onSelect}
    >
      {/* Image fills container */}
      <div className="relative w-full h-full">
        <Image
          src={experience.image}
          alt={experience.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm p-4 rounded-b-lg">
        <h3 className="text-xl text-white font-semibold">{experience.name}</h3>
        <p className="text-sm text-gray-300">{experience.location}</p>

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
