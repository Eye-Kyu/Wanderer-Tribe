import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description: "Why Wanderer Tribe was founded, how we plan tailored trips across Africa, Asia and the Middle East, and the places we are opening next.",
  path: "/About",
  image: "/images/About/Abt.webp",
  imageAlt: "A Cape buffalo with oxpeckers on the savannah",
});

// The founders' words, kept; dashes set as commas and full stops.
const chapters = [
  {
    id: "vision",
    title: "The Founders' Vision",
    subtitle: "A Dream Born of Wanderlust",
    content:
      "Amidst the rustle of acacia trees and the whispers of distant dunes, Wanderer Tribe was born. Our founders envisioned more than travel: they dreamed of connection. From Africa's sacred lands to forgotten island trails, Wanderer Tribe seeks not to escape life, but to discover it, through stories, encounters, and journeys that awaken the soul.",
    image: { src: "/images/africa/namib.webp", alt: "Red dunes of the Namib desert" },
  },
  {
    id: "philosophy",
    title: "Our Guiding Light",
    subtitle: "Beyond the Beaten Path",
    content:
      "Travel need not be a checklist of monuments. We weave odysseys where you dance with desert winds, sip tea with mountain hermits, and witness the birth of a new day over uncharted horizons.",
    image: { src: "/images/africa/marrakech.webp", alt: "Hot air balloons rising over the desert at dawn" },
  },
  {
    id: "previews",
    title: "Exclusive Previews",
    subtitle: "Whispers of What's Next",
    content:
      "Peek into the future: a lost temple in Cambodia's jungles, a volcanic island off Iceland, a Himalayan pass blooming with rare orchids. These are the next chapters Wanderer Tribe is unveiling. Join us to be among the first to explore.",
    image: null,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="poster" aria-labelledby="about-title">
        <div className="poster-media" aria-hidden="true">
          <Image
            src="/images/About/Abt.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "60% 40%" }}
          />
        </div>
        <div className="container poster-inner">
          <div className="banner-plate">
            <h1 id="about-title">About Wanderer Tribe</h1>
          </div>
        </div>
      </section>

      <section aria-label="Our story" className="py-[var(--section-gap)]">
        <div className="container">
          <ol className="chapters">
            {chapters.map((c) => (
              <li key={c.id} id={c.id} className={c.image ? "chapter chapter-with-photo" : "chapter"}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-section">{c.title}</h2>
                    <p className="lead text-ink-2">{c.subtitle}</p>
                  </div>
                  <p className="chapter-body">{c.content}</p>
                </div>
                {c.image && (
                  <div className="photo relative aspect-[4/5] overflow-hidden">
                    <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="about-cta-title" className="field py-[var(--section-gap-s)]">
        <div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h2 id="about-cta-title" className="text-field-ink">Embark on Your Epic</h2>
            <p className="lead text-field-muted">
              Let Wanderer Tribe weave your story with threads of rarity and wonder. Contact us to
              begin.
            </p>
          </div>
          <Link href="/Contact" className="btn btn-primary">
            Begin Your Odyssey
          </Link>
        </div>
      </section>
    </>
  );
}
