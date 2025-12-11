// src/services/cms/blocks.ts

import type { Locale } from '~/services/core/locale'
import type { CmsBlock } from './types'

import { resolveCmsSource, logCmsSource } from './cmsTools'
import type { CmsSource } from './internal'
import { getContentBySlug } from './contentful'
import { contentGetBlock } from './content'

/**
 * BACKEND: Contentful (ara mateix: mocks TS que tens a services/contentful.ts)
 */
async function getBlockFromContentful(
  slug: string,
  locale: Locale,
): Promise<CmsBlock | null> {
  return getContentBySlug(slug, locale)
}

/**
 * BACKEND: Nuxt Content.
 */
async function getBlockFromNuxtContent(
  slug: string,
  locale: Locale,
): Promise<CmsBlock | null> {
  const block = await contentGetBlock(slug, locale)
  if (!block)
    return null
  return block
}

/**
 * BACKEND: Sanity (futur).
 * Ara mateix: warning + null.
 * El dia que tinguis esquemes i dades a Sanity, aquí hi posarem sanityFetch()
 * amb una query GROQ i el map a CmsBlock.
 */
async function getBlockFromSanity(
  slug: string,
  locale: Locale,
): Promise<CmsBlock | null> {
  console.warn(
    `[cms/sanity] getBlockFromSanity("${slug}", "${locale}") not implemented.`,
  )
  return null
}

/**
 * API pública: l’única funció que ha de fer servir el frontend per blocs.
 */
export async function getCmsBlock(
  slug: string,
  locale: Locale,
): Promise<CmsBlock | null> {
  const source: CmsSource = resolveCmsSource()
  logCmsSource(
    `[getCmsBlock] slug=${slug} locale=${locale} path=/${locale}/${slug}`,
    source,
  )

  switch (source) {
    case 'content':
      return getBlockFromNuxtContent(slug, locale)

    case 'sanity':
      return getBlockFromSanity(slug, locale)

    case 'contentful':
    default:
      return getBlockFromContentful(slug, locale)
  }
}
