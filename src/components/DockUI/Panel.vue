<template>
  <div class="panel flex-1 flex flex-col h-full w-full" :class="css">
    <slot name="header"></slot>
    <slot></slot>

    <div class="mt-auto">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  css: String,
});

const { css } = toRefs(props);
</script>

<style>
.w-0 {
  width: 0 !important;
}
</style>
