<template>
  <ul class="flex md:flex-col gap-2 p-1">
    <li v-for="deck in decks" :key="deck.id" class="my-auto md:my-0 md:mx-auto">
      <div class="relative" :title="deck.name">
        <router-link :to="`/d/${deck.id}/TEXT/${deck.boot_disk_id}`">
          <div class="avatar shadow" :class="deck.image_url ? '' : 'placeholder'">
            <div
              class="deck bg-primary w-12 h-12"
              :class="[
                isActive(deck.id) ? 'active rounded-md' : 'rounded-full',
                //!isActive(deck.id) && 'w-11 h-11 ring ring-accent ring-offset-base-300 ring-offset-2 m-1',
              ]"
            >
              <img v-if="deck.image_url" :src="deck.image_url" alt="Deck Icon" class="inline-block" />
              <span v-else class="text-xl">{{ deck.name.charAt(0) }}</span>
            </div>
          </div>
        </router-link>

        <!-- <span class="notification absolute right-0 top-0 flex h-4 w-4">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span class="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
        </span> -->
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';
import { useRoute } from 'vue-router';
//import { Icon } from '@iconify/vue';

import { IDeck } from '@/data/interfaces';

const props = defineProps({
  decks: {
    type: Array as PropType<IDeck[]>,
    default: [],
  },
});

// TODO: if the boot diskspace becomes changeable
// on mounted get boot diskspace type from the db

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
