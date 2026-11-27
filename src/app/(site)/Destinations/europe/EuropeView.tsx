"use client";

import type { DestinationItem } from "@/sanity/lib/content";
import RegionView from "@/components/RegionView";

export default function EuropeView({
  destinations,
}: {
  destinations: DestinationItem[];
}) {
  return (
    <RegionView
      region="europe"
      title="Discover The Middle East"
      heroImage="/images/asia/dubai.webp"
      heroAlt="Dubai"
      destinations={destinations}
    />
  );
}
