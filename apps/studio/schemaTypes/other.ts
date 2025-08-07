import { StackIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const other = defineType({
  icon: StackIcon,
  name: "other",
  title: "Varie",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "text",
    }),
    defineField({
      name: "price",
      title: "Prezzo",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Immagine",
      type: "image",
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: ["Al volo", "Insalate"],
      },
    })
  ]
})