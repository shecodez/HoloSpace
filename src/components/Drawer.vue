<template>
  <div class="drawer flex flex-shrink-0" :class="collapsed ? minW : 'w-60'">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  css: String,
  collapsed: Boolean,
  minW: {
    type: String,
    default: 'hidden',
  },
});

const { collapsed } = toRefs(props);
</script>
