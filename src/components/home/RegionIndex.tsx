import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface RegionRow {
  label: string;
  href: string;
  places: string[];
}

/** Index: the three regions as large typeset rows, each with the places it holds. */
export default function RegionIndex({ regions }: { regions: RegionRow[] }) {
  return (
    <section aria-labelledby="regions-title" className="py-[var(--section-gap)]">
      <div className="container grid gap-x-[var(--gap-columns)] gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h2 id="regions-title">Where we travel</h2>
          <p className="lead text-ink-2">
            Three regions, each planned around the places you most want to see.
          </p>
        </div>
        <ol className="lg:col-span-8 border-t border-rule">
          {regions.map((r) => (
            <li key={r.href} className="border-b border-rule">
              <Link href={r.href} className="region-row group">
                <span className="font-display text-display-s leading-none">{r.label}</span>
                <span className="text-ink-2 min-w-0">
                  <span className="num">{r.places.length}</span> destinations, including{" "}
                  {r.places.slice(0, 3).map((p) => p.split(",")[0]).join(", ")}
                </span>
                <ArrowUpRight aria-hidden="true" size={28} className="region-arrow" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
