import { DATA } from "./app/data/catalog";

// Статична генерація: `nuxt generate` → .output/public.
// Для GitHub Pages базовий шлях задається через NUXT_APP_BASE_URL (див. .github/workflows/deploy.yml).
export default defineNuxtConfig({
  compatibilityDate: "2026-10-01",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: { lang: "uk" },
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
      link: [
        { rel: "icon", href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧰</text></svg>" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&family=Unbounded:wght@500;700&display=swap" },
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", ...DATA.map(d => `/service/${d.id}`)],
    },
  },
});
