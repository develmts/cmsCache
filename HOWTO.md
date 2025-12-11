# How to use cms-cache

This guide explains how to install, integrate, and extend `cms-cache` in any project.

---

## Installation

If published on npm:

```bash
npm install cms-cache
```

(If not, it can be installed directly from a GitHub repository.)

---

## Quickstart

1. Implement a **CmsProvider**  
   A provider is any object with a `fetch(request)` function that returns content.

2. Wrap it using **withCache()**  
   This adds caching transparently without modifying the provider itself.

3. Call `provider.fetch()` normally  
   Your caching policy is completely under your control.

---

## Creating a custom provider

```ts
const provider: CmsProvider = {
  async fetch(req) {
    const data = await loadSomething(req);
    return data;
  }
};
```

Providers can fetch over HTTP, read files, query databases, or call other services — there are no restrictions.

---

## Adding caching to a provider

```ts
const cachedProvider = withCache(provider, cache, {
  keyBuilder: req => `${req.resource}:${req.id}`,
  ttlMs: 60_000   // 1 minute
});
```

---

## Cache key builders

Cache keys determine when two requests refer to the same resource.

```ts
req => `${req.resource}:${req.id}:${req.params?.locale ?? 'default'}`
```

Key builders can encode:
- locale  
- versions  
- user roles  
- query params  
- anything meaningful for your CMS

---

## TTL and invalidation

### Default TTL
```ts
new InMemoryCache({ defaultTtlMs: 300_000 }); // 5 minutes
```

### TTL per operation
```ts
cache.getOrLoad(key, loader, { ttlMs: 10_000 });
```

### Conditional invalidation
```ts
cache.invalidate(entry => entry.key.startsWith("blog:"));
```

This is useful when content updates are triggered externally.

---

## When should you use cms-cache?

- Your CMS is **slow**, remote, or rate-limited  
- Your backend **charges per request**  
- You want to **reduce load** on an upstream API  
- You serve content from **CDNs or GitHub Pages** and want to avoid repeated downloads  
- You want a **simple, predictable caching layer** that does not impose any schema or model

---

## When NOT to use cms-cache

- When you need a persistent cache (redis/memcached recommended)  
- When your content changes on every request  
- When you need distributed cache invalidation across servers  

For everything else, `cms-cache` is a small, predictable tool that stays out of the way.
