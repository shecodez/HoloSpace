<template>
  <div class="navbar bg-base-200">
    <div class="flex-1 px-2 mx-2 overflow-hidden">
      <span class="text-lg font-bold truncate">{{ deck.name }}</span>
    </div>
    <div class="flex-none">
      <Popper placement="bottom">
        <template v-slot:activator>
          <button class="btn btn-square btn-ghost">
            <Icon icon="mdi:chevron-down" width="24" />
          </button>
        </template>
        <DeckMenu :deck="deck" @openDeckSettings="openModal" />
      </Popper>
    </div>
  </div>

  <DeckSettings :isOpen="openSettings" :deck="deck" @close="closeModal" />
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import Popper from '@/components/DockUI/Popper.vue';
import DeckMenu from './DeckMenu.vue';
import DeckSettings from '@/components/DeckSettingsModal.vue';
import { IDeck } from '@/data/interfaces';

const props = defineProps({
  deck: {
    type: Object as PropType<IDeck>,
    default: {},
  },
});

const openSettings = ref(false);

function openModal() {
  openSettings.value = true;
}

function closeModal() {
  openSettings.value = false;
}

const { deck } = toRefs(props);
</script>
