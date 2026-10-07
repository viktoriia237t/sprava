<script setup lang="ts">
import { CATS, TYPES, DATA, ROUTES, byId, catName, type BizType } from "#shared/catalog";

useSeoMeta({
  title: "Справа — сервіси для малого бізнесу в Україні",
  description: "Каталог українських онлайн-сервісів для ФОП і малого бізнесу: каси, банки, доставка, CRM, документи. Готові набори для старту.",
  ogTitle: "Справа — сервіси для малого бізнесу в Україні",
  ogDescription: "Готові маршрути старту для інтернет-магазину, офлайн-точки та фрилансу.",
});

const kit = useKit();
const toast = useToast();
const { data: fs } = await useCatalogData();
const site = (id: string) => fs.value.sites[id] ?? null;
const TYPE_KEY = "sprava-type";

/* Hero: маршрут старту */
const active = ref<BizType>("shop");
const flash = ref(0);
const route = computed(() => ROUTES[active.value]);
onMounted(() => {
  try {
    const s = JSON.parse(localStorage.getItem(TYPE_KEY) || "null");
    if (s in ROUTES) active.value = s;
  } catch {}
});
function pick(t: BizType){
  active.value = t; flash.value++;
  try { localStorage.setItem(TYPE_KEY, JSON.stringify(t)); } catch {}
}
function addRoute(){ kit.addMany(route.value.steps.map(([id]) => id)); toast.show("Додано в мій набір"); }
function showType(){ forType.value = active.value; document.getElementById("catalog")?.scrollIntoView(); }

/* Каталог */
const q = ref("");
const cat = ref("");
const forType = ref<"" | BizType>("");
const found = computed(() => DATA.filter(d => {
  if (cat.value && d.cat !== cat.value) return false;
  if (forType.value && !d.for.includes(forType.value)) return false;
  const words = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const s = site(d.id);
  const hay = [d.name, d.desc, catName(d.cat), host(d.url), s?.title, s?.summary].join(" ").toLowerCase();
  return words.every(w => hay.includes(w));
}));
const groups = computed(() => CATS
  .map(c => ({ ...c, items: found.value.filter(d => d.cat === c.id)
    // Усередині категорії спершу сайти з вищим Domain Rating за FreeSerp
    .sort((a, b) => (site(b.id)?.dr ?? -1) - (site(a.id)?.dr ?? -1)) }))
  .filter(g => g.items.length));
function toAsk(){ if (q.value.trim()) askQ.value = q.value.trim(); }

/* Пошук у мережі */
const askQ = ref("");
const askStatus = ref<"idle" | "loading" | "error" | "done">("idle");
const askItems = ref<SerpHit[]>([]);
async function ask(){
  const v = askQ.value.trim(); if (!v) return;
  askStatus.value = "loading";
  try { askItems.value = await freeserp(v, 8); askStatus.value = "done"; }
  catch { askStatus.value = "error"; }
}

/* Мій набір */
const kitItems = computed(() => kit.ids.value.map(id => byId[id]!));
function clearKit(){ kit.clear(); toast.show("Набір очищено"); }
async function copyKit(){
  const text = kitItems.value.map(d => `${d.name}: ${d.url}`).join("\n");
  try { await navigator.clipboard.writeText(text); toast.show("Список скопійовано"); }
  catch { toast.show("Не вдалося скопіювати. Виділіть список вручну"); }
}
</script>

