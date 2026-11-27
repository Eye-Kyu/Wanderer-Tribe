"use client";
import { useId, useRef, useState } from "react";
import Link from "next/link";
import { useTabIndicator } from "@/lib/useTabIndicator";

export interface PriceTab {
  key: string;
  label: string;
  rows: { name: string; days: number; cost: string; activities: string; href: string | null }[];
}

/** Switcher + table: the owner's featured trips with length and cost, by region. */
export default function PriceGuide({ tabs }: { tabs: PriceTab[] }) {
  const [active, setActive] = useState(0);
  const { listRef, pillRef } = useTabIndicator(active);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? (i + 1) % tabs.length : e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <section aria-labelledby={`${uid}-title`} className="py-[var(--section-gap)]">
      <div className="container flex flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h2 id={`${uid}-title`}>Featured trips and costs</h2>
            <p className="lead text-ink-2">Every trip is tailored, so these are where planning starts.</p>
          </div>
          <div ref={listRef} role="tablist" aria-label="Region" className="tabs">
            <span ref={pillRef} className="tab-pill" aria-hidden="true" />
            {tabs.map((t, i) => (
              <button
                key={t.key}
                ref={(el) => {
                  refs.current[i] = el;
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
          <div key={t.key} role="tabpanel" id={`${uid}-panel-${t.key}`} aria-labelledby={`${uid}-tab-${t.key}`} hidden={i !== active}>
            <table className="price-table">
              <caption className="visually-hidden">{t.label}: featured trips, length and cost</caption>
              <thead>
                <tr>
                  <th scope="col">Destination</th>
                  <th scope="col" className="num">Days</th>
                  <th scope="col" className="num">Cost</th>
                  <th scope="col" className="hide-sm">What you do</th>
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r) => (
                  <tr key={r.name}>
                    <th scope="row">
                      {r.href ? (
                        <Link href={r.href} className="link-quiet">{r.name}</Link>
                      ) : (
                        r.name
                      )}
                      <span className="stack-sm">{r.activities}</span>
                    </th>
                    <td className="num">{r.days}</td>
                    <td className="num">{r.cost.trim()}</td>
                    <td className="hide-sm text-ink-2">{r.activities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}
