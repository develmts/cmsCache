import { describe, it, expect } from 'vitest';
import { createDictProvider } from '../src/connectors/dictProvider';

describe('createDictProvider', () => {
  it('reads from a plain JS dictionary', async () => {
    const dict = {
      'page:home': { title: 'Home' }
    };
    const provider = createDictProvider(dict);

    const result = await provider.fetch<{ title: string }>({
      resource: 'page',
      id: 'home'
    });

    expect(result).toEqual({ title: 'Home' });
  });

  it('returns null if id is missing', async () => {
    const dict: Record<string, unknown> = {};
    const provider = createDictProvider(dict);

    const result = await provider.fetch({
      resource: 'page'
    });

    expect(result).toBeNull();
  });
});
