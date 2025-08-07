import { DropIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const drink = defineType({
  icon: DropIcon,
  name: "drink",
  title: "Da bere",
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
    }),
  ]
})