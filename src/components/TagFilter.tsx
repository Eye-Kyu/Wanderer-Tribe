// src/components/TagFilter.tsx
"use client";

import React, { useState } from "react";
import { Destination } from "@/types/destination";
import { Filter } from "lucide-react";

interface TagFilterProps {
  destinations: Destination[];
  onFilter: (filtered: Destination[]) => void;
}

export default function TagFilter({ destinations, onFilter }: TagFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const allTags = Array.from(new Set(destinations.flatMap((d) => d.tags)));

  const handleSelect = (tag: string | null) => {
    setSelectedTag(tag);
    const filtered = tag
      ? destinations.filter((d) => d.tags.includes(tag))
      : destinations;
    onFilter(filtered);
    setOpen(false); // close dropdown after selection
  };

  return (
    <div className="relative mb-10 text-center">
      {/* Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full bg-neutral-800 text-neutral-200 border border-neutral-700 hover:bg-neutral-700 transition"
      >
        <Filter size={18} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg p-3 z-50 w-48 text-left">
          {/* All Option */}
          <button
            onClick={() => handleSelect(null)}
            className={`block w-full px-3 py-2 rounded-md text-sm transition ${
              selectedTag === null
                ? "bg-[#2D5BD2] text-white"
                : "text-neutral-300 hover:bg-neutral-800"
            }`}
          >
            All
          </button>

          {/* Dynamic Tags */}
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleSelect(tag)}
              className={`block w-full px-3 py-2 rounded-md text-sm transition ${
                selectedTag === tag
                  ? "bg-[#2D5BD2] text-white"
                  : "text-neutral-300 hover:bg-neutral-800"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
