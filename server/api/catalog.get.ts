import { CATS, DATA } from "#shared/catalog";
import type { CatalogData, SerpHit, SiteCard } from "#shared/freeserp";

/* Під час `nuxt generate` цей маршрут викликається з кожної сторінки; результат
   потрапляє в _payload.json, тож у браузері запитів до FreeSerp за каталогом немає. */

const API = "https://freeserp.ai/api.php";
const CATALOG_HOSTS = new Set(DATA.map(d => host(d.url)));
// Захист від спаму в автоматичній добірці «Схожі сайти»
const BLOCK = /казино|casino|кредит|позик|новини|news|журнал|портал|блог|асоціац/i;
const MIN_DR = 10;
// Ознаки того, що FreeSerp не зміг прочитати головну сторінку
const BAD_SUMMARY = /parked|placeholder|only css|no visible|access denied|captcha/i;
const BAD_TITLE = /^(access denied|403|just a moment)/i;

interface RawSite {
  domain: string; title?: string | null; ai_summary?: string | null;
  dr?: number | null; ai_source?: string | null; real_site?: number;
}

async function api<T = RawSite>(params: Record<string, string | number>): Promise<T[]> {
  const qs = new URLSearchParams({ ...params, agent: "Sprava/1.0", project: "Справа", } as Record<string, string>);
  for (let attempt = 0; ; attempt++) {
    try {
      const r = await fetch(`${API}?${qs}`, { signal: AbortSignal.timeout(25000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "API error");
      return j.results || [];
    } catch (e) {
      if (attempt >= 2) throw e;
      await new Promise(res => setTimeout(res, 1000 * (attempt + 1)));
    }
  }
}

function toCard(r: RawSite): SiteCard {
  const summary = r.ai_summary?.trim() || null;
  const title = r.title?.trim() || null;
  // ai_source буває й сирим рядком генератора на кшталт "gen:…" — показуємо лише чисті назви
  const tech = r.ai_source && /^[a-z0-9_-]+$/.test(r.ai_source) && !["not_ai", "ai_likely"].includes(r.ai_source) ? r.ai_source : null;
  return {
    domain: r.domain,
    title: title && !BAD_TITLE.test(title) ? title : null,
    summary: r.real_site !== 0 && summary && !BAD_SUMMARY.test(summary) ? summary : null,
    dr: r.dr ?? null,
    tech,
  };
}

/* Простий пул, щоб не слати FreeSerp десятки запитів одночасно */
async function pool<T, R>(items: T[], size: number, fn: (x: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k]!); }
  }));
  return out;
}

async function lookup(domain: string): Promise<SiteCard | null> {
  try {
    const hit = (await api({ q: domain, size: 10, all: 1 })).find(r => r.domain.replace(/^www\./, "") === domain);
    return hit ? toCard(hit) : null;
  } catch (e) {
    console.warn(`[freeserp] ${domain}: ${(e as Error).message}`);
    return null;
  }
}

async function similar(q: string, kw: string[]): Promise<SiteCard[]> {
  try {
    const list = await api({ q, tld: "ua", sort: "dr", order: "desc", size: 60 });
    return list
      .filter(r => {
        const t = (r.title || "").toLowerCase();
        const domain = r.domain.replace(/^www\./, "");
        return !CATALOG_HOSTS.has(domain) && !domain.endsWith(".gov.ua") && (r.dr ?? 0) >= MIN_DR
          && kw.some(k => t.includes(k)) && !BLOCK.test(t);
      })
      .slice(0, 4)
      .map(toCard);
  } catch (e) {
    console.warn(`[freeserp] similar "${q}": ${(e as Error).message}`);
    return [];
  }
}

async function mentions(q: string): Promise<SerpHit[]> {
  try {
    const list = await api<SerpHit>({ index: "web", q, lang: "uk", size: 4 });
    return list.map(({ url, title, snippet, domain, published_at }) => ({ url, title, snippet, domain, published_at }));
  } catch (e) {
    console.warn(`[freeserp] mentions "${q}": ${(e as Error).message}`);
    return [];
  }
}

async function load(): Promise<CatalogData> {
  const cards = await pool(DATA, 4, d => lookup(host(d.url)));
  const sims = await pool(CATS, 4, c => similar(c.fs.q, c.fs.kw));
  const ments = await pool(DATA, 4, d => mentions(`${d.name} ${host(d.url).split(".")[0]}`));
  const missing = DATA.filter((_, i) => !cards[i]).map(d => d.id);
  if (missing.length) console.warn(`[freeserp] немає даних для: ${missing.join(", ")}`);
  return {
    fetchedAt: new Date().toISOString(),
    sites: Object.fromEntries(DATA.map((d, i) => [d.id, cards[i] ?? null])),
    similar: Object.fromEntries(CATS.map((c, i) => [c.id, sims[i] ?? []])),
    mentions: Object.fromEntries(DATA.map((d, i) => [d.id, ments[i] ?? []])),
  };
}

// Один набір запитів на всю збірку, а не на кожну з ~40 сторінок
let cached: Promise<CatalogData> | undefined;
export default defineEventHandler(() => cached ??= load());
