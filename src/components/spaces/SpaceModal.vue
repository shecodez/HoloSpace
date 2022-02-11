<template>
  <Modal :isOpen="isOpen" @close="$emit('close')" css="bg-base-100 w-11/12 md:max-w-lg mx-auto rounded shadow-lg">
    <div class="space-modal p-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-secondary font-bold">
          {{ space.id ? 'Edit' : 'Add' }} <span class="font-brand uppercase">{{ space.type }}space</span>
        </h3>
        <button @click="$emit('close')" class="btn btn-sm btn-square btn-error btn-outline">
          <Icon icon="mdi:close" width="20" />
        </button>
      </div>

      <SpaceForm :type="space.type || type" :isTeam="isTeam" :space="space" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Icon } from '@iconify/vue';

import Modal from '@/components/DockUI/Modal.vue';
import SpaceForm from '@/components/spaces/SpaceForm.vue';
import { ISpace } from '@/data/interfaces';
import { SpaceType } from '@/data/mock';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<SpaceType>,
    default: SpaceType.TEXT,
  },
  isTeam: {
    type: Boolean,
    default: false,
  },
  space: {
    type: Object as PropType<ISpace>,
    default: {},
  },
});
</script>
