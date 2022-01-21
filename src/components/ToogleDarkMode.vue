<template>
  <button @click="toggleDark()" :class="css">
    <Icon v-if="isDark" icon="mdi:brightness-5" width="24" />
    <Icon v-else icon="mdi:weather-night" width="24" />
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
