"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { DestinationItem } from "@/sanity/lib/content";
import { destinationHref } from "@/lib/travel";

interface Props {
  region: string;
  title: string;
  heroImage: string;
  heroAlt: string;
  /** CSS object-position for the banner photo, to keep its subject in frame. */
  heroPosition?: string;
  destinations: DestinationItem[];
}

/** One region: a banner, a tag filter, and every destination as a card that opens its page. */
export default function RegionView({ region, title, heroImage, heroAlt, heroPosition = "50% 50%", destinations }: Props) {
  const [tag, setTag] = useState<string | null>(null);
  const tags = useMemo(() => Array.from(new Set(destinations.flatMap((d) => d.tags))).sort(), [destinations]);
  const shown = tag ? destinations.filter((d) => d.tags.includes(tag)) : destinations;

  return (
    <>
      <section className="banner" aria-labelledby="region-title">
        <div className="banner-media" aria-hidden="true">
          <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: heroPosition }} />
        </div>
        <div className="container banner-inner">
          <div className="banner-plate">
            <h1 id="region-title">{title}</h1>
            <p className="lead text-ink-2">
              <span className="num">{destinations.length}</span> destinations, each with a day-by-day plan.
            </p>
          </div>
        </div>
        <span className="visually-hidden">{heroAlt}</span>
      </section>

      <section aria-label={`${title}: destinations`} className="py-[var(--section-gap-s)]">
        <div className="container flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <p id="filter-label" className="text-sm text-quiet">Filter by interest</p>
            <div role="group" aria-labelledby="filter-label" className="chip-row">
              <button type="button" className="chip" aria-pressed={tag === null} onClick={() => setTag(null)}>
                All
              </button>
              {tags.map((t) => (
                <button key={t} type="button" className="chip" aria-pressed={tag === t} onClick={() => setTag(t)}>
                  {t}
                </button>
              ))}
            </div>
            <p role="status" className="text-sm text-quiet">
              {shown.length} of {destinations.length} shown
            </p>
          </div>

          <ul key={tag ?? "all"} className="trip-grid grid gap-x-[var(--gap-columns)] gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((d) => (
              <li key={d.name}>
                <Link href={destinationHref(region, d.name)} className="trip-card">
                  <span className="photo relative block aspect-[4/5] overflow-hidden">
                    <Image src={d.image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
                    <span className="card-cue" aria-hidden="true"><ArrowUpRight size={18} /></span>
                  </span>
                  <span className="flex flex-col gap-2 pt-4">
                    <span className="font-display text-title trip-card-title">{d.name}</span>
                    <span className="text-ink-2">{d.description}</span>
                    <span className="text-sm text-quiet">
                      {d.duration}, {d.region}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
