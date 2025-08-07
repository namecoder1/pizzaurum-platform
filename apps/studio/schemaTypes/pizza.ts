import { HeartIcon } from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const pizza = defineType({
  icon: HeartIcon,
  name: 'pizza',
  title: 'Pizze',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrizione',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Prezzo',
      type: 'number',
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
      name: 'isFeatured',
      title: 'Pizza in evidenza',
      type: 'boolean',
      validation: (Rule) => [
        Rule.custom(async (value, context) => {
          // Se il campo non è true, non c'è bisogno di validare
          if (!value) return true

          const {document, getClient} = context
          const client = getClient({apiVersion: '2023-01-01'})

          try {
            // Ottieni l'ID pulito (senza drafts.)
            const documentId = document?._id || ''
            const cleanId = documentId.replace(/^drafts\./, '')

            // Query per contare tutte le pizze in evidenza (escludendo il documento corrente sia come draft che pubblicato)
            const query = `
              count(
                *[
                  (_type == "pizza" || _type == "pizzaurum") && 
                  isFeatured == true && 
                  !(_id in [$currentId, $draftId, $publishedId]) &&
                  !(_id in path("drafts.**") && _id == "drafts." + $cleanId)
                ]
              )
            `

            const currentFeaturedCount = await client.fetch(query, {
              currentId: documentId,
              draftId: `drafts.${cleanId}`,
              publishedId: cleanId,
              cleanId: cleanId,
            })

            // Permetti massimo 4 pizze in evidenza totali
            if (currentFeaturedCount >= 4) {
              return 'Puoi avere massimo 4 pizze in evidenza in totale. Disattiva prima una pizza esistente.'
            }

            return true
          } catch (error) {
            console.error('Errore nella validazione pizza in evidenza:', error)
            return true // In caso di errore, permetti la modifica
          }
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: ['Base bianca', 'Base rossa'],
      },
    }),
  ],
})
