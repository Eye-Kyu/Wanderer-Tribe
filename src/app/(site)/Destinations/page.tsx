import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PriceGuide from "@/components/PriceGuide";
import EnquireBand from "@/components/EnquireBand";
import { getDestinations } from "@/sanity/lib/content";
import { REGIONS, slugify, destinationHref } from "@/lib/travel";
import { priceGuide, regionNotes } from "@/data/priceGuide";

export const metadata: Metadata = pageMeta({
  title: "Destinations in Africa, Asia & the Middle East",
  description: "Compare trips across Africa, Asia and the Middle East, with featured trip lengths and costs, travel tips by region and a day-by-day plan for every destination.",
  path: "/Destinations",
  image: "/images/africa.webp",
  imageAlt: "A hot air balloon over the savannah",
});

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

export default async function DestinationsPage() {
  const lists = await Promise.all(REGIONS.map((r) => getDestinations(r.key)));

  // Link a priced trip to its page when the CMS has a destination of that name
  const slugsByRegion = Object.fromEntries(REGIONS.map((r, i) => [r.key, new Set(lists[i].map((d) => slugify(d.name)))]));
  const tabs = priceGuide.map((g) => {
    const region = REGIONS.find((r) => r.key === g.region)!;
    return {
      key: g.region,
      label: region.label,
      rows: g.trips.map((t) => ({
        ...t,
        href: slugsByRegion[g.region].has(slugify(t.name)) ? destinationHref(g.region, t.name) : null,
      })),
    };
  });

  return (
    <>
      <section className="banner" aria-labelledby="destinations-title">
        <div className="banner-media" aria-hidden="true">
          <Image src="/images/africa.webp" alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "50% 0%" }} />
        </div>
        <div className="container banner-inner">
          <div className="banner-plate">
            <h1 id="destinations-title">Discover the World&apos;s Wonders</h1>
            <p className="lead text-ink-2">Adventure awaits in Africa, Asia and the Middle East.</p>
          </div>
        </div>
      </section>

      <section aria-label="Regions" className="py-[var(--section-gap)]">
        <div className="container">
          <ul className="grid gap-x-[var(--gap-columns)] gap-y-16 md:grid-cols-3">
            {REGIONS.map((r, i) => (
              <li key={r.key}>
                <Link href={r.href} className="trip-card">
                  <span className="photo relative block aspect-[4/5] overflow-hidden">
                    <Image src={regionNotes[r.key].image} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
                    <span className="card-cue" aria-hidden="true"><ArrowUpRight size={18} /></span>
                  </span>
                  <span className="flex flex-col gap-2 pt-5">
                    <span className="font-display text-display-s leading-none trip-card-title">{r.label}</span>
                    <span className="text-ink-2">{regionNotes[r.key].intro}</span>
                    <span className="text-sm text-quiet">
                      <span className="num">{lists[i].length}</span> destinations
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="tips-title" className="bg-paper-2 py-[var(--section-gap-s)]">
        <div className="container grid gap-x-[var(--gap-columns)] gap-y-10 lg:grid-cols-12">
          <h2 id="tips-title" className="lg:col-span-4">Travel tips by region</h2>
          <dl className="lg:col-span-8 border-t border-rule">
            {REGIONS.map((r) => (
              <div key={r.key} className="tip-row">
                <dt className="font-display text-title">{r.label}</dt>
                <dd className="m-0 text-ink-2">{regionNotes[r.key].tip}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PriceGuide tabs={tabs} />

      <EnquireBand />
    </>
  );
}
