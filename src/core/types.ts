export type CacheKey = string;

export interface CacheEntry<T = unknown> {
  key: CacheKey;
  value: T | null;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
  meta?: Record<string, unknown>;
}

export interface CacheOptions {
  defaultTtlMs?: number;
  maxEntries?: number;
}

export interface GetOrLoadOptions {
  ttlMs?: number;
  forceRefresh?: boolean;
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
}

export interface Cache {
  get<T = unknown>(key: CacheKey): T | null;
  set<T = unknown>(
    key: CacheKey,
    value: T | null,
    ttlMs?: number,
    meta?: Record<string, unknown>
  ): CacheEntry<T>;
  getOrLoad<T = unknown>(
    key: CacheKey,
    loader: () => Promise<T | null>,
    options?: GetOrLoadOptions
  ): Promise<T | null>;
  invalidate(predicate: (entry: CacheEntry) => boolean): number;
  clear(): void;
  stats(): CacheStats;
}
