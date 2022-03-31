<template>
  <div class="animate-pulse" :class="[bgCss, css]"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  css: {
    type: String,
    default: 'w-20 h-3',
  },
  bgCss: {
    type: String,
    default: 'bg-slate-400',
  },
});
</script>
