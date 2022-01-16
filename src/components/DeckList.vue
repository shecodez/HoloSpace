<template>
  <ul class="flex md:flex-col">
    <li v-for="deck in decks" :key="deck.id" class="py-1 my-auto md:my-0 md:mx-auto">
      <div :data-tip="deck.name" class="tooltip tooltip-top md:tooltip-right z-10">
        <router-link :to="`/d/${deck.id}/${deck.boot_disk_id}`">
          <div class="avatar" :class="deck.image_url ? '' : 'placeholder'">
            <div
              class="deck bg-primary text-neutral-content w-12 h-12"
              :class="isActive(deck.id) ? 'active rounded-md' : 'rounded-full'"
            >
              <span v-if="!deck.image_url" class="text-xl">{{ deck.name.charAt(0) }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';
import { useRoute } from 'vue-router';
//import { Icon } from '@iconify/vue';

import { IDeck } from '../data/interfaces';

const props = defineProps({
  decks: {
    type: Array as PropType<IDeck[]>,
    default: [],
  },
});

const { decks } = toRefs(props);

const route = useRoute();

const isActive = (deckId: string) => {
  return deckId === route.params.deck_id;
};
</script>

<style scoped>
.deck.active:hover {
  animation: none;
}
.deck:hover {
  border-radius: 0.375rem; /*10%*/
  animation: borders 0.5s ease-in-out;
}
@keyframes borders {
  0% {
    border-radius: 50%;
  }
  33% {
    border-radius: 15%;
  }
  66% {
    border-radius: 25%;
  }
  100% {
    border-radius: 0.375rem; /*10%*/
  }
}
</style>
