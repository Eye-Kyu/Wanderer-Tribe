import Image from "next/image";
import { thailandItinerary as trip } from "@/data/home";

/** Rows: the featured Thailand itinerary, stop by stop, beside the one photograph of it. */
export default function ItineraryRows() {
  return (
    <section aria-labelledby="itinerary-title" className="bg-paper-2 py-[var(--section-gap-l)]">
      <div className="container grid gap-x-[var(--gap-columns)] gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-height)+var(--space-xl))] lg:self-start">
          <h2 id="itinerary-title">{trip.title}</h2>
          <p className="lead text-ink-2">{trip.route}, one stop at a time.</p>
          <div className="photo relative aspect-[4/5] overflow-hidden">
            <Image src={trip.image.src} alt={trip.image.alt} fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="relative lg:col-span-6 lg:col-start-7">
          <span className="itinerary-progress" aria-hidden="true" />
          <ol className="itinerary">
          {trip.stops.map((s) => (
            <li key={s.place} className="itinerary-stop">
              <h3>
                {s.place}
                <span className="block font-body text-lg text-ink-2 mt-1 tracking-normal">{s.theme}</span>
              </h3>
              <p className="text-ink-2">{s.details}</p>
              {s.includes.length > 0 && (
                <p className="text-sm text-quiet">Includes {s.includes.join(" and ")}</p>
              )}
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
