// src/services/cms/pages.ts

import type { Locale } from '~/services/core/locale'
import type { CmsBlock, CmsPage } from './types'
import { getCmsBlock } from './blocks'

/**
 * Versió "pàgina" del CMS.
 *
 * De moment, simplement reusa getCmsBlock(slug, locale).
 * Quan tinguis Sanity real o Nuxt Content estructurat amb "pages",
 * aquí hi podem fer una query específica si cal.
 */
export async function getCmsPage(
  slug: string,
  locale: Locale,
): Promise<CmsPage | null> {
  const block: CmsBlock | null = await getCmsBlock(slug, locale)
  if (!block)
    return null

  // Ara CmsPage és CmsBaseDocument + { locale }
  // Reaprofitem tot el que vingui del bloc (raw, ast, render, collection, etc.)
  const page: CmsPage = {
    ...block,
    locale, // ens assegurem que és obligatori
  }

  return page
}
