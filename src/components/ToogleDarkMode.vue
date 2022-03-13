<template>
  <button
    @click="toggleDark()"
    class="swap swap-rotate"
    :class="[css, isDark && 'swap-active']"
    :title="isDark ? 'Theme: light' : 'Theme: dark'"
  >
    <Icon icon="ic:outline-wb-sunny" width="24" class="swap-on" />
    <Icon icon="mdi:weather-night" width="24" class="swap-off" />
    <span class="sr-only">Toggle Theme</span>
  </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { Icon } from '@iconify/vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
});
const toggleDark = useToggle(isDark);

const props = defineProps({
  css: {
    type: String,
    default: 'btn btn-circle btn-ghost',
  },
});

const { css } = toRefs(props);
</script>
