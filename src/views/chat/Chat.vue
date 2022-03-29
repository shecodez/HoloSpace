<template>
  <Layout :pageTitle="activeSpace?.name">
    <template v-slot:fixed>
      <DeckPanel :decks="userDecks" />
    </template>

    <template v-slot:left>
      <SpaceSideDrawer :deck="activeDeck" :spaces="spaces" />
    </template>

    <ChatPanel :me="activeUser" :space="activeSpace" :messages="messages" :team="team" />

    <template v-slot:right>
      <UserMetaDrawer :me="activeUser" :users="crew" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import Layout from '@/layouts/DefaultLayout.vue';
import DeckPanel from '@/components/decks/DeckPanel.vue';
import UserMetaDrawer from '@/components/users/UserMetaDrawer.vue';
import SpaceSideDrawer from '@/components/spaces/SpaceSideDrawer.vue';
import ChatPanel from '@/components/chat/ChatPanel.vue';
//import { decks, users, spaces as all_spaces, messages as all_messages, teams } from '@/data/mock';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { useDeckStore } from '@/stores/deck';
import { useSpaceStore } from '@/stores/space';
import { useChatStore } from '@/stores/chat';

const appStore = useAppStore();
const authStore = useAuthStore();
const deckStore = useDeckStore();
const spaceStore = useSpaceStore();
const chatStore = useChatStore();

onMounted(() => {
  appStore.setSideDrawerCollapsed(false);
  appStore.setMetaDrawerCollapsed(false);
});

const activeUser = computed(() => authStore.userData);
const userDecks = computed(() => deckStore.decks);
const activeDeck = computed(() => deckStore.currentDeck);
const crew = computed(() => deckStore.crew);
const spaces = computed(() => spaceStore.spaces);
const activeSpace = computed(() => spaceStore.currentSpace);
const messages = computed(() => chatStore.messages);
const team = computed(() => spaceStore.team);
</script>
