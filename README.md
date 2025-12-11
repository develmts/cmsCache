# cms-cache

Agnostic in-memory cache layer for any CMS provider.

## Install

```bash
npm install cms-cache
# or
pnpm add cms-cache
# or
yarn add cms-cache
```

## Quick example

```ts
import {
  InMemoryCache,
  withCache,
  createDictProvider
} from 'cms-cache';

const dict = {
  'page:home': { title: 'Home', body: '...' }
};

const rawProvider = createDictProvider(dict);
const cache = new InMemoryCache({ defaultTtlMs: 60_000 });

const provider = withCache(rawProvider, cache, {
  keyBuilder: (req) => `cms:${req.resource}:${req.id ?? ''}`,
  ttlMs: 60_000
});

const page = await provider.fetch({
  resource: 'page',
  id: 'home'
});
```
