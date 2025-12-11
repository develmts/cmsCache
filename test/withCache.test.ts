import { describe, it, expect, vi } from 'vitest';
import { InMemoryCache } from '../src/core/inMemoryCache';
import { withCache, type CmsProvider, type CmsRequest } from '../src/cms/provider';

describe('withCache', () => {
  it('calls underlying provider only once when cached', async () => {
    const cache = new InMemoryCache({ defaultTtlMs: 1000 });

    const fetchSpy = vi.fn(async (req: CmsRequest) => ({ id: req.id, value: 42 }));
    const provider: CmsProvider = { fetch: fetchSpy };

    const cachedProvider = withCache(provider, cache, {
      keyBuilder: (req) => `test:${req.resource}:${req.id ?? ''}`,
      ttlMs: 1000
    });

    const req: CmsRequest = { resource: 'page', id: 'home' };

    const first = await cachedProvider.fetch(req);
    const second = await cachedProvider.fetch(req);

    expect(first).toEqual({ id: 'home', value: 42 });
    expect(second).toEqual({ id: 'home', value: 42 });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
