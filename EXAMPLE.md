# Example: Caching remote JSON content

This example demonstrates how to use `cms-cache` to reduce repeated requests to a backend that exposes `.json` files over HTTP — for example GitHub Pages, S3, or any static CDN.

It illustrates a realistic pattern:  
**the first request hits the network, and subsequent ones are served directly from memory**.

---

## Minimal HTTP JSON provider

```ts
import {
  InMemoryCache,
  withCache,
  type CmsProvider,
  type CmsRequest
} from 'cms-cache';

// Provider that fetches JSON resources over HTTP
function createHttpJsonProvider(baseUrl: string): CmsProvider {
  return {
    async fetch<T = unknown>(req: CmsRequest): Promise<T | null> {
      if (!req.id) return null;

      const url = `${baseUrl}/${req.resource}/${req.id}.json`;
      const res = await fetch(url);
      if (!res.ok) return null;

      return (await res.json()) as T;
    }
  };
}
```

---

## Wrap the provider with caching

```ts
const cache = new InMemoryCache({ defaultTtlMs: 5 * 60_000 }); // 5 minutes

const provider = withCache(
  createHttpJsonProvider('https://example.com/content'),
  cache,
  {
    keyBuilder: req => `json:${req.resource}:${req.id}`,
    ttlMs: 5 * 60_000
  }
);
```

---

## Using the cached provider

```ts
async function main() {
  const post = await provider.fetch<{
    title: string;
    body: string;
  }>({
    resource: 'blog',
    id: 'welcome'
  });

  console.log(post);
}

main();
```

### Notes
- The first request performs an actual HTTP fetch.  
- Subsequent requests with the same key return instantly from memory.  
- When the TTL expires, the entry is refreshed automatically on the next request.
