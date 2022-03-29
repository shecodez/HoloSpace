<template>
  <Layout :pageTitle="activeSpace?.name">
    <template v-slot:fixed>
      <DeckPanel :decks="userDecks" />
    </template>

    <template v-slot:left>
      <SpaceSideDrawer :isTeam="isTeamRoute" :deck="activeDeck" :spaces="spaces" />
    </template>

    <H010spacePanel :me="activeUser" :space="activeSpace" :messages="messages" />

    <template v-slot:right>
      <UserMetaDrawer :me="activeUser" :title="isTeamRoute ? 'Team' : ''" :users="isTeamRoute ? team : crew" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import Layout from '@/layouts/DefaultLayout.vue';
import DeckPanel from '@/components/decks/DeckPanel.vue';
import UserMetaDrawer from '@/components/users/UserMetaDrawer.vue';
import SpaceSideDrawer from '@/components/spaces/SpaceSideDrawer.vue';
import H010spacePanel from '@/components/chat/H010spacePanel.vue';
//import { decks, users, spaces as all_spaces, messages as all_messages, teams } from '@/data/mock';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { useDeckStore } from '@/stores/deck';
import { useSpaceStore } from '@/stores/space';
import { useChatStore } from '@/stores/chat';

const route = useRoute();
const appStore = useAppStore();
const authStore = useAuthStore();
const deckStore = useDeckStore();
const spaceStore = useSpaceStore();
const chatStore = useChatStore();

onMounted(() => {
  appStore.setSideDrawerCollapsed(true);
  appStore.setMetaDrawerCollapsed(true);
});

const isTeamRoute = computed(() => route.name?.toString().toLowerCase().includes('team'));
const activeUser = computed(() => authStore.userData);
const userDecks = computed(() => deckStore.decks);
const activeDeck = computed(() => deckStore.currentDeck);
const crew = computed(() => deckStore.crew);
const spaces = computed(() => (isTeamRoute.value ? spaceStore.teamSpaces : spaceStore.spaces));
const activeSpace = computed(() => spaceStore.currentSpace);
const messages = computed(() => chatStore.messages);
const team = computed(() => spaceStore.team);
</script>
