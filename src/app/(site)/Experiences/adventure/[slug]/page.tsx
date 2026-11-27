import { experienceRoute } from "@/lib/detailPages";

const route = experienceRoute("adventure");

// Re-check Sanity for edits every 60s; new experiences render on first visit.
export const revalidate = 60;
export const dynamicParams = true;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
