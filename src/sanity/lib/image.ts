import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Image URL on Sanity's image CDN (cdn.sanity.io), respecting the editor's hotspot/crop. */
export const urlFor = (source: SanityImageSource) => builder.image(source);
