import type { CmsProvider, CmsRequest } from '../cms/provider';

export type DictStore = Record<string, unknown>;

/**
 * The simplest possible CMS provider: a plain JS dictionary.
 * Keys are derived from `${resource}:${id}`.
 */
export function createDictProvider(store: DictStore): CmsProvider {
  return {
    async fetch<T = unknown>(request: CmsRequest): Promise<T | null> {
      const { resource, id } = request;
      if (!id) return null;
      const key = `${resource}:${id}`;
      const value = store[key];
      return (value ?? null) as T | null;
    }
  };
}
