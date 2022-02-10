<template>
  <Panel css="w-0 bg-base-100 bg-opacity-80">
    <template #header>
      <DiskspaceToolbar :diskspace="diskspace" :collapsed="collapsed" @toggleCollapsed="emitToggleCollapsed" />
    </template>

    <div v-if="!$route.params.diskspace_id" class="flex items-center justify-center">
      <img src="@/assets/branding/brand.png" alt="brand" class="w-11/12 md:w-3/4 lg:w-1/2" />
    </div>
    <div v-else class="overflow-y-auto overflow-x-hidden">
      <div v-if="!messages.length" class="flex justify-center p-8">
        <h2 class="text-5xl font-bold">No messages yet. Say something.</h2>
      </div>
      <MessageList v-else :messages="messages" />
    </div>

    <template #footer>
      <div v-if="$route.params.diskspace_id" class="relative mb-4 mx-6 md:mx-24">
        <TextCommForm v-if="state.commType === CommType.TEXT" @switchToVoiceComms="switchComms(CommType.VOICE)" />
        <VoiceCommForm v-if="state.commType === CommType.VOICE" @switchToTextComms="switchComms(CommType.TEXT)" />
      </div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { defineProps, PropType, reactive, toRefs } from 'vue';

import Panel from '@/components/DockUI/Panel.vue';
import MessageList from '@/components/comms/MessageList.vue';
import DiskspaceToolbar from '@/components/diskspaces/DiskspaceToolbar.vue';
import VoiceCommForm from '@/components/comms/VoiceCommForm.vue';
import TextCommForm from '@/components/comms/TextCommForm.vue';
import { IDiskspace, ITextMessage } from '@/data/interfaces';
import { CommType } from '@/data/mock';

const props = defineProps({
  diskspace: {
    type: Object as PropType<IDiskspace>,
    default: {},
  },
  collapsed: Boolean,
  messages: {
    type: Array as PropType<ITextMessage[]>,
    default: [],
  },
});

const state = reactive({
  commType: CommType.TEXT,
});

function switchComms(type: CommType) {
  switch (type) {
    case CommType.VOICE:
      state.commType = CommType.VOICE;
      break;
    case CommType.H010:
      state.commType = CommType.H010;
      break;
    default:
      state.commType = CommType.TEXT;
      break;
  }
}

const { diskspace, messages, collapsed } = toRefs(props);

const emit = defineEmits<{
  (e: 'toggleCollapsed'): void;
}>();

function emitToggleCollapsed() {
  emit('toggleCollapsed');
}
</script>
