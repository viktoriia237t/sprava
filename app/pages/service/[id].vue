<script setup lang="ts">
import { DATA, TYPES, byId, catName } from "~/data/catalog";

const d = byId[useRoute().params.id as string];
if (!d) throw createError({ statusCode: 404, statusMessage: "Сервіс не знайдено", fatal: true });

useSeoMeta({
  title: `${d.name} — ${catName(d.cat)} | Справа`,
  description: d.desc,
  ogTitle: d.name,
  ogDescription: d.desc,
});

const types = d.for.map(t => TYPES[t]).join(", ").toLowerCase();
const related = DATA.filter(x => x.cat === d.cat && x.id !== d.id);

/* Згадки в мережі завантажуються вже в браузері, щоб у статиці не було застарілих даних */
const status = ref<"idle" | "loading" | "error" | "done">("loading");
const mentions = ref<SerpHit[]>([]);
onMounted(async () => {
  try { mentions.value = await freeserp(`${d.name} ${host(d.url).split(".")[0]}`, 4); status.value = "done"; }
  catch { status.value = "error"; }
});
</script>

<template>
  <article class="wrap svc-page">
    <nav class="crumbs" aria-label="Навігація">
      <NuxtLink :to="{ path: '/', hash: '#catalog' }">Каталог</NuxtLink> / <span>{{ catName(d.cat) }}</span>
    </nav>
    <h1>{{ d.name }}</h1>
    <div class="note">{{ catName(d.cat) }}<template v-if="d.gov">, державний сервіс</template></div>
    <p class="lead">{{ d.desc }}</p>
    <p class="note">Кому підходить: {{ types }}.</p>
    <div class="acts">
      <a class="btn" :href="d.url" target="_blank" rel="noopener">Відкрити {{ host(d.url) }}</a>
      <KitButton :id="d.id" variant="page" />
    </div>

    <h2 class="sec">Згадки в мережі</h2>
    <SerpResults :status="status" :items="mentions" loading-text="Завантажуємо з FreeSerp…" />

    <template v-if="related.length">
      <h2 class="sec">Інші сервіси в категорії</h2>
      <div class="rows"><ServiceRow v-for="r in related" :key="r.id" :d="r" /></div>
    </template>
  </article>
</template>
