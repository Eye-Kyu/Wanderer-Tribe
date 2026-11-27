"use client";
import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/types/experience";
import { experienceHref } from "@/lib/travel";

export interface ExperienceTab {
  key: string;
  label: string;
  title: string;
  href: string;
  items: Experience[];
}

/** Switcher: the experiences by mood. Every state is real; the first renders without script. */
export default function ExperienceSwitcher({ tabs }: { tabs: ExperienceTab[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? (i + 1) % tabs.length : e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section aria-labelledby={`${uid}-title`} className="py-[var(--section-gap)]">
      <div className="container flex flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id={`${uid}-title`}>Trips by mood</h2>
          <div role="tablist" aria-label="Experience type" className="tabs">
            {tabs.map((t, i) => (
              <button
                key={t.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${t.key}`}
                aria-selected={i === active}
                aria-controls={`${uid}-panel-${t.key}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="tab"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {tabs.map((t, i) => (
          <div
            key={t.key}
            role="tabpanel"
            id={`${uid}-panel-${t.key}`}
            aria-labelledby={`${uid}-tab-${t.key}`}
            hidden={i !== active}
            className="flex flex-col gap-8"
          >
            <ul className="grid gap-x-[var(--gap-columns)] gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {t.items.slice(0, 3).map((e) => (
                <li key={e.name}>
                  <Link href={experienceHref(t.key, e.name)} className="trip-card group">
                    <span className="photo relative block aspect-[4/5] overflow-hidden">
                      <Image src={e.image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
                    </span>
                    <span className="flex flex-col gap-1 pt-4">
                      <span className="font-display text-title trip-card-title">{e.name}</span>
                      <span className="text-sm text-quiet">
                        {e.location}, {e.duration}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              <Link href={t.href} className="link">
                See all {t.items.length} {t.title.toLowerCase()}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
