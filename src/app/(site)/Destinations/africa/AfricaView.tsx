"use client";

import type { DestinationItem } from "@/sanity/lib/content";
import RegionView from "@/components/RegionView";

export default function AfricaView({
  destinations,
}: {
  destinations: DestinationItem[];
}) {
  return (
    <RegionView
      region="africa"
      title="Discover Africa"
      heroImage="/images/africa.webp"
      heroAlt="A hot air balloon over the savannah"
      heroPosition="50% 0%"
      destinations={destinations}
    />
  );
}
