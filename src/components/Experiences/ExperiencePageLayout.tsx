// src/components/Experiences/ExperiencePageLayout.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Experience } from "@/types/experience";
import { experienceHref } from "@/lib/travel";

interface Props {
  title: string;
  subtitle: string;
  heroImage: string;
  experiences: Experience[];
  /** URL segment of this category, for the detail links. */
  category: string;
}

export default function ExperiencePageLayout({ title, subtitle, heroImage, experiences, category }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags for the filter
  const allTags = useMemo(() => Array.from(new Set(experiences.flatMap((exp) => exp.tags))).sort(), [experiences]);
  const filteredExperiences = activeTag ? experiences.filter((exp) => exp.tags.includes(activeTag)) : experiences;

  return (
    <>
      <section className="banner" aria-labelledby="experience-title">
        <div className="banner-media" aria-hidden="true">
          <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="container banner-inner">
          <div className="banner-plate">
            <h1 id="experience-title">{title}</h1>
            <p className="lead text-ink-2">{subtitle}</p>
          </div>
        </div>
      </section>

      <section aria-label={`${title}: experiences`} className="py-[var(--section-gap-s)]">
        <div className="container flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <p id="exp-filter-label" className="text-sm text-quiet">Filter by interest</p>
            <div role="group" aria-labelledby="exp-filter-label" className="chip-row">
              <button type="button" className="chip" aria-pressed={activeTag === null} onClick={() => setActiveTag(null)}>
                All
              </button>
              {allTags.map((tag) => (
                <button key={tag} type="button" className="chip" aria-pressed={activeTag === tag} onClick={() => setActiveTag(tag)}>
                  {tag}
                </button>
              ))}
            </div>
            <p role="status" className="text-sm text-quiet">
              {filteredExperiences.length} of {experiences.length} shown
            </p>
          </div>

          <ul key={activeTag ?? "all"} className="trip-grid grid gap-x-[var(--gap-columns)] gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {filteredExperiences.map((exp) => (
              <li key={exp.name}>
                <Link href={experienceHref(category, exp.name)} className="trip-card">
                  <span className="photo relative block aspect-[4/5] overflow-hidden">
                    <Image src={exp.image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
                  </span>
                  <span className="flex flex-col gap-2 pt-4">
                    <span className="font-display text-title trip-card-title">{exp.name}</span>
                    <span className="text-ink-2">{exp.description}</span>
                    <span className="text-sm text-quiet">
                      {exp.location}, {exp.duration}
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
