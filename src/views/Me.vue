<template>
  <Layout v-if="user" :pageTitle="`@${users[0]?.name}`">
    <template v-slot:fixed>
      <DeckPanel :decks="decks">
        <template #linkTo>
          <router-link to="/team" class="btn btn-circle btn-primary m-2">
            <Icon icon="mdi:account-group-outline" width="26" />
          </router-link>
        </template>
      </DeckPanel>
    </template>

    <template v-slot:left>
      <ShopSideDrawer :isSmScreen="!lgAndLarger" />
    </template>

    <UserModelPanel :me="user.user_metadata.username" />

    <template v-slot:right>
      <UserMetaDrawer title="Friends" :users="users" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { Icon } from '@iconify/vue';

import Layout from '@/layouts/DefaultLayout.vue';
import DeckPanel from '@/components/decks/DeckPanel.vue';
import UserMetaDrawer from '@/components/users/UserMetaDrawer.vue';
import UserModelPanel from '@/components/me/UserModelPanel.vue';
import ShopSideDrawer from '@/components/me/ShopSideDrawer.vue';
import { decks, users } from '@/data/mock';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';

const breakpoints = useBreakpoints(breakpointsTailwind);
const appStore = useAppStore();
const authStore = useAuthStore();

onMounted(() => {
  appStore.setSideDrawerCollapsed(true);
  appStore.setMetaDrawerCollapsed(false);
});

const user = computed(() => authStore.userSession);

const lgAndLarger = breakpoints.greater('lg');
</script>
