import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, orderField, stringList, tagsField } from "./fields";

export const DESTINATION_PAGES = [
  { title: "Africa", value: "africa" },
  { title: "Asia", value: "asia" },
  { title: "Europe / Middle East", value: "europe" },
];

export const destination = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "page",
      title: "Show on page",
      type: "string",
      options: { list: DESTINATION_PAGES, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "region",
      title: "Region",
      description: "e.g. East Africa, Southeast Asia",
      type: "string",
    }),
    defineField({ name: "duration", title: "Duration", description: "e.g. 5 Days", type: "string" }),
    imageField,
    defineField({ name: "description", title: "Short description", type: "text", rows: 3 }),
    stringList("highlights", "Highlights"),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "itineraryDay",
          fields: [
            defineField({ name: "day", title: "Day", description: "e.g. Day 1", type: "string" }),
            defineField({ name: "details", title: "Details", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "day", subtitle: "details" } },
        }),
      ],
    }),
    defineField({ name: "whyVisit", title: "Why visit", type: "text", rows: 3 }),
    defineField({ name: "culture", title: "Culture", type: "text", rows: 3 }),
    stringList("tips", "Travel tips"),
    tagsField,
    orderField,
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "page", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: DESTINATION_PAGES.find((p) => p.value === subtitle)?.title ?? subtitle,
      media,
    }),
  },
});
