<template>
  <div class="event-card bg-base-200 w-80 max-w-xs rounded shadow-md">
    <div class="bg-accent flex items-center gap-2 p-4 shadow">
      <button class="btn btn-sm btn-square btn-ghost">
        <Icon icon="mdi:calendar-edit" width="20" />
      </button>
      <h2 class="flex-1 text-sm">{{ event.title }}</h2>
    </div>

    <p class="px-4 py-2">
      <span>{{ event.url }}</span>
      <EventForm v-if="showForm" :event="event" />
    </p>

    <div class="flex justify-end px-4 pb-4">
      <ConfirmDeleteButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import { IEvent } from '@/data/interfaces';
import ConfirmDeleteButton from '@/components/ConfirmDeleteButton.vue';
import EventForm from './EventForm.vue';

const props = defineProps({
  event: {
    type: Object as PropType<IEvent>,
    default: {},
  },
});

const showForm = ref(false);

const { event } = toRefs(props);
</script>
