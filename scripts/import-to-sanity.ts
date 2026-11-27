/**
 * One-time import of the existing local content (src/data/*) into Sanity.
 *
 *   npx sanity login                                  (once)
 *   npx sanity exec scripts/import-to-sanity.ts --with-user-token
 *
 * Safe to re-run: documents use fixed IDs and are replaced, images are de-duplicated by Sanity.
 * Note: re-running overwrites any edits made in the Studio to the imported documents.
 */
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

import { Destinations as africa } from "../src/data/africa";
import { Destinations as asia } from "../src/data/asia";
import { Destinations as europe } from "../src/data/europe";
import { AdventureExperiences } from "../src/data/adventure";
import { LuxuryExperiences } from "../src/data/luxury";
import { WellnessExperiences } from "../src/data/wellness";

const client = getCliClient({ apiVersion: "2025-02-19" });
const publicDir = path.join(process.cwd(), "public");
const uploaded = new Map<string, string>();

async function uploadImage(src: string) {
  if (uploaded.has(src)) return uploaded.get(src)!;
  const file = path.join(publicDir, decodeURIComponent(src));
  if (!existsSync(file)) {
    console.warn(`  ! image not found, skipping: ${src}`);
    return null;
  }
  const asset = await client.assets.upload("image", createReadStream(file), {
    filename: path.basename(file),
  });
  uploaded.set(src, asset._id);
  return asset._id;
}

const imageRef = (assetId: string | null, alt: string) =>
  assetId ? { _type: "image", asset: { _type: "reference", _ref: assetId }, alt } : undefined;

const key = (i: number) => `k${i}`;

async function run() {
  const tx = client.transaction();
  let count = 0;

  const destinationPages = { africa, asia, europe };
  for (const [page, list] of Object.entries(destinationPages)) {
    for (const [i, d] of list.entries()) {
      console.log(`destination/${page}: ${d.name}`);
      tx.createOrReplace({
        _id: `destination-${page}-${d.id}`,
        _type: "destination",
        page,
        order: i + 1,
        name: d.name,
        region: d.region,
        duration: d.duration,
        image: imageRef(await uploadImage(d.image), d.name),
        description: d.description,
        highlights: d.highlights,
        itinerary: d.itinerary.map((it, j) => ({ _key: key(j), _type: "itineraryDay", ...it })),
        whyVisit: d.whyVisit,
        culture: d.culture,
        tips: d.tips,
        tags: d.tags,
      });
      count++;
    }
  }

  const experienceCategories = {
    adventure: AdventureExperiences,
    luxury: LuxuryExperiences,
    wellness: WellnessExperiences,
  };
  for (const [category, list] of Object.entries(experienceCategories)) {
    for (const [i, e] of list.entries()) {
      console.log(`experience/${category}: ${e.name}`);
      tx.createOrReplace({
        _id: `experience-${category}-${e.id}`,
        _type: "experience",
        category,
        order: i + 1,
        name: e.name,
        location: e.location,
        duration: e.duration,
        image: imageRef(await uploadImage(e.image), e.name),
        description: e.description,
        highlights: e.highlights,
        tips: e.tips,
        tags: e.tags,
      });
      count++;
    }
  }

  await tx.commit();
  console.log(`\nDone: ${count} documents, ${uploaded.size} images uploaded.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
