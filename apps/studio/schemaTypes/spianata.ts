import { TokenIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const spianata = defineType({
  name: 'spianata',
  title: 'La Spianata',
  type: 'document',
  icon: TokenIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
    }),
    defineField({
      name: 'basePrice',
      title: 'Prezzo Base',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 8.00,
    }),
    defineField({
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'pizzaFarcita',
      title: 'Pizza Farcita',
      type: 'boolean',
      description: 'Seleziona se questa spianata ha farciture disponibili',
      initialValue: false,
    }),
    defineField({
      name: 'toppings',
      title: 'Farciture Disponibili',
      type: 'array',
      hidden: ({ document }) => !document?.pizzaFarcita,
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nome Farcitura',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'additionalPrice',
              title: 'Prezzo Aggiuntivo',
              type: 'number',
              description: 'Prezzo extra per questa farcitura',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'description',
              title: 'Descrizione',
              type: 'text',
            },
          ],
          preview: {
            select: {
              name: 'name',
              price: 'additionalPrice',
              description: 'description',
            },
            prepare({ name, price, description }) {
              return {
                title: `${name} (+€${price})`,
                subtitle: description || 'Farcitura disponibile',
              };
            },
          },
        },
      ],
      validation: (Rule) => [
        Rule.custom((toppings: any[] | undefined, context) => {
          // Ottieni il valore del campo pizzaFarcita dal documento
          const document = context.document;
          const pizzaFarcita = document?.pizzaFarcita;
          
          // Se non è pizza farcita, non serve validare le farciture
          if (pizzaFarcita === false) {
            return true;
          }
          
          // Se è pizza farcita, valida le farciture
          if (!toppings || toppings.length === 0) {
            return 'Inserisci almeno una farcitura per una pizza farcita';
          }
          
          // Controlla duplicati
          const names = toppings.map(t => t.name).filter(Boolean);
          const uniqueNames = [...new Set(names)];
          if (names.length !== uniqueNames.length) {
            return 'Non possono esserci farciture con lo stesso nome';
          }
          
          return true;
        }),
      ],
      initialValue: [
        {
          name: 'Prosciutto',
          additionalPrice: 2.50,
          description: 'Prosciutto cotto di qualità',
        },
        {
          name: 'Mozzarella Extra',
          additionalPrice: 1.50,
          description: 'Mozzarella aggiuntiva',
        },
        {
          name: 'Funghi',
          additionalPrice: 1.80,
          description: 'Funghi misti',
        },
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      basePrice: 'basePrice',
      pizzaFarcita: 'pizzaFarcita',
      toppings: 'toppings',
      image: 'image',
    },
    prepare({ name, basePrice, pizzaFarcita, toppings, image }) {
      const toppingsCount = toppings?.length || 0;
      const maxPrice = pizzaFarcita 
        ? basePrice + (toppings?.reduce((sum: number, t: any) => sum + (t.additionalPrice || 0), 0) || 0)
        : basePrice;
      
      const typeLabel = pizzaFarcita ? 'Farcita' : 'Base';
      const priceInfo = pizzaFarcita 
        ? `€${basePrice} - €${maxPrice.toFixed(2)} (${toppingsCount} farciture)`
        : `€${basePrice}`;
      
      return {
        title: name || 'Spianata senza nome',
        subtitle: `${typeLabel} - ${priceInfo}`,
        media: image,
      };
    },
  },
})