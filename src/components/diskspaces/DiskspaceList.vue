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
      <ul class="diskspaces">
        <template v-for="space in diskspaces" :key="space.id">
          <DiskspaceListItem :type="type" :diskspace="space" @edit="openModal(space)" />
        </template>
      </ul>
    </div>
  </div>
  <div class="my-divider border-t"></div>

  <AddDiskspaceModal :isOpen="isAddDiskspace" :type="type" @close="closeModal" />
  <EditDiskspaceModal :isOpen="!!editDiskspace" :diskspace="editDiskspace" @close="closeModal" />
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import AddDiskspaceModal from '@/components/diskspaces/AddDiskspaceModal.vue';
import EditDiskspaceModal from '@/components/diskspaces/EditDiskspaceModal.vue';
import { IDiskspace } from '@/data/interfaces';
import { SpaceType, teams } from '@/data/mock';
import DiskspaceListItem from './DiskspaceListItem.vue';

const props = defineProps({
  type: {
    type: String as PropType<SpaceType>,
    default: SpaceType.TEXT,
  },
  diskspaces: {
    type: Array as PropType<IDiskspace[]>,
    default: [],
  },
  open: {
    type: Boolean,
    default: false,
  },
});

const { type, diskspaces, open } = toRefs(props);

const isAddDiskspace = ref(false);
const editDiskspace = ref();

function openModal(diskspace?: IDiskspace) {
  diskspace ? (editDiskspace.value = diskspace) : (isAddDiskspace.value = true);
}

function closeModal() {
  isAddDiskspace.value = false;
  editDiskspace.value = undefined;
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
