<template>
  <Layout :backgroundImageUrl="state.backgroundImageUrl">
    <template v-slot:fixed>
      <FixedPanel :decks="decks" />
    </template>

    <template v-slot:banner>
      <!-- <ConfirmEmailAlert :show="state.showAlert" @close="dismissAlert" /> -->
      <BetaAlert :show="state.showAlert" @close="dismissAlert" />
    </template>

    <template v-slot:left>
      <SideDrawer
        :deck="activeDeck"
        :diskspaces="diskspaces"
        :collapsed="state.sideDrawerIsCollapsed"
        :isSmScreen="!lgAndLarger"
        @close="state.sideDrawerIsCollapsed = true"
      />
    </template>

    <ChatPanel
      :me="activeUser"
      :space="activeDiskspace"
      :messages="messages"
      :team="team?.users"
      :collapsed="state.sideDrawerIsCollapsed"
      @toggleCollapsed="toggleSideDrawer"
    />

    <template v-slot:right>
      <MetaDrawer :users="users" :collapsed="state.metaDrawerIsCollapsed" @toggleCollapsed="toggleMetaDrawer" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import Layout from '@/layouts/DefaultLayout.vue';
import BetaAlert from '@/components/alerts/BetaAlert.vue';
import FixedPanel from '@/components/FixedPanel.vue';
import MetaDrawer from '@/components/MetaDrawer.vue';
import SideDrawer from '@/components/SideDrawer.vue';
import ChatPanel from '@/components/chat/ChatPanel.vue';
import { decks, users, diskspaces as all_diskspaces, messages as all_messages, teams } from '../data/mock';
import { IMessage, ITextMessage } from '@/data/interfaces';

const route = useRoute();
const breakpoints = useBreakpoints(breakpointsTailwind);

const state = reactive({
  showAlert: true,
  sideDrawerIsCollapsed: false,
  metaDrawerIsCollapsed: false,
  sideDrawerPreBreakpoint: false,
  metaDrawerPreBreakpoint: false,
  backgroundImageUrl: 'https://heipqgxfpjhqerywembc.supabase.in/storage/v1/object/public/backgrounds/default-bg.jpg',
});

const lgAndLarger = breakpoints.greater('lg');
watch(
  () => lgAndLarger.value,
  (lgAndLarger: Boolean) => {
    if (lgAndLarger) {
      state.sideDrawerIsCollapsed = state.sideDrawerPreBreakpoint;
      state.metaDrawerIsCollapsed = state.metaDrawerPreBreakpoint;
    } else {
      state.sideDrawerPreBreakpoint = state.sideDrawerIsCollapsed;
      state.metaDrawerPreBreakpoint = state.metaDrawerIsCollapsed;

      state.sideDrawerIsCollapsed = true;
      state.metaDrawerIsCollapsed = true;
    }
  },
  { immediate: true },
);

function dismissAlert() {
  state.showAlert = false;
}

function toggleSideDrawer() {
  state.sideDrawerIsCollapsed = !state.sideDrawerIsCollapsed;
}

function toggleMetaDrawer() {
  state.metaDrawerIsCollapsed = !state.metaDrawerIsCollapsed;
}

// function sortByDateDesc(a: ITextMessage, b: ITextMessage) {
//   var dateA = new Date(a.created_at).getTime();
//   var dateB = new Date(b.created_at).getTime();
//   return dateA < dateB ? 1 : -1;
// }

const activeUser = computed(() => users[1]);
const activeDeck = computed(() => decks.find((x) => x.id === route.params.deck_id));
const isCaptain = activeUser.value.id === activeDeck.value?.captain_id;
const diskspaces = computed(() => all_diskspaces.filter((x) => x.deck_id === route.params.deck_id));
const activeDiskspace = computed(() => diskspaces.value.find((x) => x.id === route.params.diskspace_id));
const messages = computed(() => all_messages.filter((x) => x.diskspace_id === route.params.diskspace_id));
const team = computed(() => teams.find((x) => x.diskspace_id === route.params.diskspace_id));
</script>
