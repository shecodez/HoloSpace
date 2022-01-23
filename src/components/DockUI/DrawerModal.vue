<template>
  <teleport to="body">
    <div v-if="isOpen" class="d-drawer fixed z-20 w-full h-full top-0 left-0 flex" :class="css">
      <div ref="overlay" class="d-overlay fixed w-full h-full bg-gray-900 bg-opacity-80 overflow-y-auto" />

      <div ref="modal" class="relative">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue';
import { onClickOutside, onKeyDown } from '@vueuse/core';
//import { Icon } from '@iconify/vue';

const modal = ref();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  css: {
    type: String,
    default: 'justify-start',
  },
});

const { isOpen, css } = toRefs(props);

const emit = defineEmits<{
  (e: 'close'): void;
}>();

onKeyDown(
  'Escape',
  () => {
    if (isOpen.value === true) {
      emit('close');
    }
  },
  { target: document },
);

onClickOutside(modal, () => {
  if (isOpen.value === true) {
    emit('close');
  }
});
</script>
