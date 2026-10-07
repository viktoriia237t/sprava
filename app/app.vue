<script setup lang="ts">
const kit = useKit();
const toast = useToast();
onMounted(kit.load);
</script>

<template>
  <div class="wrap">
    <header class="top">
      <NuxtLink class="logo" to="/"><i aria-hidden="true"></i>Справа</NuxtLink>
      <nav class="top" aria-label="Розділи">
        <NuxtLink :to="{ path: '/', hash: '#catalog' }">Каталог</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#ask' }">Пошук</NuxtLink>
        <NuxtLink to="/plan">План</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#kit' }" class="kit-link">Мій набір<b>{{ kit.ids.value.length }}</b></NuxtLink>
      </nav>
    </header>
  </div>

  <main>
    <NuxtPage />
  </main>

  <footer>
    <div class="wrap">
      <span>Справа — навчальний проєкт-каталог. Описи короткі й узагальнені, умови й ціни уточнюйте на сайтах сервісів.</span>
      <span><NuxtLink to="/plan">План сайту</NuxtLink> · Дані: <a href="https://freeserp.ai/docs.php" target="_blank" rel="noopener">FreeSerp API</a> · <a href="https://github.com/viktoriia237t/sprava" target="_blank" rel="noopener">GitHub</a></span>
    </div>
  </footer>

  <div class="toast" :class="{ show: toast.visible.value }" role="status">{{ toast.msg.value }}</div>
</template>
