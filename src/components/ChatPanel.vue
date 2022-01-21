<template>
  <Panel css="w-0 bg-base-100 bg-opacity-80">
    <template #header>
      <DiskspaceToolbar :diskspace="diskspace" :collapsed="collapsed" @toggleCollapsed="emitToggleCollapsed" />
    </template>

    <div class="overflow-y-auto overflow-x-hidden">
      <div v-if="!messages.length" class="flex justify-center p-8">
        <h2 class="text-5xl font-bold">No messages yet. Say something.</h2>
      </div>
      <MessageList v-else :messages="messages" />
    </div>

    <template #footer>
      <div class="relative mb-4 mx-6 md:mx-24">
        <TextCommForm
          v-if="state.commType === CommType.TEXT"
          @switchToVoiceComms="switchComms(CommType.VOICE)"
          @switchToH010Comms="switchComms(CommType.H010)"
        />
        <VoiceCommForm
          v-if="state.commType === CommType.VOICE"
          @switchToTextComms="switchComms(CommType.TEXT)"
          @switchToH010Comms="switchComms(CommType.H010)"
        />
        <H010CommModal :isOpen="state.commType === CommType.H010" @close="switchComms(CommType.TEXT)" />
      </div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { defineProps, PropType, reactive, toRefs } from 'vue';

import Panel from '@/components/Panel.vue';
import MessageList from '@/components/MessageList.vue';
import DiskspaceToolbar from '@/components/DiskspaceToolbar.vue';
import VoiceCommForm from './comms/VoiceCommForm.vue';
import TextCommForm from './comms/TextCommForm.vue';
import { IDiskspace, ITextMessage } from '@/data/interfaces';
import { CommType } from '@/data/mock';
import H010CommModal from './comms/H010CommModal.vue';

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
