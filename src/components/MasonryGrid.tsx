"use client";

import Masonry from "react-masonry-css";

interface MasonryGridProps {
  children: React.ReactNode;
}

export default function MasonryGrid({ children }: MasonryGridProps) {
  return (
    <Masonry
      breakpointCols={{ default: 4, 1100: 3, 768: 2, 500: 1 }}
      className="flex gap-4"
      columnClassName="space-y-4"
    >
      {children}
    </Masonry>
  );
}
