"use client";

import { useRef } from "react";
import Image from "next/image";
import TagBadge from "./TagBadge";
import { Destination } from "@/types/destination";
import gsap from "gsap";

interface Props {
  destination: Destination;
  onSelect: (dest: Destination) => void;
}

export default function DestinationCard({ destination, onSelect }: Props) {
  const imageRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.9,
      ease: "power3.out",
    });
  };

  return (
    <div
      className="relative cursor-pointer rounded-md overflow-hidden shadow-lg w-full h-[350px] sm:h-[400px] lg:h-[550px]"
      onClick={() => onSelect(destination)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* IMAGE ZOOM USING GSAP */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{ transform: "scale(1)" }}
      >
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>

      {/* Overlay gradient + content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
        <h3 className="text-2xl text-white font-bold">{destination.name}</h3>

        <div className="flex flex-wrap text-white gap-2 mt-2">
          {destination.tags.map((tag, idx) => (
            <TagBadge key={idx} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
