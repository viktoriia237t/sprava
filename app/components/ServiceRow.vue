<script setup lang="ts">
import type { Service } from "#shared/catalog";
defineProps<{ d: Service; dr?: number | null }>();
</script>

<template>
  <div class="row">
    <div>
      <NuxtLink class="name" :to="`/service/${d.id}`">{{ d.name }}</NuxtLink><span class="dom">{{ host(d.url) }}</span><span v-if="d.gov" class="gov" title="Державний сервіс">держ</span><span v-if="dr != null" class="dr" title="Domain Rating за даними FreeSerp, 0–100">DR {{ dr }}</span>
      <p>{{ d.desc }}</p>
    </div>
    <KitButton :id="d.id" />
  </div>
</template>
