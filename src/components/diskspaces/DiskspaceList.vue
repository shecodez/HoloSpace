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
        <li
          v-for="space in diskspaces"
          :key="space.id"
          :title="space.name"
          class="diskspace relative px-3 py-2 border-l-4 hover:border-primary hover:bg-gradient-to-r from-gray-500"
          :class="isActive(space.id) ? 'active' : 'border-transparent'"
        >
          <div
            class="ribbon-tail flex justify-between mx-2 overflow-hidden"
            :class="isActive(space.id) && 'before:pr-5 before:bg-base-100 before:bg-opacity-50'"
          >
            <router-link :to="`/d/${space.deck_id}/${space.id}`" class="truncate">{{ space.name }}</router-link>
            <div class="actions">
              <button @click="openModal(space)" class="btn btn-xs btn-square btn-ghost" title="Edit Diskspace">
                <Icon icon="mdi:dots-horizontal" width="20" />
              </button>
            </div>
          </div>
          <!-- <span class="notification absolute -left-1 top-0 flex h-full w-1">
            <span class="animate-ping absolute inline-flex h-full w-full bg-accent opacity-75"></span>
            <span class="relative inline-flex rounded-full h-full w-1 bg-accent"></span>
          </span> -->
        </li>
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
import { useRoute } from 'vue-router';

import AddDiskspaceModal from '@/components/diskspaces/AddDiskspaceModal.vue';
import EditDiskspaceModal from '@/components/diskspaces/EditDiskspaceModal.vue';
import { IDiskspace } from '@/data/interfaces';
import { DiskspaceType } from '@/data/mock';

const props = defineProps({
  type: {
    type: String as PropType<DiskspaceType>,
    default: DiskspaceType.TEXT,
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

const route = useRoute();

const isActive = (diskspaceId: string) => {
  return diskspaceId === route.params.diskspace_id;
};
</script>

<style scoped>
.diskspace.active {
  @apply font-medium border-primary bg-gradient-to-r;
}

.diskspace .actions {
  visibility: hidden;
}
.diskspace.active .actions {
  visibility: visible;
}
.diskspace:hover .actions {
  visibility: visible;
}

.collapse-content,
.collapse-title {
  background-color: transparent !important;
}
.collapse-arrow .collapse-title:after {
  right: 1.9rem;
}
</style>
