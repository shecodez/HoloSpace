<template>
  <Panel css="w-0 bg-base-100 bg-opacity-80">
    <template #header>
      <DiskspaceToolbar :diskspace="diskspace" :collapsed="collapsed" @toggleCollapsed="emitToggleCollapsed" />
    </template>

    <div class="p-4 border">TODO: tabs for VoIP * Comms * Files</div>
    <div class="overflow-y-auto overflow-x-hidden flex flex-col-reverse">
      <div v-if="!messages.length" class="flex justify-center p-8">
        <h2 class="text-5xl font-bold">No messages yet. Say something.</h2>
      </div>
      <MessageList v-else :messages="messages" />
    </div>

    <template #footer>
      <div class="relative mb-4 mx-6 md:mx-24">
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
