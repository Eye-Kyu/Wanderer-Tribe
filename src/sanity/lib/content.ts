import { defineQuery } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "./client";
import { urlFor } from "./image";
import { isSanityConfigured } from "../env";
import type { Experience } from "@/types/experience";
import { REGIONS, CATEGORIES, slugify, destinationHref, experienceHref, type SearchItem } from "@/lib/travel";

import { Destinations as africa } from "@/data/africa";
import { Destinations as asia } from "@/data/asia";
import { Destinations as europe } from "@/data/europe";
import { AdventureExperiences } from "@/data/adventure";
import { LuxuryExperiences } from "@/data/luxury";
import { WellnessExperiences } from "@/data/wellness";

/** How often (seconds) pages re-check Sanity for edits. */
export const REVALIDATE_SECONDS = 60;

export type DestinationPage = "africa" | "asia" | "europe";
export type ExperienceCategory = "adventure" | "luxury" | "wellness";
export type DestinationItem = (typeof africa)[number];

// Local data is the fallback when Sanity is not configured or can't be reached.
const localDestinations: Record<DestinationPage, DestinationItem[]> = { africa, asia, europe };
const localExperiences: Record<ExperienceCategory, Experience[]> = {
  adventure: AdventureExperiences,
  luxury: LuxuryExperiences,
  wellness: WellnessExperiences,
};

const DESTINATIONS_QUERY = defineQuery(`
  *[_type == "destination" && page == $page] | order(order asc, _createdAt asc) {
    name, region, duration, image, description, highlights,
    "itinerary": itinerary[]{ day, details },
    whyVisit, culture, tips, tags
  }
`);

const EXPERIENCES_QUERY = defineQuery(`
  *[_type == "experience" && category == $category] | order(order asc, _createdAt asc) {
    name, location, duration, image, description, highlights, tips, tags
  }
`);

type WithImage = { image?: SanityImageSource | null };

const imageUrl = (image: SanityImageSource | null | undefined) =>
  image ? urlFor(image).width(1600).fit("max").auto("format").url() : "";

async function fetchFromSanity<T extends WithImage>(
  query: string,
  params: Record<string, string>,
): Promise<T[] | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T[]>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (err) {
    console.error("[sanity] fetch failed, using local data", err);
    return null;
  }
}

const arr = <T,>(v: T[] | null | undefined) => v ?? [];

export async function getDestinations(page: DestinationPage): Promise<DestinationItem[]> {
  type Row = WithImage & Partial<Omit<DestinationItem, "image" | "id">>;
  const rows = await fetchFromSanity<Row>(DESTINATIONS_QUERY, { page });
  if (!rows) return localDestinations[page];

  return rows.map((d, i) => ({
    id: i + 1,
    name: d.name ?? "",
    region: d.region ?? "",
    duration: d.duration ?? "",
    image: imageUrl(d.image),
    description: d.description ?? "",
    highlights: arr(d.highlights),
    itinerary: arr(d.itinerary).map((it) => ({ day: it.day ?? "", details: it.details ?? "" })),
    whyVisit: d.whyVisit ?? "",
    culture: d.culture ?? "",
    tips: arr(d.tips),
    tags: arr(d.tags),
  }));
}

export async function getExperiences(category: ExperienceCategory): Promise<Experience[]> {
  type Row = WithImage & Partial<Omit<Experience, "image" | "id">>;
  const rows = await fetchFromSanity<Row>(EXPERIENCES_QUERY, { category });
  if (!rows) return localExperiences[category];

  return rows.map((e, i) => ({
    id: i + 1,
    name: e.name ?? "",
    location: e.location ?? "",
    duration: e.duration ?? "",
    image: imageUrl(e.image),
    description: e.description ?? "",
    highlights: arr(e.highlights),
    tips: arr(e.tips),
    tags: arr(e.tags),
  }));
}

// ---- Lookups for detail pages and the header search ----


export async function getDestinationBySlug(page: DestinationPage, slug: string) {
  const list = await getDestinations(page);
  const index = list.findIndex((d) => slugify(d.name) === slug);
  if (index === -1) return null;
  return { destination: list[index], others: list.filter((_, i) => i !== index) };
}

export async function getExperienceBySlug(category: ExperienceCategory, slug: string) {
  const list = await getExperiences(category);
  const index = list.findIndex((e) => slugify(e.name) === slug);
  if (index === -1) return null;
  return { experience: list[index], others: list.filter((_, i) => i !== index) };
}

export async function getSearchIndex(): Promise<SearchItem[]> {
  const [destinations, experiences] = await Promise.all([
    Promise.all(REGIONS.map(async (r) => ({ r, list: await getDestinations(r.key) }))),
    Promise.all(CATEGORIES.map(async (c) => ({ c, list: await getExperiences(c.key) }))),
  ]);
  return [
    ...destinations.flatMap(({ r, list }) =>
      list.map((d) => ({
        name: d.name,
        where: d.region || r.label,
        kind: "Destination" as const,
        href: destinationHref(r.key, d.name),
      })),
    ),
    ...experiences.flatMap(({ c, list }) =>
      list.map((e) => ({
        name: e.name,
        where: e.location || c.label,
        kind: "Experience" as const,
        href: experienceHref(c.key, e.name),
      })),
    ),
  ];
}
