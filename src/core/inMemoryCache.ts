import type {
  Cache,
  CacheEntry,
  CacheKey,
  CacheOptions,
  CacheStats,
  GetOrLoadOptions
} from './types';

export class InMemoryCache implements Cache {
  private store = new Map<CacheKey, CacheEntry>();
  private hits = 0;
  private misses = 0;

  constructor(private options: CacheOptions = {}) {}

  private isExpired(entry: CacheEntry): boolean {
    if (entry.expiresAt == null) return false;
    return Date.now() > entry.expiresAt;
  }

  get<T = unknown>(key: CacheKey): T | null {
    const entry = this.store.get(key);
    if (!entry) {
      this.misses++;
      return null;
    }
    if (this.isExpired(entry)) {
      this.store.delete(key);
      this.misses++;
      return null;
    }
    this.hits++;
    return entry.value as T;
  }

  set<T = unknown>(
    key: CacheKey,
    value: T | null,
    ttlMs?: number,
    meta?: Record<string, unknown>
  ): CacheEntry<T> {
    const now = Date.now();
    const ttl = ttlMs ?? this.options.defaultTtlMs;
    const entry: CacheEntry<T> = {
      key,
      value,
      createdAt: now,
      updatedAt: now,
      expiresAt: ttl ? now + ttl : undefined,
      meta
    };

    this.store.set(key, entry);
    return entry;
  }

  async getOrLoad<T = unknown>(
    key: CacheKey,
    loader: () => Promise<T | null>,
    options: GetOrLoadOptions = {}
  ): Promise<T | null> {
    if (!options.forceRefresh) {
      const cached = this.get<T>(key);
      if (cached !== null) return cached;
    }

    const value = await loader();
    this.set(key, value, options.ttlMs);
    return value;
  }

  invalidate(predicate: (entry: CacheEntry) => boolean): number {
    let count = 0;
    for (const [key, entry] of this.store.entries()) {
      if (predicate(entry)) {
        this.store.delete(key);
        count++;
      }
    }
    return count;
  }

  clear(): void {
    this.store.clear();
    this.hits = 0;
    this.misses = 0;
  }

  stats(): CacheStats {
    return {
      size: this.store.size,
      hits: this.hits,
      misses: this.misses
    };
  }
}
