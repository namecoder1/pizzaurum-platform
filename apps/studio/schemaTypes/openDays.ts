import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const openDays = defineType({
  icon: CalendarIcon,
  name: 'openDays',
  title: 'Giorno di apertura',
  type: 'document',
  fields: [
    defineField({
      name: 'day',
      title: 'Giorno',
      type: 'string',
      options: {
        list: [
          {title: 'Lunedì', value: 'monday'},
          {title: 'Martedì', value: 'tuesday'},
          {title: 'Mercoledì', value: 'wednesday'},
          {title: 'Giovedì', value: 'thursday'},
          {title: 'Venerdì', value: 'friday'},
          {title: 'Sabato', value: 'saturday'},
          {title: 'Domenica', value: 'sunday'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isOpen',
      title: 'Aperto',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'timeSlots',
      title: 'Fasce orarie',
      type: 'array',
      of: [{
        type: 'object', 
        title: 'Fascia oraria',
        fields: [
          defineField({
            name: 'openTime',
            title: 'Orario apertura',
            description: 'Orario di apertura della fascia oraria',
            type: 'string',
            options: {
              list: [
                '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
                '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
                '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
                '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
                '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
              ],
            },
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: 'closeTime',
            title: 'Orario chiusura',
            description: 'Orario di chiusura della fascia oraria',
            type: 'string',
            options: {
              list: [
                '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
                '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
                '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
                '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
                '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
              ],
            },
            validation: (Rule) => Rule.required(),
          }),
        ],
        preview: {
          select: {
            openTime: 'openTime',
            closeTime: 'closeTime',
          },
          prepare({openTime, closeTime}) {
            return {
              title: `${openTime} - ${closeTime}`,
              subtitle: 'Fascia oraria',
            };
          },
        },
      }],
      validation: (Rule) => [
        Rule.custom((timeSlots: any[] | undefined, context) => {
          // Ottieni il valore del campo isOpen dal documento
          const document = context.document;
          const isOpen = document?.isOpen;
          
          // Se il giorno è chiuso, non serve validare le fasce orarie
          if (isOpen === false) {
            return true;
          }
          
          // Se il giorno è aperto, valida le fasce orarie
          if (!timeSlots || timeSlots.length === 0) {
            return 'Inserisci almeno una fascia oraria per un giorno aperto';
          }
          
          if (timeSlots.length > 2) {
            return 'Massimo 2 fasce orarie consentite';
          }
          
          // Validazione per ogni fascia oraria
          for (let i = 0; i < timeSlots.length; i++) {
            const slot = timeSlots[i] as {openTime: string, closeTime: string};
            if (!slot.openTime || !slot.closeTime) {
              return 'Inserisci sia orario di apertura che di chiusura';
            }
            
            // Converti orari in minuti per confronto
            const openMinutes = parseInt(slot.openTime.split(':')[0]) * 60 + parseInt(slot.openTime.split(':')[1]);
            const closeMinutes = parseInt(slot.closeTime.split(':')[0]) * 60 + parseInt(slot.closeTime.split(':')[1]);
            
            if (openMinutes >= closeMinutes) {
              return `L'orario di apertura deve essere precedente a quello di chiusura (fascia ${i + 1})`;
            }
          }
          
          // Se ci sono due fasce, valida che non si sovrappongano
          if (timeSlots.length === 2) {
            const slot1 = timeSlots[0] as {openTime: string, closeTime: string};
            const slot2 = timeSlots[1] as {openTime: string, closeTime: string};
            
            const open1 = parseInt(slot1.openTime.split(':')[0]) * 60 + parseInt(slot1.openTime.split(':')[1]);
            const close1 = parseInt(slot1.closeTime.split(':')[0]) * 60 + parseInt(slot1.closeTime.split(':')[1]);
            const open2 = parseInt(slot2.openTime.split(':')[0]) * 60 + parseInt(slot2.openTime.split(':')[1]);
            const close2 = parseInt(slot2.closeTime.split(':')[0]) * 60 + parseInt(slot2.closeTime.split(':')[1]);
            
            // Controlla sovrapposizioni
            if ((open1 < close2 && close1 > open2)) {
              return 'Le fasce orarie non possono sovrapporsi';
            }
          }
          
          return true;
        }),
      ],
      initialValue: [
        {
          openTime: '11:30',
          closeTime: '21:30',
        }
      ],
    }),
  ],
  preview: {
    select: {
      day: 'day',
      isOpen: 'isOpen',
      timeSlots: 'timeSlots',
    },
    prepare({day, isOpen, timeSlots}) {
      const dayNames = {
        monday: 'Lunedì',
        tuesday: 'Martedì', 
        wednesday: 'Mercoledì',
        thursday: 'Giovedì',
        friday: 'Venerdì',
        saturday: 'Sabato',
        sunday: 'Domenica'
      };
      
      const dayTitle = dayNames[day as keyof typeof dayNames] || day;
      const status = isOpen ? 'Aperto' : 'Chiuso';
      
      let timeInfo = '';
      if (timeSlots && timeSlots.length > 0) {
        const slots = timeSlots.map((slot: any) => 
          `${slot.openTime} - ${slot.closeTime}`
        ).join(', ');
        timeInfo = ` (${slots})`;
      }
      
      return {
        title: `${dayTitle} - ${status}${timeInfo}`,
        subtitle: isOpen ? `${timeSlots?.length || 0} fascia/e oraria/e` : 'Giorno di chiusura',
      };
    },
  },
})