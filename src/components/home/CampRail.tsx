import Image from "next/image";
import { safariCamps } from "@/data/home";

/** Rail: the safari camps, each with what the stay includes and leaves out. */
export default function CampRail() {
  return (
    <section aria-labelledby="camps-title" className="py-[var(--section-gap)]">
      <div className="container flex flex-col gap-12">
        <div className="grid gap-x-[var(--gap-columns)] gap-y-4 lg:grid-cols-12 lg:items-end">
          <h2 id="camps-title" className="lg:col-span-6">Where you sleep on safari</h2>
          <p className="lead text-ink-2 lg:col-span-5 lg:col-start-8">
            Five camps in the Maasai Mara, Olare, Talek and the Serengeti.
          </p>
        </div>
        <ul className="rail camp-rail" aria-label="Safari camps" tabIndex={0}>
          {safariCamps.map((c) => (
            <li key={c.name} className="camp">
              <div className="photo relative aspect-[4/3] overflow-hidden">
                <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 32vw, 80vw" className="object-cover" />
              </div>
              <div className="flex flex-col gap-1 pt-4">
                <h3>{c.name}</h3>
                <p className="text-sm text-quiet">
                  {c.title}, {c.destination}
                </p>
              </div>
              <dl className="camp-facts">
                <div>
                  <dt>Includes</dt>
                  <dd>{c.includes}</dd>
                </div>
                <div>
                  <dt>Not included</dt>
                  <dd>{c.excludes}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
