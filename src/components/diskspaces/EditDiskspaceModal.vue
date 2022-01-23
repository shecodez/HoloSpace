<template>
  <Modal :isOpen="isOpen" @close="$emit('close')" css="bg-base-100 w-11/12 md:max-w-lg mx-auto rounded shadow-lg">
    <div class="diskspace-modal p-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-secondary font-bold">
          Edit <span class="font-brand uppercase">{{ diskspace.type }}space</span>
        </h3>
        <button @click="$emit('close')" class="btn btn-sm btn-square btn-error btn-outline">
          <Icon icon="mdi:close" width="20" />
        </button>
      </div>

      <DiskspaceForm :type="diskspace.type" :diskspace="diskspace" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import Modal from '@/components/DockUI/Modal.vue';
import DiskspaceForm from '@/components/diskspaces/DiskspaceForm.vue';
import { IDiskspace } from '@/data/interfaces';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  diskspace: {
    type: Object as PropType<IDiskspace>,
    default: {},
  },
});

const { isOpen, diskspace } = toRefs(props);
</script>

<style scoped>
h2 {
  @apply text-xl uppercase font-bold;
}
</style>
