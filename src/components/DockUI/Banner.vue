<template>
  <div class="bg-base-300 bg-opacity-30">
    <div class="banner ribbon-tail relative before:pr-11 before:bg-base-300 flex items-center">
      <slot></slot>
      <button
        v-if="dismissible"
        @click="$emit('close')"
        title="Dismiss"
        class="btn btn-sm btn-circle btn-ghost absolute right-0"
      >
        <Icon icon="mdi:close-outline" width="20" />
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
