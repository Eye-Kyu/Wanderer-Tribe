import type { StructureResolver } from "sanity/structure";
import { DESTINATION_PAGES } from "./schemaTypes/destination";
import { EXPERIENCE_CATEGORIES } from "./schemaTypes/experience";

// Sidebar grouped the same way as the website's pages, so editors can find things.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Wanderer Tribe content")
    .items([
      S.listItem()
        .title("Destinations")
        .child(
          S.list()
            .title("Destinations")
            .items([
              ...DESTINATION_PAGES.map((p) =>
                S.listItem()
                  .title(p.title)
                  .child(
                    S.documentList()
                      .title(p.title)
                      .schemaType("destination")
                      .filter('_type == "destination" && page == $page')
                      .params({ page: p.value })
                      .defaultOrdering([{ field: "order", direction: "asc" }])
                      .initialValueTemplates([
                        S.initialValueTemplateItem("destination-by-page", { page: p.value }),
                      ]),
                  ),
              ),
              S.divider(),
              S.documentTypeListItem("destination").title("All destinations"),
            ]),
        ),
      S.listItem()
        .title("Experiences")
        .child(
          S.list()
            .title("Experiences")
            .items([
              ...EXPERIENCE_CATEGORIES.map((c) =>
                S.listItem()
                  .title(c.title)
                  .child(
                    S.documentList()
                      .title(c.title)
                      .schemaType("experience")
                      .filter('_type == "experience" && category == $category')
                      .params({ category: c.value })
                      .defaultOrdering([{ field: "order", direction: "asc" }])
                      .initialValueTemplates([
                        S.initialValueTemplateItem("experience-by-category", {
                          category: c.value,
                        }),
                      ]),
                  ),
              ),
              S.divider(),
              S.documentTypeListItem("experience").title("All experiences"),
            ]),
        ),
    ]);
