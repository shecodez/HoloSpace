<template>
  <Layout v-if="activeUser" :pageTitle="`@${activeUser.name}`">
    <template v-slot:fixed>
      <DeckPanel :decks="userDecks">
        <template #linkTo>
          <router-link to="/team" class="btn btn-circle btn-primary m-2">
            <Icon icon="mdi:account-group-outline" width="26" />
          </router-link>
        </template>
      </DeckPanel>
    </template>

    <template v-slot:left>
      <ShopSideDrawer />
    </template>

    <UserModelPanel :me="activeUser.name" />

    <template v-slot:right>
      <UserMetaDrawer :me="activeUser" title="Friends" :users="friends" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { Icon } from '@iconify/vue';

import Layout from '@/layouts/DefaultLayout.vue';
import DeckPanel from '@/components/decks/DeckPanel.vue';
import UserMetaDrawer from '@/components/users/UserMetaDrawer.vue';
import UserModelPanel from '@/components/me/UserModelPanel.vue';
import ShopSideDrawer from '@/components/me/ShopSideDrawer.vue';
// import { decks, users } from '@/data/mock';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { useDeckStore } from '@/stores/deck';

const appStore = useAppStore();
const authStore = useAuthStore();
const deckStore = useDeckStore();

onMounted(() => {
  appStore.setSideDrawerCollapsed(true);
  appStore.setMetaDrawerCollapsed(false);
});

const activeUser = computed(() => authStore.userData);
const userProfile = computed(() => authStore.profileData);
const userDecks = computed(() => deckStore.decks);
const friends = computed(() => []);
</script>
