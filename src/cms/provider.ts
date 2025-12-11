import type { Cache, CacheKey } from '../core/types';

export interface CmsRequest {
  resource: string;
  id?: string;
  params?: Record<string, unknown>;
}

export interface CmsProvider {
  fetch<T = unknown>(request: CmsRequest): Promise<T | null>;
}

export type CacheKeyBuilder = (request: CmsRequest) => CacheKey;

export interface WithCacheOptions {
  keyBuilder: CacheKeyBuilder;
  ttlMs?: number;
}

/**
 * Wrap a CmsProvider with a cache. The cache is completely agnostic to
 * the structure of the data; it only sees keys and values.
 */
export function withCache(
  provider: CmsProvider,
  cache: Cache,
  options: WithCacheOptions
): CmsProvider {
  const { keyBuilder, ttlMs } = options;

  return {
    async fetch<T = unknown>(request: CmsRequest): Promise<T | null> {
      const key = keyBuilder(request);
      return cache.getOrLoad<T>(
        key,
        () => provider.fetch<T>(request),
        { ttlMs }
      );
    }
  };
}
