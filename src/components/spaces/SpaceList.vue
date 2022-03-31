<template>
  <div class="collapse collapse-arrow" :class="open ? 'collapse-open' : ''">
    <input type="checkbox" />
    <div class="collapse-title flex items-center gap-2">
      <button @click="openModal()" class="relative z-10 btn btn-square btn-xs" :title="`Add New ${type}SPACE`">
        <Icon icon="mdi:plus" width="20" />
      </button>
      <span class="font-bold font-brand text-sm">{{ type }}SPACE</span>
    </div>

    <div class="collapse-content p-0">
      <ul class="spaces">
        <template v-for="space in spaces" :key="space.id">
          <SpaceListItem :type="type" :isTeam="isTeam" :space="space" @edit="openModal(space)" />
        </template>
      </ul>
    </div>
  </div>
  <div class="divider m-0"></div>

  <SpaceModal :isOpen="isOpen" :type="type" :isTeam="isTeam" :space="editSpace" @close="closeModal" />
</template>

<script setup lang="ts">
import { defineProps, PropType, ref } from 'vue';
import { Icon } from '@iconify/vue';

import SpaceModal from '@/components/spaces/SpaceModal.vue';
import SpaceListItem from '@/components/spaces/SpaceListItem.vue';
import { ISpace } from '@/data/interfaces';
import { SpaceType } from '@/data/mock';

const props = defineProps({
  type: String as PropType<SpaceType>,
  isTeam: Boolean,
  spaces: {
    type: Array as PropType<ISpace[]>,
    default: [],
  },
  open: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref(false);
const editSpace = ref();
function openModal(space?: ISpace) {
  if (space) editSpace.value = space;
  isOpen.value = true;
}
function closeModal() {
  isOpen.value = false;
  editSpace.value = undefined;
}
</script>

<style scoped>
.collapse-content,
.collapse-title {
  background-color: transparent !important;
}
.collapse-arrow .collapse-title:after {
  right: 1.9rem;
}
</style>
