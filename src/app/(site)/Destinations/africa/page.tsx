import { getDestinations } from "@/sanity/lib/content";
import AfricaView from "./AfricaView";

// Re-check Sanity for edits every 60s (must be a literal; keep in sync with REVALIDATE_SECONDS).
export const revalidate = 60;

export default async function AfricaPage() {
  const destinations = await getDestinations("africa");
  return <AfricaView destinations={destinations} />;
}
