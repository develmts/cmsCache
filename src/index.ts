// src/services/cms/index.ts

/**
 * Punt d'entrada ÚNIC del CMS.
 *
 * Des de la resta del projecte, importa SEMPRE des d'aquí:
 *
 *   import { getCmsBlock, getCmsPage, listCmsEntries } from '~/services/cms'
 *
 * Això garanteix que podem canviar la implementació interna
 * (Nuxt Content, Contentful, Sanity, etc.) sense tocar cap pàgina ni component.
 *
 * IMPORTANT:
 * - Els connectors específics de cada "brand" (./content, ./contentful, ./sanity, ...)
 *   són INTERNOS del mòdul CMS i NO s'exporten mai des d'aquest index.
 * - Qualsevol codi de frontend (pàgines, components, composables) ha de veure
 *   només la façana normalitzada definida aquí.
 */

// Tipus unificats del CMS que el frontend POT utilitzar
export type {
  CmsBlock,
  CmsPage,
  CmsCollectionKey,
  CmsListSortDirection,
  CmsListSort,
  CmsListQuery,
  CmsListItem,
} from './types'

// API d'alt nivell (façana oficial)
// export * from './blocks'
// export * from './pages'
// export * from './cmsQueries'

export { getCmsBlock } from './blocks'
export { getCmsPage } from './pages'
export { listCmsEntries } from './cmsQueries'

// ⚠️ NO EXPORTAR mai connectors de brand des d’aquí:
//    - ./content      (Nuxt Content)
//    - ./contentful   (legacy / mocks locals)
//    - ./sanity       (futur backend)
// Aquests només s'han d'utilitzar des de dins del propi mòdul CMS
// (p. ex. cmsQueries.ts, pages.ts, blocks.ts), mitjançant imports interns.

