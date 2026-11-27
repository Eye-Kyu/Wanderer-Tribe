import { getDestinations } from "@/sanity/lib/content";
import EuropeView from "./EuropeView";

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

export default async function EuropePage() {
  const destinations = await getDestinations("europe");
  return <EuropeView destinations={destinations} />;
}
