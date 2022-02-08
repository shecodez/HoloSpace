<template>
  <Layout :backgroundImageUrl="state.backgroundImageUrl" pageTitle="Ssh">
    <template v-slot:fixed>
      <FixedPanel :decks="decks" />
    </template>

    <template v-slot:banner>
      <!-- <ConfirmEmailAlert :show="state.showAlert" @close="dismissAlert" /> -->
      <BetaAlert :show="state.showAlert" @close="dismissAlert" />
    </template>

    <template v-slot:left>
      <SideDrawer
        isDirect
        :diskspaces="diskspaces"
        :collapsed="state.sideDrawerIsCollapsed"
        :isSmScreen="!lgAndLarger"
        @close="state.sideDrawerIsCollapsed = true"
      />
    </template>

    <DirectCommsPanel
      :me="activeUser"
      :diskspace="activeDiskspace"
      :messages="messages"
      :collapsed="state.sideDrawerIsCollapsed"
      @toggleCollapsed="toggleSideDrawer"
    />

    <template v-slot:right>
      <MetaDrawer
        title="Contacts"
        :users="users"
        :collapsed="state.metaDrawerIsCollapsed"
        @toggleCollapsed="toggleMetaDrawer"
      />
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
import DirectCommsPanel from '@/components/comms/DirectCommsPanel.vue';
import { decks, users, diskspaces as all_diskspaces, messages as all_messages } from '../data/mock';

const route = useRoute();
const breakpoints = useBreakpoints(breakpointsTailwind);

const state = reactive({
  showAlert: true,
  sideDrawerIsCollapsed: false,
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

const activeUser = computed(() => users[1]);
const activeDeck = computed(() => decks.find((x) => x.id === route.params.deck_id));
const isCaptain = activeUser.value.id === activeDeck.value?.captain_id;
const diskspaces = computed(() => all_diskspaces.filter((x) => x.deck_id === route.params.deck_id));
const activeDiskspace = computed(() => diskspaces.value.find((x) => x.id === route.params.diskspace_id));
const messages = computed(() => all_messages.filter((x) => x.diskspace_id === route.params.diskspace_id));
</script>
