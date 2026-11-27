import { testimonials } from "@/data/home";

/** Two guests, in their own words, on the forest field. */
export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="field py-[var(--section-gap-s)]">
      <div className="container flex flex-col gap-16">
        <h2 id="testimonials-title" className="text-seal">Do not just take our word for it</h2>
        <ul className="grid gap-x-[var(--gap-columns)] gap-y-16 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="flex h-full flex-col justify-between gap-8 border-t border-rule pt-8">
                <blockquote className="font-display text-section leading-[1.12] quote">
                  <p>{t.text}</p>
                </blockquote>
                <figcaption className="text-field-muted">
                  <span className="block text-field-ink">{t.name}</span>
                  {t.location}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
