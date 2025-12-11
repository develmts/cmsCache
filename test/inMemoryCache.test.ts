import { describe, it, expect } from 'vitest';
import { InMemoryCache } from '../src/core/inMemoryCache';

describe('InMemoryCache', () => {
  it('stores and retrieves values', () => {
    const cache = new InMemoryCache({ defaultTtlMs: 1000 });
    cache.set('foo', 'bar');
    expect(cache.get('foo')).toBe('bar');
  });

  it('returns null for missing keys', () => {
    const cache = new InMemoryCache();
    expect(cache.get('missing')).toBeNull();
  });
});
