import type { CatalogData } from "#shared/freeserp";

/* Дані FreeSerp про сайти каталогу. Під час генерації статики запит іде на /api/catalog,
   а в браузері дані беруться з уже вбудованого payload. */
export const useCatalogData = () => useFetch<CatalogData>("/api/catalog", {
  key: "catalog",
  default: () => ({ fetchedAt: "", sites: {}, similar: {}, mentions: {} }),
});
