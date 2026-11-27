import Image from "next/image";
import Link from "next/link";
import EnquireButton from "./EnquireButton";
import StickyEnquire from "./StickyEnquire";

export interface TripDetailProps {
  crumbs: { href: string; label: string }[];
  name: string;
  description: string;
  image: string;
  facts: { label: string; value: string }[];
  itinerary?: { day: string; details: string }[];
  prose: { title: string; text: string }[];
  lists: { title: string; items: string[] }[];
  tags: string[];
  more: { title: string; href: string; items: { name: string; href: string; image: string; meta: string }[] };
}

/** A destination or an experience on its own page: Stage hero, the days, the details, more nearby. */
export default function TripDetail(p: TripDetailProps) {
  return (
    <article>
      <section className="py-[var(--space-2xl)]" aria-labelledby="trip-title">
        <div className="container flex flex-col gap-10">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              {p.crumbs.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="link-quiet">{c.label}</Link>
                </li>
              ))}
              <li aria-current="page">{p.name}</li>
            </ol>
          </nav>

          <div className="trip-stage">
            <div className="flex flex-col gap-6 justify-center">
              <h1 id="trip-title" className="text-display-s">{p.name}</h1>
              <p className="lead text-ink-2">{p.description}</p>
              <dl className="facts">
                {p.facts.filter((f) => f.value).map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div id="trip-enquire" className="flex flex-wrap items-center gap-6 pt-2">
                <EnquireButton trip={p.name} />
                <a className="link" href="https://wa.me/31613227086">Ask on WhatsApp</a>
              </div>
            </div>
            <div className="photo relative aspect-[4/5] lg:aspect-auto lg:min-h-[34rem] overflow-hidden">
              {p.image && (
                <Image src={p.image} alt={p.name} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              )}
            </div>
          </div>
        </div>
      </section>

      {p.itinerary && p.itinerary.length > 0 && (
        <section aria-labelledby="days-title" className="py-[var(--section-gap)]">
          <div className="container grid gap-x-[var(--gap-columns)] gap-y-10 lg:grid-cols-12">
            <h2 id="days-title" className="lg:col-span-4">Day by day</h2>
            <ol className="days lg:col-span-8">
              {p.itinerary.map((d) => (
                <li key={d.day} className="day">
                  <h3 className="day-label">{d.day}</h3>
                  <p className="text-ink-2">{d.details}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section aria-labelledby="before-title" className="bg-paper-2 py-[var(--section-gap-s)]">
        <div className="container grid gap-x-[var(--gap-columns)] gap-y-12 md:grid-cols-2">
          <h2 id="before-title" className="md:col-span-2">Before you go</h2>
          {p.prose.filter((x) => x.text).map((x) => (
            <div key={x.title} className="flex flex-col gap-3 border-t border-rule pt-6">
              <h3>{x.title}</h3>
              <p className="text-ink-2">{x.text}</p>
            </div>
          ))}
          {p.lists.filter((l) => l.items.length).map((l) => (
            <div key={l.title} className="flex flex-col gap-3 border-t border-rule pt-6">
              <h3>{l.title}</h3>
              <ul className="ticks">
                {l.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
          {p.tags.length > 0 && (
            <p className="md:col-span-2 text-sm text-quiet">Good for {p.tags.join(", ").toLowerCase()}</p>
          )}
        </div>
      </section>

      {p.more.items.length > 0 && (
        <section aria-labelledby="more-title" className="py-[var(--section-gap)]">
          <div className="container flex flex-col gap-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="more-title">{p.more.title}</h2>
              <Link href={p.crumbs[p.crumbs.length - 1].href} className="link">
                See all of {p.crumbs[p.crumbs.length - 1].label}
              </Link>
            </div>
            <ul className="grid gap-x-[var(--gap-columns)] gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {p.more.items.slice(0, 3).map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className="trip-card">
                    <span className="photo relative block aspect-[4/3] overflow-hidden">
                      <Image src={m.image} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
                    </span>
                    <span className="flex flex-col gap-1 pt-4">
                      <span className="font-display text-title trip-card-title">{m.name}</span>
                      <span className="text-sm text-quiet">{m.meta}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <StickyEnquire trip={p.name} watchId="trip-enquire" />
    </article>
  );
}
