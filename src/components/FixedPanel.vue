<template>
  <div class="bg-gray-100 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 text-gray-800 dark:text-gray-200">
    <div class="flex flex-row md:flex-col w-screen md:w-20 h-16 md:h-full">
      <div class="my-auto md:my-0 md:mx-auto">
        <button class="btn btn-circle bg-primary m-2">
          <Icon icon="mdi:account-circle" width="26" />
        </button>
      </div>
      <div class="my-divider border-l md:border-t md:border-l-0 my-auto md:my-0 md:mx-auto md:pt-2">
        <h5 class="uppercase text-xs font-medium p-2">Decks</h5>
      </div>

      <div class="decks overflow-x-auto md:overflow-y-auto overflow-y-hidden md:overflow-x-hidden">
        <DeckList :decks="decks" />
      </div>

      <div class="sticky right-0 md:bottom-0 p-2 my-auto md:my-0 md:mx-auto">
        <button class="btn btn-circle dark:btn-outline border-dashed border-4">
          <Icon icon="mdi:plus" width="26" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import DeckList from '@/components/DeckList.vue';
import { IDeck } from '@/data/interfaces';

const props = defineProps({
  decks: {
    type: Array as PropType<IDeck[]>,
    default: [],
  },
});

const { decks } = toRefs(props);
</script>

<style scoped>
@media (min-width: 768px) {
  .decks {
    overflow-y: overlay;
  }
}
@media (max-width: 767px) {
  .decks {
    overflow-x: overlay;
  }
}
</style>
