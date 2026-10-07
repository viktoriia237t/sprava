<script setup lang="ts">
import type { Service } from "~/data/catalog";
defineProps<{ d: Service }>();
</script>

<template>
  <div class="row">
    <div>
      <NuxtLink class="name" :to="`/service/${d.id}`">{{ d.name }}</NuxtLink><span class="dom">{{ host(d.url) }}</span><span v-if="d.gov" class="gov" title="Державний сервіс">держ</span>
      <p>{{ d.desc }}</p>
    </div>
    <KitButton :id="d.id" />
  </div>
</template>
