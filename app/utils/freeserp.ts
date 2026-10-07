export interface SerpHit {
  url: string;
  title?: string;
  snippet?: string;
  domain?: string;
  published_at?: string;
}

/* Живий пошук через FreeSerp Global (index=web, українська мова) — виконується в браузері */
export async function freeserp(q: string, size = 5): Promise<SerpHit[]> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 9000);
  try {
    const url = "https://freeserp.ai/api.php?" + new URLSearchParams({index:"web", q, lang:"uk", size:String(size), agent:"Sprava/1.0"});
    const r = await fetch(url, {signal: ctrl.signal});
    if (!r.ok) throw new Error("HTTP " + r.status);
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "API error");
    return j.results || [];
  } finally { clearTimeout(timer); }
}

/* Дата збірки з ISO-рядка без залежності від часового поясу, щоб SSR і браузер показували однакове */
export const buildDate = (iso: string) => iso ? iso.slice(0, 10).split("-").reverse().join(".") : "";
