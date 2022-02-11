<template>
  <button @click="openModal" class="btn btn-ghost btn-square btn-sm" title="Send H010Comm">
    <Icon icon="mdi:arrow-up-bold-hexagon-outline" width="24" />
    <span class="sr-only">Send H010Comm</span>
  </button>

  <Modal :isOpen="isOpen" @close="closeModal" css="bg-base-100 w-11/12 md:max-w-sm mx-auto rounded shadow-lg">
    <div class="h010gram-modal p-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-secondary font-bold">Send <span class="font-brand uppercase">H010Comm</span></h3>
        <button @click="closeModal" class="btn btn-sm btn-square btn-error btn-outline">
          <Icon icon="mdi:close" width="20" />
        </button>
      </div>

      <h2 class="text-4xl font-bold text-center">coming soon!</h2>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

import Modal from '@/components/DockUI/Modal.vue';

const isOpen = ref(false);
function openModal() {
  isOpen.value = true;
}
function closeModal() {
  isOpen.value = false;
}
</script>
