"use client";

/**
 * Sanity Studio config, served by the app at /studio.
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  title: "Wanderer Tribe",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Lets "Create new" inside e.g. Destinations → Africa pre-fill the page field.
    templates: (prev) => [
      ...prev,
      {
        id: "destination-by-page",
        title: "Destination on page",
        schemaType: "destination",
        parameters: [{ name: "page", type: "string" }],
        value: (params: { page: string }) => ({ page: params.page }),
      },
      {
        id: "experience-by-category",
        title: "Experience in category",
        schemaType: "experience",
        parameters: [{ name: "category", type: "string" }],
        value: (params: { category: string }) => ({ category: params.category }),
      },
    ],
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
