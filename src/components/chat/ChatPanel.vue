<template>
  <Panel css="w-0 bg-base-100 bg-opacity-80">
    <template #header>
      <SpaceToolbar :space="space" />
    </template>

    <div v-if="space.id" class="tabs mx-12">
      <template v-for="(tab, i) in state.tabs" :key="tab.id">
        <a
          @click="activeTab(i)"
          v-if="tab.show"
          class="tab tab-lg tab-bordered"
          :class="tab.active && 'tab-active'"
          :title="tab.label"
        >
          <Icon :icon="tab.icon" />
        </a>
      </template>
      <div v-if="showTeamTab" class="ml-auto flex items-center">
        <VoipControlToolbar />
        <!-- <button class="btn btn-sm btn-square btn-ghost ml-1">
          <Icon icon="ic:twotone-screen-share" width="20" />
        </button> -->
      </div>
    </div>
    <div class="overflow-y-auto overflow-x-hidden flex flex-col-reverse">
      <VoipUserList v-if="state.tabs[0].active" :team="team" />
      <MessageList v-if="state.tabs[1].active" :messages="messages" />
      <FileList v-if="state.tabs[2].active" :files="[]" />
    </div>

    <template #footer>
      <div class="divider mx-2 md:mx-12" />
      <div v-if="state.tabs[1].active" class="relative mb-4 mx-6 md:mx-24">
        <div v-if="chatStore.isReplyToMessage" class="bg-base-100 rounded my-2 mr-2">
          <Message :message="chatStore.replyToMessage!" isReply @close="chatStore.clearReplyToMessage" />
        </div>
        <TextMsgForm
          v-if="state.msgType === MessageType.TEXT"
          @switchToVoiceComm="setMsgType(MessageType.VOICE)"
          @send="sendMessage"
        />
        <VoiceMsgForm v-if="state.msgType === MessageType.VOICE" @switchToTextComm="setMsgType(MessageType.TEXT)" />
      </div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, PropType, reactive, toRefs, watch } from 'vue';
import { Icon } from '@iconify/vue';

import Panel from '@/components/DockUI/Panel.vue';
import SpaceToolbar from '@/components/spaces/SpaceToolbar.vue';
import VoiceMsgForm from '@/components/chat/VoiceMessageForm.vue';
import TextMsgForm from '@/components/chat/TextMessageForm.vue';
import VoipUserList from '@/components/chat/VoipUserList.vue';
import MessageList from '@/components/chat/MessageList.vue';
import FileList from '@/components/chat/FileList.vue';
import VoipControlToolbar from '@/components/me/VoipControlToolbar.vue';
import Message from '@/components/chat/MessageListItem.vue';
import { ISpace, IMessage, IUser } from '@/data/interfaces';
import { MessageType, SpaceType } from '@/data/mock';
import { useChatStore } from '@/stores/chat';

const props = defineProps({
  space: {
    type: Object as PropType<ISpace>,
    default: {},
  },
  messages: {
    type: Array as PropType<IMessage[]>,
    default: [],
  },
  team: {
    type: Array as PropType<IUser[]>,
    default: [],
  },
});
const { space, messages } = toRefs(props);

const chatStore = useChatStore();

const showTeamTab = computed(() => space.value.type === SpaceType.VOIP);

const state = reactive({
  msgType: MessageType.TEXT,
  tabs: [
    {
      id: 'voip',
      label: 'Team',
      icon: 'mdi:microphone',
      active: false,
      show: showTeamTab,
    },
    { id: 'chat', label: 'Chat', icon: 'ph:chats-fill', active: true, show: true },
    { id: 'file', label: 'Files', icon: 'clarity:paperclip-line', active: false, show: true },
    { id: 'screen-share', label: 'Screen Share', icon: 'tabler:screen-share', active: false, show: false },
  ],
  error: null,
});

function activeTab(index: number) {
  state.tabs.map((x) => (x.active = false));
  state.tabs[index].active = true;
}

onMounted(() => {
  if (space.value.type === SpaceType.TEXT) activeTab(1);
  if (space.value.type === SpaceType.VOIP) activeTab(0);
});

watch(space, (space: ISpace) => {
  if (space.type === SpaceType.TEXT) activeTab(1);
  if (space.type === SpaceType.VOIP) activeTab(0);
});

function setMsgType(type: MessageType) {
  switch (type) {
    case MessageType.VOICE:
      state.msgType = MessageType.VOICE;
      break;
    case MessageType.H010:
      state.msgType = MessageType.H010;
      break;
    default:
      state.msgType = MessageType.TEXT;
      break;
  }
}

function sendMessage(message: Partial<IMessage>) {
  const newMessage = { ...message, reply_to_id: chatStore.replyToMessage?.id } as IMessage;
  try {
    chatStore.insertMessage(newMessage);
  } catch (e: any) {
    state.error = e.error_description || e.message;
  }
  chatStore.clearReplyToMessage();
}

const emit = defineEmits<{
  (e: 'toggleCollapsed'): void;
}>();

function emitToggleCollapsed() {
  emit('toggleCollapsed');
}
</script>

<style scoped>
.tabs a {
  @apply flex items-center gap-2;
}
</style>
