// Shared, client-safe helpers for destinations and experiences.

export const REGIONS = [
  { key: "africa", label: "Africa", href: "/Destinations/africa" },
  { key: "europe", label: "Middle East", href: "/Destinations/europe" },
  { key: "asia", label: "Asia", href: "/Destinations/asia" },
] as const;

export const CATEGORIES = [
  { key: "adventure", label: "Adventure", title: "Adventure Travel", href: "/Experiences/adventure" },
  { key: "luxury", label: "Luxury", title: "Luxury Escapes", href: "/Experiences/luxury" },
  { key: "wellness", label: "Wellness", title: "Wellness Retreats", href: "/Experiences/wellness" },
] as const;

export type RegionKey = (typeof REGIONS)[number]["key"];
export type CategoryKey = (typeof CATEGORIES)[number]["key"];

/** "Cape Town, South Africa" -> "cape-town-south-africa" */
export function slugify(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const destinationHref = (region: string, name: string) =>
  `/Destinations/${region}/${slugify(name)}`;
export const experienceHref = (category: string, name: string) =>
  `/Experiences/${category}/${slugify(name)}`;

/** One row of the header search. */
export interface SearchItem {
  name: string;
  where: string;
  kind: "Destination" | "Experience";
  href: string;
}
