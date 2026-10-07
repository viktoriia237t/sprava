<script setup lang="ts">
const props = defineProps<{ id: string; variant?: "row" | "page" }>();
const kit = useKit();
const on = computed(() => kit.has(props.id));
</script>

<template>
  <button v-if="variant === 'page'" class="btn ghost" type="button" :aria-pressed="on" @click="kit.toggle(id)">
    {{ on ? "Прибрати з набору" : "Додати в набір" }}
  </button>
  <button v-else class="add" type="button" :aria-pressed="on" @click="kit.toggle(id)">
    {{ on ? "✓ У наборі" : "+ У набір" }}
  </button>
</template>
