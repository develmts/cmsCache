// src/services/cms/cmsTools.ts
//
// Eines INTERNES del CMS. No s’exporten mai des de l'index.
// Només les fan servir blocks.ts, pages.ts, cmsQueries.ts, etc.

import type { CmsSource } from './internal'

/**
 * Determina el backend CMS actiu a partir de l'entorn
 */
export function resolveCmsSource(): CmsSource {
  const env = process.env.NUXT_PUBLIC_CMS_SOURCE || 'content'

  if (env === 'sanity' || env === 'content' || env === 'contentful') {
    return env
  }

  // Valor per defecte si no hi ha res configurat o és incorrecte
  return 'contentful'
}

/**
 * Log útil només per desenvolupament
 */
export function logCmsSource(prefix: string, source: CmsSource) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[cms] [${prefix}] using source="${source}"`)
  }
}
