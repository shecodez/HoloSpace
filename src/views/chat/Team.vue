<template>
  <Layout :pageTitle="activeSpace?.name ? activeSpace?.name : 'Team'">
    <template v-slot:fixed>
      <DeckPanel :decks="decks" />
    </template>

    <template v-slot:left>
      <SpaceSideDrawer :isSmScreen="!lgAndLarger" isTeam :spaces="spaces" />
    </template>

    <TeamChatPanel :me="activeUser" :space="activeSpace" :messages="messages" />

    <template v-slot:right>
      <UserMetaDrawer title="Contacts" :users="users" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import Layout from '@/layouts/DefaultLayout.vue';
import DeckPanel from '@/components/decks/DeckPanel.vue';
import UserMetaDrawer from '@/components/users/UserMetaDrawer.vue';
import SpaceSideDrawer from '@/components/spaces/SpaceSideDrawer.vue';
import TeamChatPanel from '@/components/chat/TeamChatPanel.vue';
import { decks, users, spaces as all_spaces, messages as all_messages } from '@/data/mock';
import { useAppStore } from '@/stores/app';

const route = useRoute();
const breakpoints = useBreakpoints(breakpointsTailwind);
const appStore = useAppStore();

onMounted(() => {
  appStore.setSideDrawerCollapsed(false);
  appStore.setMetaDrawerCollapsed(true);
});

const lgAndLarger = breakpoints.greater('lg');

const activeUser = computed(() => users[1]);
const activeDeck = computed(() => decks.find((x) => x.id === route.params.deck_id));
const isCaptain = activeUser.value.id === activeDeck.value?.user_id;
const spaces = computed(() => all_spaces.filter((x) => x.deck_id === route.params.deck_id));
const activeSpace = computed(() => spaces.value.find((x) => x.id === route.params.space_id));
const messages = computed(() => all_messages.filter((x) => x.space_id === route.params.space_id));
</script>
