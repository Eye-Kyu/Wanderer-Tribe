import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Read-only client served through Sanity's CDN (apicdn.sanity.io).
export const client = createClient({
  projectId: projectId || "not-configured",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
