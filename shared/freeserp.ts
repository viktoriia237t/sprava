/* Дані про сайт із FreeSerp Main (index=sites), які сайт вбудовує в статику під час збірки */
export interface SiteCard {
  domain: string;
  title: string | null;
  /* AI-опис головної сторінки від FreeSerp (англійською); null, якщо FreeSerp не зміг її прочитати */
  summary: string | null;
  dr: number | null;
  tech: string | null;
}

export interface CatalogData {
  fetchedAt: string;
  sites: Record<string, SiteCard | null>;
  similar: Record<string, SiteCard[]>;
}
