import {theme} from 'https://themer.sanity.build/api/hues?default=878385&primary=93050e;600&transparent=878385&positive=43d675;300&caution=fbd024;200&lightest=fdfcfc&darkest=080808'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { itITLocale } from '@sanity/locale-it-it'

export default defineConfig({
  theme,
  name: 'default',
  title: 'Pizzaurum',

  projectId: 'i20dthz1',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), itITLocale({
    title: 'Pizzaurum',
  })],

  schema: {
    types: schemaTypes,
  },
})
