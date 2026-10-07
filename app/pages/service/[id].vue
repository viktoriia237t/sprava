<script setup lang="ts">
import { DATA, TYPES, byId, catName } from "#shared/catalog";

const d = byId[useRoute().params.id as string];
if (!d) throw createError({ statusCode: 404, statusMessage: "Сервіс не знайдено", fatal: true });

const { data: fs } = await useCatalogData();
const card = computed(() => fs.value.sites[d.id] ?? null);
const similar = computed(() => fs.value.similar[d.cat] ?? []);

useSeoMeta({
  title: `${d.name} — ${catName(d.cat)} | Справа`,
  description: d.desc,
  ogTitle: d.name,
  ogDescription: d.desc,
});

const mentionsQuery = `${d.name} ${host(d.url).split(".")[0]}`;
const types = d.for.map(t => TYPES[t]).join(", ").toLowerCase();
const related = computed(() => DATA.filter(x => x.cat === d.cat && x.id !== d.id)
  .sort((a, b) => (fs.value.sites[b.id]?.dr ?? -1) - (fs.value.sites[a.id]?.dr ?? -1)));

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

    <h2 class="sec">Дані FreeSerp</h2>
    <dl v-if="card" class="facts">
      <div v-if="card.dr != null"><dt>Domain Rating</dt><dd><b>{{ card.dr }}</b> / 100</dd></div>
      <div v-if="card.title"><dt>Заголовок головної сторінки</dt><dd>{{ card.title }}</dd></div>
      <div v-if="card.summary"><dt>AI-опис сайту (англійською)</dt><dd lang="en">{{ card.summary }}</dd></div>
      <div v-else><dt>AI-опис сайту</dt><dd class="note">FreeSerp не зміг прочитати вміст головної сторінки.</dd></div>
      <div v-if="card.tech"><dt>Технологія сайту</dt><dd>{{ card.tech }}</dd></div>
    </dl>
    <p v-else class="note">Цього сайту поки немає в індексі FreeSerp Main.</p>
    <p v-if="fs.fetchedAt" class="note">Дані оновлено під час збірки сайту {{ buildDate(fs.fetchedAt) }}.</p>

    <h2 class="sec">Згадки в мережі</h2>
    <p class="note">Українськомовні сторінки з FreeSerp Global. <a :href="freeserpSearchUrl(mentionsQuery)" target="_blank" rel="noopener">Більше результатів на freeserp.ai</a></p>
    <SerpResults status="done" :items="fs.mentions[d.id] ?? []" />

    <template v-if="related.length">
      <h2 class="sec">Інші сервіси в категорії</h2>
      <div class="rows"><ServiceRow v-for="r in related" :key="r.id" :d="r" :dr="fs.sites[r.id]?.dr" /></div>
    </template>

    <template v-if="similar.length">
      <h2 class="sec">Схожі сайти в Україні</h2>
      <p class="note">Автоматична добірка FreeSerp Main: сайти в зоні .ua за запитом категорії, відсортовані за Domain Rating. Редакція їх не перевіряла.</p>
      <div class="results">
        <div v-for="s in similar" :key="s.domain" class="res">
          <a :href="`https://${s.domain}`" target="_blank" rel="noopener">{{ s.title || s.domain }}</a>
          <small>{{ s.domain }}<template v-if="s.dr != null">, DR {{ s.dr }}</template></small>
          <p v-if="s.summary" lang="en">{{ s.summary }}</p>
        </div>
      </div>
    </template>
  </article>
</template>
