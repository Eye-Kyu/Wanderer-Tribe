"use client";

import type { DestinationItem } from "@/sanity/lib/content";
import RegionView from "@/components/RegionView";

export default function AsiaView({
  destinations,
}: {
  destinations: DestinationItem[];
}) {
  return (
    <RegionView
      region="asia"
      title="Explore Asia"
      heroImage="/images/asia/beijing.webp"
      heroAlt="Beijing"
      destinations={destinations}
    />
  );
}
