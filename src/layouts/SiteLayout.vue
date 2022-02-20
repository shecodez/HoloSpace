<template>
  <StarfieldBackground>
    <Header />
    <main class="container">
      <slot></slot>
    </main>
  </StarfieldBackground>
</template>

<script setup lang="ts">
import { defineProps, onMounted, toRefs } from 'vue';
import { useTitle } from '@vueuse/core';

import Header from '@/components/Header.vue';
import StarfieldBackground from '@/components/StarfieldBackground.vue';

const props = defineProps({
  pageTitle: String,
});
const { pageTitle } = toRefs(props);

onMounted(() => {
  pageTitle?.value && useTitle(`${pageTitle?.value} | ${import.meta.env.VITE_APP_NAME}`);
});
</script>

<style scoped>
.space-bg-gradient {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
}
.container {
  padding-inline: 2em;
  margin-inline: auto;
  max-width: 60rem;
}
</style>
