<template>
  <div class="bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-80">
    <div class="ribbon-tail relative banner flex items-center">
      <slot></slot>
      <button v-if="dismissible" class="absolute right-0 btn btn-sm btn-circle btn-ghost">
        <Icon icon="mdi:close-circle" width="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  dismissible: {
    type: Boolean,
    default: false,
  },
});

const { dismissible } = toRefs(props);
</script>

<style scoped>
.ribbon-tail:before {
  width: 4rem; /* TODO: how to make this dynamic? */
  background: white;
}
.dark .ribbon-tail:before {
  width: 4rem; /* TODO: how to make this dynamic? */
  background: black;
}
</style>
