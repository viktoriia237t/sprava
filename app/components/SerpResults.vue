<script setup lang="ts">
defineProps<{
  status: "idle" | "loading" | "error" | "done";
  items: SerpHit[];
  loadingText?: string;
}>();
</script>

<template>
  <div class="results" aria-live="polite">
    <p v-if="status === 'loading'" class="note">{{ loadingText || "Шукаємо…" }}</p>
    <p v-else-if="status === 'error'" class="err">Не вдалося отримати результати з FreeSerp. Перевірте з'єднання і спробуйте ще раз.</p>
    <template v-else-if="status === 'done'">
      <p v-if="!items.length" class="note">Нічого не знайшлося. Спробуйте коротший запит або інші слова.</p>
      <div v-for="(h, i) in items" :key="i" class="res">
        <a :href="safeUrl(h.url)" target="_blank" rel="noopener">{{ h.title || h.url }}</a>
        <small>{{ h.domain || host(h.url) }}<template v-if="h.published_at">, {{ h.published_at }}</template></small>
        <p v-if="h.snippet">{{ h.snippet }}</p>
      </div>
    </template>
  </div>
</template>
