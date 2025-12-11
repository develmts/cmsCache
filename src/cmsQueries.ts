// src/services/cms/cmsQueries.ts
//
// API centralitzada per fer consultes (llistes) al CMS.
// Aquesta és la façana que el frontend ha d'utilitzar.
//
// - Rep sempre UN sol paràmetre: CmsListQuery
// - Retorna sempre un format normalitzat: CmsListItem[]
//
// La lògica real s’executa als connectors de backend:
//   - contentListEntries()       → Nuxt Content
//   - sanityListEntries()        → Sanity (stub)
//   - contentfulListEntries()    → Contentful (stub)
//

import { resolveCmsSource, logCmsSource } from './cmsTools'

// Tipus unificats del CMS (façana pública)
import type {
  CmsListQuery,
  CmsListItem,
} from './types'

// Tipus interns (no exposats a la façana pública)
import type { CmsSource } from './internal'

// Implementacions per backend
import { contentListEntries } from './content'
import { sanityListEntries } from './sanity'
import { contentfulListEntries } from './contentful'

/**
 * Funció principal: API unificada per listar entrades CMS.
 *
 * Aquesta és l'única funció que s'ha d'utilitzar des del frontend.
 * Tota la part de com consultar Nuxt Content, Sanity o Contentful
 * queda encapsulada als connectors de cada backend.
 */
export async function listCmsEntries(
  params: CmsListQuery
): Promise<CmsListItem[]> {
  const source: CmsSource = resolveCmsSource()
  logCmsSource(`listCmsEntries collection=${params.collection}`, source)

  switch (source) {
    case 'content':
      return contentListEntries(params)

    case 'sanity':
      return sanityListEntries(params)

    case 'contentful':
    default:
      return contentfulListEntries(params)
  }
}
