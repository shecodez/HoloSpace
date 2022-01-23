<template>
  <ul class="t-border-menu menu w-52 py-3 shadow-lg">
    <li class="menu-title">
      <span>Deck Menu</span>
    </li>
    <li v-for="option in deckOptions" :key="option.id" class="hover-bordered">
      <a @click="option.action">
        {{ option.name }}
      </a>
    </li>

    <li class="my-divider border-t menu-title border-error mt-3">
      <span><h5 class="text-error">Danzer Zone</h5></span>
    </li>
    <li v-for="option in dangerOptions" :key="option.id" class="border-l-4 border-transparent hover:border-error">
      <a @click="option.action">
        {{ option.name }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs } from 'vue';
//import { Icon } from '@iconify/vue';

import { IDeck } from '@/data/interfaces';

const props = defineProps({
  deck: {
    type: Object as PropType<IDeck>,
    default: {},
  },
});

const { deck } = toRefs(props);

const emit = defineEmits<{
  (e: 'openDeckSettings', goToTab?: string): void;
}>();

function openSettings(goToTab = 'Overview') {
  emit('openDeckSettings', goToTab);
}

const deckOptions = ref([
  { id: '1', icon: 'mdi:key', name: 'Send H010key', action: () => openSettings('H010Key') },
  //{ id: '6', icon: 'mdi:key', name: 'Contact Captain' },
  { id: '2', icon: 'mdi:edit', name: 'Edit the deck', action: () => openSettings() },
  { id: '3', icon: 'mdi:account', name: 'Edit deck crew', action: () => openSettings('Roles') },
]);

const dangerOptions = ref([
  { id: '4', icon: 'mdi:logout', name: 'Leave deck', action: () => openSettings('DangerZone') }, // if !captain
  { id: '5', icon: 'mdi:trash', name: 'Delete deck', action: () => openSettings('DangerZone') }, // if user can_delete
]);
</script>
