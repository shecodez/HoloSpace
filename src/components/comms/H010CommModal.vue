<template>
  <button @click="openModal" class="btn btn-ghost btn-square btn-sm">
    <Icon icon="mdi:arrow-up-bold-hexagon-outline" width="24" />
    <span class="sr-only">Send H010Comm</span>
  </button>

  <Modal :isOpen="openH010Comm" @close="closeModal" css="bg-base-100 w-11/12 md:max-w-sm mx-auto rounded shadow-lg">
    <div class="diskspace-modal p-6">
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

const openH010Comm = ref(false);
function openModal() {
  openH010Comm.value = true;
}
function closeModal() {
  openH010Comm.value = false;
}
</script>

<style scoped>
h2 {
  @apply text-xl uppercase font-bold;
}
</style>
