// lib/meiliClient.js

import { MeiliSearch } from 'meilisearch';

export const meiliClient = new MeiliSearch({
  host: import.meta.env.VITE_MEILI_HOST || 'http://127.0.0.1:7700',
  apiKey: import.meta.env.VITE_MEILI_API_KEY || '', // optional if no key
});

export const artisansIndex = meiliClient.index('artisans');
