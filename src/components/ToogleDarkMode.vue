<template>
  <button @click="toggleDarkMode" class="btn btn-circle btn-ghost">
    <Icon v-if="isDark" icon="mdi:brightness-5" width="24" />
    <Icon v-else icon="mdi:weather-night" width="24" />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const isDark = ref(
  localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
);

function toggleDarkMode() {
  let html = document.querySelector<HTMLElement>('html');
  if (isDark.value) {
    localStorage.theme = 'light';
    html?.classList.remove('dark');
  } else {
    localStorage.theme = 'dark';
    html?.classList.add('dark');
  }
  isDark.value = !isDark.value;
}
</script>
