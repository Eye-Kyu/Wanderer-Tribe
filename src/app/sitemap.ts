import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { REGIONS, CATEGORIES, destinationHref, experienceHref } from "@/lib/travel";
import { getDestinations, getExperiences } from "@/sanity/lib/content";

// Rebuilt hourly, so new trips added in the Studio reach search engines.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const url = (path: string) => `${SITE_URL}${path}`;

  const pages: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/Destinations"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/Experiences"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...REGIONS.map((r) => ({ url: url(r.href), lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...CATEGORIES.map((c) => ({ url: url(c.href), lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    { url: url("/About"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/Contact"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/Terms"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/Privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const [destinations, experiences] = await Promise.all([
    Promise.all(REGIONS.map(async (r) => ({ r, list: await getDestinations(r.key) }))),
    Promise.all(CATEGORIES.map(async (c) => ({ c, list: await getExperiences(c.key) }))),
  ]);

  const trips: MetadataRoute.Sitemap = [
    ...destinations.flatMap(({ r, list }) =>
      list.map((d) => ({
        url: url(destinationHref(r.key, d.name)),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        ...(d.image ? { images: [d.image.startsWith("http") ? d.image : url(d.image)] } : {}),
      })),
    ),
    ...experiences.flatMap(({ c, list }) =>
      list.map((e) => ({
        url: url(experienceHref(c.key, e.name)),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        ...(e.image ? { images: [e.image.startsWith("http") ? e.image : url(e.image)] } : {}),
      })),
    ),
  ];

  // The same trip name can sit in two regions (Dubai): keep each URL once
  const seen = new Set<string>();
  return [...pages, ...trips].filter((p) => (seen.has(p.url) ? false : (seen.add(p.url), true)));
}
