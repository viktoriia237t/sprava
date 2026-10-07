/* Дані про сайт із FreeSerp Main (index=sites), які сайт вбудовує в статику під час збірки */
export interface SiteCard {
  domain: string;
  title: string | null;
  /* AI-опис головної сторінки від FreeSerp (англійською); null, якщо FreeSerp не зміг її прочитати */
  summary: string | null;
  dr: number | null;
  tech: string | null;
}

/* Сторінка з FreeSerp Global (index=web) */
export interface SerpHit {
  url: string;
  title?: string;
  snippet?: string;
  domain?: string;
  published_at?: string;
}

export interface CatalogData {
  fetchedAt: string;
  sites: Record<string, SiteCard | null>;
  similar: Record<string, SiteCard[]>;
  /* «Згадки в мережі» для кожного сервісу. Їх теж беремо під час збірки: FreeSerp
     надсилає заголовок Access-Control-Allow-Origin двічі, і браузери відкидають відповідь */
  mentions: Record<string, SerpHit[]>;
}
