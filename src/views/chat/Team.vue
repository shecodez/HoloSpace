<template>
  <Layout :pageTitle="activeSpace?.name ? activeSpace?.name : 'Team'">
    <template v-slot:fixed>
      <DeckPanel :decks="userDecks" />
    </template>

    <template v-slot:left>
      <SpaceSideDrawer isTeam :spaces="spaces" />
    </template>

    <TeamChatPanel :me="activeUser" :space="activeSpace" :messages="messages" />

    <template v-slot:right>
      <UserMetaDrawer :me="activeUser" title="Team" :users="team" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

import Layout from '@/layouts/DefaultLayout.vue';
import DeckPanel from '@/components/decks/DeckPanel.vue';
import UserMetaDrawer from '@/components/users/UserMetaDrawer.vue';
import SpaceSideDrawer from '@/components/spaces/SpaceSideDrawer.vue';
import TeamChatPanel from '@/components/chat/TeamChatPanel.vue';
//import { decks, users, spaces as all_spaces, messages as all_messages } from '@/data/mock';
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
  appStore.setMetaDrawerCollapsed(true);
});

const activeUser = computed(() => authStore.userData);
const userDecks = computed(() => deckStore.decks);
const spaces = computed(() => spaceStore.teamSpaces);
const activeSpace = computed(() => spaceStore.currentSpace);
const messages = computed(() => chatStore.messages);
const team = computed(() => spaceStore.team);
</script>
