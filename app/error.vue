<script setup lang="ts">
import type { NuxtError } from "#app";
const props = defineProps<{ error: NuxtError }>();
useSeoMeta({ title: "Сторінку не знайдено — Справа" });
</script>

<template>
  <div class="wrap svc-page">
    <h1>{{ props.error.statusCode === 404 ? "Сторінку не знайдено" : "Щось пішло не так" }}</h1>
    <p class="lead">Можливо, посилання застаріло. Поверніться до каталогу, там є всі сервіси.</p>
    <button class="btn" type="button" @click="clearError({ redirect: '/' })">На головну</button>
  </div>
</template>
