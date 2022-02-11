<template>
  <button @click="openModal" class="btn btn-sm btn-primary w-full flex items-center gap-2">
    <Icon icon="mdi:plus" width="24" />
    Add Event
  </button>

  <Modal :isOpen="openEvent" @close="closeModal" css="bg-base-100 w-11/12 md:max-w-lg mx-auto rounded shadow-lg">
    <div class="event-modal p-6">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-accent font-bold">Add New Event</h3>
        <button @click="closeModal" class="btn btn-sm btn-square btn-error btn-outline">
          <Icon icon="mdi:close" width="20" />
        </button>
      </div>

      <EventForm />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

import Modal from '@/components/DockUI/Modal.vue';
import EventForm from '@/components/calendar/EventForm.vue';

const openEvent = ref(false);
function openModal() {
  openEvent.value = true;
}
function closeModal() {
  openEvent.value = false;
}
</script>

<style scoped>
h2 {
  @apply text-xl uppercase font-bold;
}
</style>
