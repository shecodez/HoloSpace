<template>
  <router-link to="/logout" :class="css" title="Logout">
    <Icon icon="mdi:logout" width="24" />
  </router-link>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps({
  css: {
    type: String,
    default: 'btn btn-square btn-outline border-none btn-error',
  },
});
</script>
