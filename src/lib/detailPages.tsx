import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TripDetail from "@/components/TripDetail";
import {
  getDestinations,
  getDestinationBySlug,
  getExperiences,
  getExperienceBySlug,
  type DestinationPage,
  type ExperienceCategory,
} from "@/sanity/lib/content";
import { REGIONS, CATEGORIES, slugify, destinationHref, experienceHref } from "@/lib/travel";

type Params = { params: Promise<{ slug: string }> };

/** Route handlers for /Destinations/<region>/<slug>. */
export function destinationRoute(region: DestinationPage) {
  const meta = REGIONS.find((r) => r.key === region)!;

  return {
    async generateStaticParams() {
      return (await getDestinations(region)).map((d) => ({ slug: slugify(d.name) }));
    },
    async generateMetadata({ params }: Params): Promise<Metadata> {
      const found = await getDestinationBySlug(region, (await params).slug);
      if (!found) return {};
      const d = found.destination;
      return { title: d.name, description: d.description, openGraph: { images: d.image ? [d.image] : [] } };
    },
    async Page({ params }: Params) {
      const found = await getDestinationBySlug(region, (await params).slug);
      if (!found) notFound();
      const { destination: d, others } = found;
      return (
        <TripDetail
          crumbs={[
            { href: "/Destinations", label: "Destinations" },
            { href: meta.href, label: meta.label },
          ]}
          name={d.name}
          description={d.description}
          image={d.image}
          facts={[
            { label: "Duration", value: d.duration },
            { label: "Region", value: d.region },
          ]}
          itinerary={d.itinerary}
          prose={[
            { title: "Why visit", text: d.whyVisit },
            { title: "Culture", text: d.culture },
          ]}
          lists={[
            { title: "Highlights", items: d.highlights },
            { title: "Travel tips", items: d.tips },
          ]}
          tags={d.tags}
          more={{
            title: `More in ${meta.label}`,
            href: meta.href,
            items: others.map((o) => ({
              name: o.name,
              href: destinationHref(region, o.name),
              image: o.image,
              meta: `${o.duration}, ${o.region}`,
            })),
          }}
        />
      );
    },
  };
}

/** Route handlers for /Experiences/<category>/<slug>. */
export function experienceRoute(category: ExperienceCategory) {
  const meta = CATEGORIES.find((c) => c.key === category)!;

  return {
    async generateStaticParams() {
      return (await getExperiences(category)).map((e) => ({ slug: slugify(e.name) }));
    },
    async generateMetadata({ params }: Params): Promise<Metadata> {
      const found = await getExperienceBySlug(category, (await params).slug);
      if (!found) return {};
      const e = found.experience;
      return { title: e.name, description: e.description, openGraph: { images: e.image ? [e.image] : [] } };
    },
    async Page({ params }: Params) {
      const found = await getExperienceBySlug(category, (await params).slug);
      if (!found) notFound();
      const { experience: e, others } = found;
      return (
        <TripDetail
          crumbs={[
            { href: "/Experiences", label: "Experiences" },
            { href: meta.href, label: meta.title },
          ]}
          name={e.name}
          description={e.description}
          image={e.image}
          facts={[
            { label: "Duration", value: e.duration },
            { label: "Location", value: e.location },
          ]}
          prose={[]}
          lists={[
            { title: "Highlights", items: e.highlights },
            { title: "Travel tips", items: e.tips },
          ]}
          tags={e.tags}
          more={{
            title: `More ${meta.title.toLowerCase()}`,
            href: meta.href,
            items: others.map((o) => ({
              name: o.name,
              href: experienceHref(category, o.name),
              image: o.image,
              meta: `${o.location}, ${o.duration}`,
            })),
          }}
        />
      );
    },
  };
}
