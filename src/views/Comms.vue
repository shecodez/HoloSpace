<template>
  <Layout :backgroundImageUrl="state.backgroundImageUrl">
    <template v-slot:fixed>
      <FixedPanel :decks="decks" />
    </template>

    <template v-slot:banner>
      <ConfirmEmailAlert :show="state.showAlert" @close="dismissAlert" />
    </template>

    <template v-slot:left>
      <SideDrawer :deck="activeDeck" :diskspaces="diskspaces" :collapsed="state.sideDrawerIsCollapsed" />
    </template>

    <ChatPanel
      :me="activeUser"
      :diskspace="activeDiskspace"
      :messages="messages"
      :collapsed="state.sideDrawerIsCollapsed"
      @toggleCollapsed="toggleSideDrawer"
    />

    <template v-slot:right>
      <MetaDrawer :users="users" :collapsed="state.metaDrawerIsCollapsed" @toggleCollapsed="toggleMetaDrawer" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';

import Layout from '@/layouts/Default.vue';
import ConfirmEmailAlert from '@/components/alerts/ConfirmEmailAlert.vue';
import FixedPanel from '@/components/FixedPanel.vue';
import MetaDrawer from '@/components/MetaDrawer.vue';
import SideDrawer from '@/components/SideDrawer.vue';
import ChatPanel from '@/components/ChatPanel.vue';
import { decks, users, diskspaces as all_diskspaces, messages as all_messages } from '../data/mock';

const route = useRoute();

const state = reactive({
  showAlert: true,
  sideDrawerIsCollapsed: false,
  metaDrawerIsCollapsed: false,
  backgroundImageUrl: '/src/assets/images/backgrounds/juskteez-vu-unsplash-1920x1080.jpg',
});

function dismissAlert() {
  state.showAlert = false;
}

function toggleSideDrawer() {
  state.sideDrawerIsCollapsed = !state.sideDrawerIsCollapsed;
}

function toggleMetaDrawer() {
  state.metaDrawerIsCollapsed = !state.metaDrawerIsCollapsed;
}

const activeUser = computed(() => users[1]);
const activeDeck = computed(() => decks.find((x) => x.id === route.params.deck_id));
const isCaptain = activeUser.value.id === activeDeck.value?.captain_id;
const diskspaces = computed(() => all_diskspaces.filter((x) => x.deck_id === route.params.deck_id));
const activeDiskspace = computed(() => diskspaces.value.find((x) => x.id === route.params.diskspace_id));
const messages = computed(() => all_messages.filter((x) => x.diskspace_id === route.params.diskspace_id));
</script>
