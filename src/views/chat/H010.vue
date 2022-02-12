<template>
  <Layout :backgroundImageUrl="state.backgroundImageUrl">
    <template v-slot:fixed>
      <DeckPanel :decks="decks" />
    </template>

    <template v-slot:banner>
      <!-- <ConfirmEmailAlert :show="state.showAlert" @close="dismissAlert" /> -->
      <BetaAlert :show="state.showAlert" @close="dismissAlert" />
    </template>

    <template v-slot:left>
      <SpaceSideDrawer
        :collapsed="state.sideDrawerIsCollapsed"
        :isSmScreen="!lgAndLarger"
        :isTeam="$route.name?.toString().toLowerCase().includes('team')"
        :deck="activeDeck"
        :spaces="spaces"
        @close="state.sideDrawerIsCollapsed = true"
      />
    </template>

    <H010spacePanel
      :me="activeUser"
      :space="activeDiskspace"
      :collapsed="state.sideDrawerIsCollapsed"
      @toggleCollapsed="toggleSideDrawer"
    />

    <template v-slot:right>
      <UserMetaDrawer :users="users" :collapsed="state.metaDrawerIsCollapsed" @toggleCollapsed="toggleMetaDrawer" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import Layout from '@/layouts/DefaultLayout.vue';
import BetaAlert from '@/components/alerts/BetaAlert.vue';
import DeckPanel from '@/components/decks/DeckPanel.vue';
import UserMetaDrawer from '@/components/users/UserMetaDrawer.vue';
import SpaceSideDrawer from '@/components/spaces/SpaceSideDrawer.vue';
import H010spacePanel from '@/components/chat/H010spacePanel.vue';
import { decks, users, spaces as all_spaces, messages as all_messages, teams } from '@/data/mock';

const route = useRoute();
const breakpoints = useBreakpoints(breakpointsTailwind);

const state = reactive({
  showAlert: true,
  sideDrawerIsCollapsed: true,
  metaDrawerIsCollapsed: true,
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
const spaces = computed(() => all_spaces.filter((x) => x.deck_id === route.params.deck_id));
const activeDiskspace = computed(() => spaces.value.find((x) => x.id === route.params.space_id));
const messages = computed(() => all_messages.filter((x) => x.space_id === route.params.space_id));
const team = computed(() => teams.find((x) => x.space_id === route.params.space_id));
</script>
