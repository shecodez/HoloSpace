<template>
  <Modal :isOpen="isOpen" @close="$emit('close')" css="bg-base-100 w-11/12 md:max-w-lg mx-auto rounded shadow-lg">
    <div class="diskspace-modal p-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-secondary font-bold">Add New <span class="font-brand uppercase">Diskspace</span></h3>
        <button @click="$emit('close')" class="btn btn-sm btn-square btn-error btn-outline">
          <Icon icon="mdi:close" width="20" />
        </button>
      </div>

      <DiskspaceForm :type="type" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import Modal from '@/components/DockUI/Modal.vue';
import DiskspaceForm from './DiskspaceForm.vue';
//import { IDiskspace } from '@/data/interfaces';
import { DiskspaceType } from '@/data/mock';

const props = defineProps({
  type: {
    type: String as PropType<DiskspaceType>,
    default: DiskspaceType.TEXT,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const { type, isOpen } = toRefs(props);
</script>

<style scoped>
h2 {
  @apply text-xl uppercase font-bold;
}
</style>
