<template>
  <Panel css="w-0 bg-base-100 bg-opacity-80">
    <template #header>
      <DiskspaceToolbar :diskspace="space" :collapsed="collapsed" @toggleCollapsed="emitToggleCollapsed" />
    </template>

    <div v-if="space.id" class="tabs mx-12">
      <template v-for="(tab, i) in state.tabs" :key="tab.id">
        <a @click="activeTab(i)" v-if="tab.show" class="tab tab-lg tab-bordered" :class="tab.active && 'tab-active'">
          <Icon :icon="tab.icon" /> {{ tab.label }}
        </a>
      </template>
      <div class="ml-auto">
        <UserIOToolbar v-if="state.tabs[0].active" collapsed />
      </div>
    </div>
    <div class="overflow-y-auto overflow-x-hidden flex flex-col-reverse">
      <VoipUserList v-if="state.tabs[0].active" :team="team" />
      <MessageList v-if="state.tabs[1].active" :messages="messages" />
      <FileList v-if="state.tabs[2].active" :files="[]" />
    </div>

    <template #footer>
      <div v-if="state.tabs[1].active" class="relative mb-4 mx-6 md:mx-24">
        <TextCommForm v-if="state.commType === CommType.TEXT" @switchToVoiceComms="switchComm(CommType.VOICE)" />
        <VoiceCommForm v-if="state.commType === CommType.VOICE" @switchToTextComms="switchComm(CommType.TEXT)" />
      </div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, PropType, reactive, toRefs, watch } from 'vue';
import { Icon } from '@iconify/vue';

import Panel from '@/components/DockUI/Panel.vue';
import DiskspaceToolbar from '@/components/diskspaces/DiskspaceToolbar.vue';
import VoiceCommForm from '@/components/comms/VoiceCommForm.vue';
import TextCommForm from '@/components/comms/TextCommForm.vue';
import VoipUserList from '@/components/chat/VoipUserList.vue';
import MessageList from '@/components/chat/MessageList.vue';
import FileList from '@/components/chat/FileList.vue';
import UserIOToolbar from '@/components/me/UserIOToolbar.vue';
import { IDiskspace, ITextMessage, IUser } from '@/data/interfaces';
import { CommType, SpaceType } from '@/data/mock';

const props = defineProps({
  space: {
    type: Object as PropType<IDiskspace>,
    default: {},
  },
  collapsed: Boolean,
  messages: {
    type: Array as PropType<ITextMessage[]>,
    default: [],
  },
  team: {
    type: Array as PropType<IUser[]>,
    default: [],
  },
});
const { space } = toRefs(props);

const showTeamTab = computed(() => space.value.type === SpaceType.VOIP);

const state = reactive({
  commType: CommType.TEXT,
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
});

function activeTab(index: number) {
  state.tabs.map((x) => (x.active = false));
  state.tabs[index].active = true;
}

onMounted(() => {
  if (space.value.type === SpaceType.TEXT) activeTab(1);
  if (space.value.type === SpaceType.VOIP) activeTab(0);
});

watch(space, (space: IDiskspace) => {
  if (space.type === SpaceType.TEXT) activeTab(1);
  if (space.type === SpaceType.VOIP) activeTab(0);
});

function switchComm(type: CommType) {
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
