# cms-cache

**Agnostic in-memory caching layer for any CMS provider**

`cms-cache` is a lightweight, fully agnostic library providing an in-memory caching layer in front of any content source or CMS. It makes no assumptions about schemas, formats, or data structures — you decide the cache keys, refresh rules, and the provider that supplies the content.

It is ideal when your CMS or content backend is:
- slow,
- rate-limited,
- expensive to query,
- remote or unstable,
- or simply receives repeated requests for the same resources.

---

## ✨ Features

- **No opinions about your CMS or data**  
  Cache objects exactly as they are — no transformations, no schema constraints.

- **Transparent caching around any provider**  
  Wrap any content provider with `withCache()` without changing its interface.

- **In-memory implementation with zero dependencies**  
  Perfect for SSR, microservices, edge runtimes, and local development.

- **Flexible TTL and invalidation**  
  Expire entries automatically or clear them conditionally.

- **Fully customizable cache keys**  
  You define how resources are identified and grouped.

---

## 📁 Additional Documentation

- **EXAMPLE.md** — A complete example showing how to cache remote JSON resources.  
- **HOWTO.md** — Installation, quickstart, provider patterns, TTL strategies, and key builder examples.
