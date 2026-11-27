import { defineField, defineType } from "sanity";
import { imageField, orderField, stringList, tagsField } from "./fields";

export const EXPERIENCE_CATEGORIES = [
  { title: "Adventure", value: "adventure" },
  { title: "Luxury", value: "luxury" },
  { title: "Wellness", value: "wellness" },
];

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Show on page",
      type: "string",
      options: { list: EXPERIENCE_CATEGORIES, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "location", title: "Location", description: "e.g. Maasai Mara, Kenya", type: "string" }),
    defineField({ name: "duration", title: "Duration", description: "e.g. 5 Days", type: "string" }),
    imageField,
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    stringList("highlights", "Highlights"),
    stringList("tips", "Travel tips"),
    tagsField,
    orderField,
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: EXPERIENCE_CATEGORIES.find((c) => c.value === subtitle)?.title ?? subtitle,
      media,
    }),
  },
});
