import {
  InMemoryCache,
  withCache,
  createDictProvider
} from '../src/index.js';

const dict = {
  'page:home': { title: 'Home', body: 'Welcome to cms-cache demo.' }
};

const rawProvider = createDictProvider(dict);
const cache = new InMemoryCache({ defaultTtlMs: 60_000 });

const provider = withCache(rawProvider, cache, {
  keyBuilder: (req) => `cms:${req.resource}:${req.id ?? ''}`,
  ttlMs: 60_000
});

async function run() {
  const page = await provider.fetch<{ title: string; body: string }>({
    resource: 'page',
    id: 'home'
  });

  console.log('Fetched page:', page);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
