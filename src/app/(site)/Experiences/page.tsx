import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import EnquireBand from "@/components/EnquireBand";
import { getExperiences } from "@/sanity/lib/content";
import { CATEGORIES } from "@/lib/travel";

export const metadata: Metadata = pageMeta({
  title: "Travel Experiences: Adventure, Luxury & Wellness",
  description: "Adventure travel, luxury escapes and wellness retreats from Bali to the Maldives, the Inca Trail and the Swiss Alps, each tailored to how you like to travel.",
  path: "/Experiences",
  image: "/images/adventure/inca-trail.webp",
  imageAlt: "Hikers on the Inca Trail",
});

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

// The owner's overview copy, kept; icons dropped, features kept as text.
const overview = {
  wellness: {
    description:
      "Rejuvenate with sunrise yoga on Bali's cliffside retreats or unwind in Morocco's ancient hammams. These sanctuaries blend mindfulness, nature, and holistic healing for a soulful escape.",
    image: "/images/bali-yoga.jpeg",
    features: ["Luxury Spas & Hammams", "Nature & Healing Retreats", "Yoga & Meditation"],
    featured: "Bali, Indonesia",
  },
  adventure: {
    description:
      "Conquer the Inca Trail's rugged peaks, dive into the Great Barrier Reef's depths, or soar with a skydive over the Swiss Alps. Each journey ignites your spirit with challenge and awe.",
    image: "/images/adventure/inca-trail.webp",
    features: ["Mountain & Hiking Adventures", "Water Sports & Diving", "Extreme & Aerial Sports"],
    featured: "Peru, South America",
  },
  luxury: {
    description:
      "Savor a private villa sunset in the Maldives or a Bordeaux wine tasting in a chateau. These escapes offer bespoke elegance, from 5-star suites to curated cultural immersions.",
    image: "/images/luxury/bordeaux-wine.webp",
    features: ["Exclusive Experiences", "Fine Dining & Cocktails", "Premium Stays"],
    featured: "Maldives, Indian Ocean",
  },
} as const;

// Page order as it was: wellness, adventure, luxury
const ORDER = ["wellness", "adventure", "luxury"] as const;

export default async function ExperiencesPage() {
  const counts = Object.fromEntries(
    await Promise.all(CATEGORIES.map(async (c) => [c.key, (await getExperiences(c.key)).length] as const)),
  );

  return (
    <>
      <section className="banner" aria-labelledby="experiences-title">
        <div className="banner-media" aria-hidden="true">
          <Image src="/images/adventure/interlaken-paragliding.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="container banner-inner">
          <div className="banner-plate">
            <h1 id="experiences-title">Explore Experiences</h1>
            <p className="lead text-ink-2">Wellness retreats, adventure travel and luxury escapes.</p>
          </div>
        </div>
      </section>

      <section aria-label="Experience types" className="py-[var(--section-gap)]">
        <div className="container">
          <ol className="experience-rows">
            {ORDER.map((key) => {
              const c = CATEGORIES.find((x) => x.key === key)!;
              const o = overview[key];
              return (
                <li key={key} className="experience-row">
                  <Link href={c.href} className="photo relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden="true">
                    <Image src={o.image} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                  </Link>
                  <div className="flex flex-col gap-5">
                    <h2>
                      <Link href={c.href} className="heading-link">{c.title}</Link>
                    </h2>
                    <p className="text-ink-2">{o.description}</p>
                    <ul className="ticks">
                      {o.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-quiet">
                      Featured: {o.featured}. <span className="num">{counts[key]}</span> trips.
                    </p>
                    <p>
                      <Link href={c.href} className="link">Discover {c.title.toLowerCase()}</Link>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <EnquireBand />
    </>
  );
}
