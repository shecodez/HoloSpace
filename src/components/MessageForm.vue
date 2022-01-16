<template>
  <div class="relative mb-4 mx-6 md:mx-24">
    <MarkdownToolbar v-if="state.showMarkdownToolbar" />
    <form @submit.prevent="submitMessage" class="mr-2 text-gray-800 dark:text-gray-200">
      <div class="flex relative items-center justify-between">
        <div class="absolute left-2 grid">
          <button class="btn btn-ghost btn-square btn-sm">
            <Icon icon="mdi:arrow-up-bold-hexagon-outline" width="24" />
            <span class="sr-only">Send H010Gram</span>
          </button>
        </div>

        <textarea v-if="state.isMultiline" v-model="state.message" placeholder="Enter message" :rows="3" />
        <input v-else type="text" v-model="state.message" placeholder="Enter message" />
        <button v-if="state.message.length" class="absolute right-32" @click="reset">
          <Icon icon="mdi:close" width="24" />
        </button>

        <div class="absolute right-2 flex items-center">
          <button class="btn btn-ghost btn-square btn-sm" @click="toggleMarkdownToolbar">
            <Icon icon="mdi:format-textbox" width="20" />
          </button>
          <button class="btn btn-ghost btn-square btn-sm">
            <Icon icon="clarity:microphone-solid" width="20" />
          </button>

          <div class="my-divider border-l ml-1">
            <button type="submit" class="btn btn-outline btn-primary btn-square btn-sm border-none ml-1">
              <Icon icon="fa:paper-plane" width="24" />
            </button>
          </div>
        </div>
      </div>
    </form>
    <!-- <span class="absolute bottom-0 text-xs">This is for typing...</span> -->
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Icon } from '@iconify/vue';

import MarkdownToolbar from './MarkdownToolbar.vue';

const state = reactive({
  message: '',
  isMultiline: false,
  showMarkdownToolbar: false,
});

function toggleMarkdownToolbar() {
  state.showMarkdownToolbar = !state.showMarkdownToolbar;
  state.isMultiline = !state.isMultiline;
}

function reset() {
  state.message = '';
}

function submitMessage() {
  console.log('submit message', state.message);
  reset();
}
</script>

<style scoped>
input,
textarea {
  @apply py-3 pl-12 pr-32 w-full bg-gray-400 dark:bg-gray-600 shadow-inner border-none;
}
</style>
