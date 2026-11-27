import Hero from "@/components/Hero";
import RegionIndex from "@/components/home/RegionIndex";
import PhotoBand from "@/components/home/PhotoBand";
import ItineraryRows from "@/components/home/ItineraryRows";
import ExperienceSwitcher from "@/components/home/ExperienceSwitcher";
import Testimonials from "@/components/Testimonials";
import CampRail from "@/components/home/CampRail";
import CallToAction from "@/components/CallToAction";
import { getDestinations, getExperiences } from "@/sanity/lib/content";
import { REGIONS, CATEGORIES, destinationHref } from "@/lib/travel";

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

export default async function Home() {
  const [regionLists, experienceLists] = await Promise.all([
    Promise.all(REGIONS.map((r) => getDestinations(r.key))),
    Promise.all(CATEGORIES.map((c) => getExperiences(c.key))),
  ]);

  const regions = REGIONS.map((r, i) => ({
    label: r.label,
    href: r.href,
    places: regionLists[i].map((d) => d.name),
  }));

  const tabs = CATEGORIES.map((c, i) => ({
    key: c.key,
    label: c.label,
    title: c.title,
    href: c.href,
    items: experienceLists[i],
  }));

  const mara = regionLists[0].find((d) => d.name.startsWith("Maasai Mara"));

  return (
    <>
      <Hero />
      <RegionIndex regions={regions} />
      <PhotoBand
        src={mara?.image || "/images/africa/maasai-mara.webp"}
        alt="Wildlife on the plains of the Maasai Mara"
        place={mara?.name || "Maasai Mara, Kenya"}
        href={mara ? destinationHref("africa", mara.name) : "/Destinations/africa"}
      />
      <ItineraryRows />
      <ExperienceSwitcher tabs={tabs} />
      <Testimonials />
      <CampRail />
      <CallToAction />
    </>
  );
}
