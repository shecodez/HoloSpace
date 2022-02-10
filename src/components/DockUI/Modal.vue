<template>
  <teleport to="body" v-if="isOpen">
    <div
      class="d-modal fixed z-20 w-full h-full top-0 left-0"
      :class="!fullscreen && 'flex items-center justify-center'"
    >
      <div ref="overlay" class="d-overlay fixed w-full h-full bg-gray-900 bg-opacity-80 overflow-y-auto" />

      <div ref="modal" class="relative" :class="[fullscreen && 'h-full', css]">
        <slot></slot>
      </div>

      <button class="btn btn-square btn-ghost absolute text-white" @click="$emit('close')" :class="closeBtnCss">
        <Icon icon="mdi:close" width="24" />
        <span class="text-sm capitalize">(Esc)</span>
      </button>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue';
import { onClickOutside, onKeyDown } from '@vueuse/core';
import { Icon } from '@iconify/vue';

const modal = ref();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  css: String,
  closeBtnCss: {
    type: String,
    default: 'top-7 right-7',
  },
});

const { isOpen, fullscreen, css, closeBtnCss } = toRefs(props);

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
  if (props.fullscreen) return;
  if (isOpen.value === true) {
    emit('close');
  }
});
</script>
