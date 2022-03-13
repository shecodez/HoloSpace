<template>
  <div class="animate-pulse" :class="css"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  css: {
    type: String,
    default: 'bg-base-200 w-10 h-2',
  },
});
</script>
