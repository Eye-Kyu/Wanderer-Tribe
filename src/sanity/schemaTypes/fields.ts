import { defineArrayMember, defineField } from "sanity";

// Shared field definitions used by both destinations and experiences.

export const stringList = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  });

export const tagsField = defineField({
  name: "tags",
  title: "Tags",
  description: "Used for the filter dropdown on the page (e.g. Beaches, Culture).",
  type: "array",
  of: [defineArrayMember({ type: "string" })],
  options: { layout: "tags" },
});

export const imageField = defineField({
  name: "image",
  title: "Main image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      description: "Short description of the photo for screen readers and SEO.",
      type: "string",
    }),
  ],
  validation: (rule) => rule.required(),
});

export const orderField = defineField({
  name: "order",
  title: "Display order",
  description: "Lower numbers appear first.",
  type: "number",
  initialValue: 100,
});
