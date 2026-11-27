import type { Metadata } from "next";
import { SITE_URL } from "./site";
import { EMAIL } from "./email";

export const SITE_NAME = "Wanderer Tribe";

/** Default share image: a still from the owner's Mara footage (1202 x 676). */
export const DEFAULT_OG_IMAGE = { url: "/images/hero-poster.webp", width: 1202, height: 676, alt: "Giraffes on the plains of the Maasai Mara" };

/**
 * Complete metadata for one page: its own canonical address, title, description and share card.
 * Next.js replaces (not merges) openGraph and twitter per page, so every page gets the full set.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
}: {
  title?: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : undefined;
  const images = image ? [{ url: image, alt: imageAlt ?? title ?? SITE_NAME }] : [DEFAULT_OG_IMAGE];
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/** Trim a description to the ~155 characters search results show. */
export function clip(text: string, max = 155) {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : `${t.slice(0, max - 1).replace(/[\s,.;:]+\S*$/, "")}…`;
}

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`);

/** The business itself, referenced by id from every trip. */
export const ORG_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: abs("/images/Wanderer%20logo%201.png"),
        image: abs(DEFAULT_OG_IMAGE.url),
        description:
          "Tailored trips across Africa, Asia and the Middle East: safaris, cultural journeys, wellness retreats and luxury escapes.",
        email: EMAIL.info,
        telephone: "+31613227086",
        address: {
          "@type": "PostalAddress",
          streetAddress: "County Supermarket Building, First Floor, 347F+4C3 Kariguni",
          addressLocality: "Kenol Town",
          addressRegion: "Murang'a",
          addressCountry: "KE",
        },
        areaServed: ["Africa", "Asia", "Middle East"],
        sameAs: [
          "https://www.instagram.com/wanderer_tribe_",
          "https://www.facebook.com/share/1H7rxXcKD2/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { "@id": ORG_ID },
        inLanguage: "en",
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function tripJsonLd(t: {
  name: string;
  description: string;
  path: string;
  image?: string;
  duration?: string;
  touristType?: string[];
  itinerary?: { day: string; details: string }[];
  place?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: t.name,
    description: t.description,
    url: abs(t.path),
    ...(t.image ? { image: abs(t.image) } : {}),
    ...(t.touristType?.length ? { touristType: t.touristType } : {}),
    ...(t.place ? { touristDestination: { "@type": "Place", name: t.place } } : {}),
    provider: { "@id": ORG_ID },
    ...(t.itinerary?.length
      ? {
          itinerary: {
            "@type": "ItemList",
            numberOfItems: t.itinerary.length,
            itemListElement: t.itinerary.map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: d.day,
              description: d.details,
            })),
          },
        }
      : {}),
  };
}
