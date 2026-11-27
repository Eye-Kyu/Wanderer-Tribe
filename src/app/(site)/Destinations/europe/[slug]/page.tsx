import { destinationRoute } from "@/lib/detailPages";

const route = destinationRoute("europe");

// Re-check Sanity for edits every 60s; new destinations render on first visit.
export const revalidate = 60;
export const dynamicParams = true;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