<template>
  <div class="wrap">
    <section class="hero" aria-labelledby="h1">
      <h1 id="h1">Відкрити справу без хаосу в сервісах</h1>
      <p class="lead">Оберіть, чим займаєтесь, і побачите, які українські сервіси підключити і в якому порядку: від реєстрації ФОП до першого замовлення.</p>
      <div class="picker" role="group" aria-label="Тип бізнесу">
        <button v-for="(label, k) in TYPES" :key="k" type="button" :aria-pressed="k === active" @click="pick(k)">{{ label }}</button>
      </div>
      <div :key="`${active}-${flash}`" class="route flash" aria-live="polite">
        <h2>{{ route.title }}: {{ route.steps.length }} кроків</h2>
        <ol class="steps">
          <li v-for="[id, what] in route.steps" :key="id">
            <div class="what">{{ what }}</div>
            <NuxtLink class="svc" :to="`/service/${id}`">{{ byId[id]!.name }}</NuxtLink>
          </li>
        </ol>
        <div class="actions">
          <button class="btn" type="button" @click="addRoute">Додати все в мій набір</button>
          <button class="btn ghost" type="button" @click="showType">Усі сервіси для цього бізнесу</button>
        </div>
      </div>
    </section>
  </div>

  <section id="catalog" class="block" aria-labelledby="catH">
    <div class="wrap">
      <h2 id="catH" class="title">Каталог</h2>
      <p class="sub">Сервіси, якими користуються ФОП і невеликі компанії в Україні. Натисніть на назву, щоб побачити опис, дані FreeSerp і свіжі згадки в мережі.</p>
      <p v-if="fs.fetchedAt" class="note src">Domain Rating, заголовки та AI-описи сайтів — з <a href="https://freeserp.ai/docs.php" target="_blank" rel="noopener">FreeSerp Main</a>, оновлено під час збірки {{ buildDate(fs.fetchedAt) }}. Сортування в категоріях — за DR.</p>
      <div class="tools">
        <label><span class="sr">Пошук у каталозі</span><input v-model="q" type="search" placeholder="Наприклад: каса, доставка, CRM"></label>
        <label><span class="sr">Тип бізнесу</span>
          <select v-model="forType">
            <option value="">Будь-який бізнес</option>
            <option v-for="(label, k) in TYPES" :key="k" :value="k">{{ label }}</option>
          </select>
        </label>
      </div>
      <div class="chips" role="group" aria-label="Категорія">
        <button type="button" :aria-pressed="cat === ''" @click="cat = ''">Усі</button>
        <button v-for="c in CATS" :key="c.id" type="button" :aria-pressed="cat === c.id" @click="cat = c.id">{{ c.name }}</button>
      </div>
      <div class="count" aria-live="polite">{{ found.length ? `Знайдено: ${found.length}` : "" }}</div>
      <div v-if="!found.length" class="empty">
        У каталозі немає збігів. Змініть фільтри або <a href="#ask" @click="toAsk">пошукайте в мережі</a>.
      </div>
      <div v-for="g in groups" v-else :key="g.id" class="group">
        <h3>{{ g.name }}</h3>
        <div class="rows"><ServiceRow v-for="d in g.items" :key="d.id" :d="d" :dr="site(d.id)?.dr" /></div>
      </div>
    </div>
  </section>

  <section id="ask" class="block ask" aria-labelledby="askH">
    <div class="wrap">
      <h2 id="askH" class="title">Не знайшли потрібне?</h2>
      <p class="sub">Пошукайте українськомовні сторінки в повнотекстовому індексі FreeSerp і подивіться, що ще є на ринку.</p>
      <form @submit.prevent="ask">
        <label><span class="sr">Що шукаєте</span><input v-model="askQ" type="search" placeholder="Наприклад: облік складу для магазину" required></label>
        <button class="btn" type="submit" :disabled="askStatus === 'loading'">Шукати в мережі</button>
      </form>
      <SerpResults :status="askStatus" :items="askItems" />
    </div>
  </section>

  <section id="kit" class="block" aria-labelledby="kitH">
    <div class="wrap">
      <h2 id="kitH" class="title">Мій набір</h2>
      <p class="sub">Сервіси, які ви відмітили. Список зберігається в цьому браузері.</p>
      <div v-if="!kitItems.length" class="empty">Тут поки порожньо. Додайте сервіси з каталогу або оберіть готовий маршрут угорі сторінки.</div>
      <template v-else>
        <ul class="kit-list">
          <li v-for="d in kitItems" :key="d.id">
            <NuxtLink :to="`/service/${d.id}`">{{ d.name }}</NuxtLink><span>{{ catName(d.cat) }}</span>
          </li>
        </ul>
        <div class="acts">
          <button class="btn" type="button" @click="copyKit">Скопіювати список</button>
          <button class="btn ghost" type="button" @click="clearKit">Очистити набір</button>
        </div>
      </template>
    </div>
  </section>
</template>
