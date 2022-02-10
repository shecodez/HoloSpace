<template>
  <div class="bg-base-300 bg-opacity-80">
    <div class="flex flex-row md:flex-col w-screen md:w-20 h-16 md:h-full">
      <div class="my-auto md:my-0 md:mx-auto">
        <slot name="linkTo">
          <router-link to="/@me" class="btn btn-circle btn-primary m-2">
            <Icon icon="mdi:account-circle" width="26" />
          </router-link>
        </slot>
      </div>
      <div class="my-divider border-l md:border-t md:border-l-0 my-auto md:my-0 md:mx-auto md:pt-2">
        <h5 class="uppercase text-xs font-medium p-2">Decks</h5>
      </div>

      <div class="decks flex md:block overflow-x-auto md:overflow-y-auto overflow-y-hidden md:overflow-x-hidden">
        <DeckList :decks="decks" />
      </div>

      <div class="sticky right-0 md:bottom-0 p-2 my-auto md:my-0 md:mx-auto">
        <button @click="openModal" title="Add New Deck" class="btn btn-circle btn-outline border-dashed border-4">
          <Icon icon="mdi:plus" width="26" />
        </button>
      </div>
    </div>
  </div>

  <AddOrJoinDeckModal :isOpen="openAddOrJoinDeck" @close="closeModal" />
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import DeckList from '@/components/decks/DeckList.vue';
import AddOrJoinDeckModal from '@/components/decks/AddOrJoinDeckModal.vue';
import { IDeck } from '@/data/interfaces';

const props = defineProps({
  decks: {
    type: Array as PropType<IDeck[]>,
    default: [],
  },
});

const openAddOrJoinDeck = ref(false);

function openModal() {
  openAddOrJoinDeck.value = true;
}

function closeModal() {
  openAddOrJoinDeck.value = false;
}

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
    overflow-x: overlay !important;
  }
}
</style>
