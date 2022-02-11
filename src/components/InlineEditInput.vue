<template>
  <div class="flex items-center gap-2" :class="css">
    <input
      ref="inputEl"
      v-focus
      v-if="state.editing"
      type="text"
      v-model="input"
      @keydown.enter="$emit('edit', input)"
    />
    <slot v-else>
      <span :class="textCss">{{ text }}</span>
    </slot>

    <button @click="toggleEdit" :title="title" class="btn btn-sm btn-square btn-ghost">
      <Icon :icon="state.editing ? 'mdi:close' : editIcon" />
    </button>
    <button @click="$emit('edit', input)" title="Save" class="btn btn-sm btn-square btn-ghost">
      <Icon icon="mdi:save" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useToggle } from '@vueuse/core';
import { reactive, ref, watch } from 'vue';

const props = defineProps({
  text: String,
  title: String,
  editIcon: {
    type: String,
    default: 'mdi:edit',
  },
  css: {
    type: String,
    default: '',
  },
  textCss: {
    type: String,
    default: '',
  },
});

const state = reactive({
  editing: false,
});

const inputEl = ref();
watch(
  () => inputEl.value,
  (input) => {
    if (input) inputEl.value.focus();
  },
);
const input = ref(props.text);

const toggleEdit = () => useToggle(state.editing);
</script>
