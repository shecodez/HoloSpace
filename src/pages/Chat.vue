<template>
  <Layout :backgroundImageUrl="state.backgroundImageUrl">
    <template v-slot:fixed>
      <FixedPanel :decks="decks" />
    </template>

    <template v-slot:banner>
      <ConfirmEmailAlert :show="!state.showConfirmEmailAlert" />
    </template>

    <template v-slot:left>
      <SideDrawer :deck="activeDeck" :collapsed="state.sideDrawerIsCollapsed" :diskspaces="diskspaces" />
    </template>

    <ChatPanel
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
import { decks, users, diskspaces, messages } from '../data/mock';

const route = useRoute();

const state = reactive({
  showConfirmEmailAlert: false,
  sideDrawerIsCollapsed: false,
  metaDrawerIsCollapsed: false,
  backgroundImageUrl: '/src/assets/images/backgrounds/juskteez-vu-unsplash-1920x1080.jpg',
});

function toggleSideDrawer() {
  state.sideDrawerIsCollapsed = !state.sideDrawerIsCollapsed;
}

function toggleMetaDrawer() {
  state.metaDrawerIsCollapsed = !state.metaDrawerIsCollapsed;
}

const activeDeck = computed(() => decks.find((x) => x.id === route.params.deck_id));
const activeDiskspace = computed(() => diskspaces.find((x) => x.id === route.params.diskspace_id));
</script>
