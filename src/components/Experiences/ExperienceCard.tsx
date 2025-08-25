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
        height={0}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{experience.name}</h3>
        <p className="text-sm text-gray-600">{experience.location}</p>
      </div>
    </div>
  );
}
