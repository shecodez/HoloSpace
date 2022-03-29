<template>
  <form>
    <div class="form-control required mb-2">
      <label class="label">Title</label>
      <div class="relative">
        <input v-focus v-model="form.title" type="text" class="w-full pl-16 input input-accent input-bordered" />
        <span class="absolute top-0 left-0 rounded-r-none btn btn-accent">
          <Icon icon="mdi:calendar" width="20" />
        </span>
      </div>
    </div>

    <div class="form-control mb-2">
      <label class="label">URL</label>
      <div class="relative">
        <input v-model="form.url" type="text" class="w-full pl-16 input input-accent input-bordered" />
        <span class="absolute top-0 left-0 rounded-r-none btn btn-accent">
          <Icon icon="mdi:link-variant" width="20" />
        </span>
      </div>
    </div>

    <div class="form-control mb-2">
      <label class="label">Description</label>
      <div class="relative flex">
        <textarea v-model="form.description" class="textarea h-24 textarea-bordered textarea-accent pl-16 w-full" />
        <span class="absolute top-0 left-0 h-full rounded-r-none btn btn-accent">
          <Icon icon="ri:sticky-note-fill" width="20" />
        </span>
      </div>
    </div>

    <div class="flex gap-4 mb-2">
      <div class="form-control required w-full md:w-1/2 overflow-hidden">
        <label class="label">Start Date</label>
        <div class="relative">
          <input v-model="form.start_date" type="date" class="w-full pl-16 input input-accent input-bordered" />
          <span class="absolute top-0 left-0 rounded-r-none btn btn-accent">
            <Icon icon="mdi:calendar-clock" width="20" />
          </span>
        </div>
      </div>
      <div class="form-control mb-2 w-full md:w-1/2 overflow-hidden">
        <label class="label">End Date</label>
        <div class="relative">
          <input v-model="form.end_date" type="date" class="w-full pl-16 input input-accent input-bordered" />
          <span class="absolute top-0 left-0 rounded-r-none btn btn-accent">
            <Icon icon="mdi:calendar-clock" width="20" />
          </span>
        </div>
      </div>
    </div>

    <div class="text-right mt-6">
      <div v-if="!!event.id" class="flex gap-2 justify-end">
        <button class="btn btn-accent">Edit Event</button>
        <ConfirmDeleteButton @delete="deleteEvent" />
      </div>
      <button v-else class="btn btn-accent">Add Event</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, PropType, reactive } from 'vue';
import { Icon } from '@iconify/vue';

import { IEvent } from '@/data/interfaces';
import ConfirmDeleteButton from '@/components/ConfirmDeleteButton.vue';

const props = defineProps({
  event: {
    type: Object as PropType<IEvent>,
    default: {},
  },
});

//const { type } = toRefs(props);

const form = reactive({
  title: '',
  url: '',
  description: '',
  start_date: new Date(),
  end_date: new Date(),
  classes: '',
});

onMounted(() => {
  if (!!props.event.title) {
    form.title = props.event.title;
    form.description = props.event.description as string;
    form.url = props.event.url as string;
    form.start_date = props.event.start_date;
    form.end_date = props.event.end_date as Date;
    form.classes = props.event.classes as string;
  }
});

function deleteEvent() {
  console.log('Delete', props.event);
}

function submitEvent() {
  console.log('Toast Success: You added a calendar event!', form);
}

//const state = {};
</script>

<style scoped></style>
