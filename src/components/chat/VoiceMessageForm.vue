<template>
  <div class="mr-2">
    <div class="flex items-center bg-base-100 rounded-full px-2 h-16 border-2 border-primary">
      <H010gramModal />

      <div class="ml-2">
        <Icon v-if="state.isRecording" icon="bx:bxs-album" width="24" class="animate-spin text-primary" />
        <button v-if="!state.isRecording && !!state.voice" class="btn btn-ghost btn-square btn-sm" title="Play">
          <Icon icon="mdi:play" width="24" />
        </button>
      </div>
      <h4 class="flex-1 text-xl mx-2">0.00</h4>
      <ConfirmDeleteButton v-if="!!state.voice" @delete="reset" css="h-full" btnCss="btn btn-sm btn-error btn-square">
        <Icon icon="mdi:trash-can" width="20" />
      </ConfirmDeleteButton>

      <button @click="$emit('switchToTextComm')" class="btn btn-sm btn-ghost btn-square" title="Send TextComm">
        <Icon icon="mdi:format-textbox" width="20" />
      </button>
      <button
        @click="toggleRec"
        class="btn btn-ghost btn-square btn-sm"
        :title="state.isRecording ? 'Stop' : 'Record Voice'"
      >
        <Icon v-if="state.isRecording" icon="mdi:stop" width="20" />
        <Icon v-else icon="mdi:microphone" width="20" />
      </button>

      <div class="my-divider border-l ml-1">
        <button type="submit" class="btn btn-outline btn-primary btn-square btn-sm border-none ml-1" title="Send Comm">
          <Icon icon="fa:paper-plane" width="24" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, reactive } from 'vue';
import { Icon } from '@iconify/vue';

import ConfirmDeleteButton from '@/components/ConfirmDeleteButton.vue';
import H010gramModal from '@/components/chat/H010gramModal.vue';

const state = reactive({
  isRecording: true,
  voice: undefined,
});

onUnmounted(() => {
  state.isRecording = false;
});

function submitMessage() {
  console.log('Submit Voice Message');
}

function reset() {
  state.voice = undefined;
}

function toggleRec() {
  state.isRecording = !state.isRecording;
}
</script>
