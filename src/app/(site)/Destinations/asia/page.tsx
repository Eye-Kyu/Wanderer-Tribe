import { getDestinations } from "@/sanity/lib/content";
import AsiaView from "./AsiaView";

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

export default async function AsiaPage() {
  const destinations = await getDestinations("asia");
  return <AsiaView destinations={destinations} />;
}
