<template>
  <form>
    <slot name="header"></slot>

    <div class="form-control required mb-2">
      <label class="label">Name</label>
      <div class="relative">
        <input v-focus v-model="form.name" type="text" class="w-full pl-16 input input-secondary input-bordered" />
        <span class="absolute top-0 left-0 rounded-r-none btn btn-secondary">
          <Icon icon="carbon:vmdk-disk" width="20" />
        </span>
      </div>
    </div>

    <div class="form-control mb-2">
      <label class="label">Topic</label>
      <div class="relative flex">
        <textarea v-model="form.topic" class="textarea h-24 textarea-bordered textarea-secondary pl-16 w-full" />
        <span class="absolute top-0 left-0 h-full rounded-r-none btn btn-secondary">
          <Icon icon="mdi:note-text" width="20" />
        </span>
      </div>
    </div>

    <div class="form-control required mb-2 w-1/2">
      <label class="label">Type</label>
      <div class="relative">
        <select v-model="form.type" class="select select-bordered select-secondary pl-16 w-full">
          <!-- <option selected disabled>Select Diskspace Type</option> -->
          <option v-for="diskspaceType in state.diskspaceTypes" :value="diskspaceType.id">
            {{ diskspaceType.name }}
          </option>
        </select>
        <span class="absolute top-0 left-0 rounded-r-none btn btn-secondary">
          <Icon :icon="getDiskspaceTypeIcon" width="20" />
        </span>
      </div>
    </div>

    <slot name="footer"></slot>

    <div class="text-right mt-6">
      <div v-if="!!diskspace.id" class="flex gap-2 justify-end">
        <button class="btn btn-secondary">Edit Diskspace</button>
        <ConfirmDeleteButton @delete="deleteDiskspace" />
      </div>
      <button v-else class="btn btn-secondary">Add Diskspace</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, reactive } from 'vue';
import { Icon } from '@iconify/vue';

import { DiskspaceType } from '@/data/mock';
import { IDiskspace } from '@/data/interfaces';
import ConfirmDeleteButton from '../ConfirmDeleteButton.vue';

const props = defineProps({
  type: {
    type: String as PropType<DiskspaceType>,
    default: DiskspaceType.TEXT,
  },
  diskspace: {
    type: Object as PropType<IDiskspace>,
    default: {},
  },
});

//const { type } = toRefs(props);

const form = reactive({
  name: '',
  topic: '',
  type: props.type,
});

onMounted(() => {
  if (!!props.diskspace.name) {
    form.name = props.diskspace.name;
    form.topic = props.diskspace.topic || '';
    form.type = props.diskspace.type;
  }
});

function deleteDiskspace() {
  console.log('Delete', props.diskspace);
}

const state = {
  diskspaceTypes: [
    { id: DiskspaceType.TEXT, name: 'Text', icon: 'ph:chats' },
    { id: DiskspaceType.VOIP, name: 'VoIP', icon: 'mdi:microphone' },
    { id: DiskspaceType.H010, name: 'H010', icon: 'heroicons-solid:cube-transparent' },
  ],
  uploadError: null,
};

const getDiskspaceTypeIcon = computed(
  () => state.diskspaceTypes[state.diskspaceTypes.findIndex((x) => x.id === form.type)].icon,
);
</script>

<style scoped>
.form-control:focus-within label {
  @apply text-secondary;
}
</style>
