<template>
  <Layout v-if="user" :backgroundImageUrl="state.backgroundImageUrl">
    <template v-slot:fixed>
      <DeckPanel :decks="decks">
        <template #linkTo>
          <router-link to="/team" class="btn btn-circle btn-primary m-2">
            <Icon icon="mdi:account-group-outline" width="26" />
          </router-link>
        </template>
      </DeckPanel>
    </template>

    <template v-slot:banner>
      <!-- <ConfirmEmailAlert :show="state.showAlert" @close="dismissAlert" /> -->
      <BetaAlert :show="state.showAlert" @close="dismissAlert" />
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
import { onMounted, reactive, computed } from 'vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { Icon } from '@iconify/vue';

import Layout from '@/layouts/DefaultLayout.vue';
import BetaAlert from '@/components/alerts/BetaAlert.vue';
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

const state = reactive({
  showAlert: true,
  // sideDrawerIsCollapsed: true,
  // metaDrawerIsCollapsed: false,
  backgroundImageUrl: 'https://heipqgxfpjhqerywembc.supabase.in/storage/v1/object/public/backgrounds/default-bg.jpg',
});

onMounted(() => {
  appStore.setSideDrawerCollapsed(true);
  appStore.setMetaDrawerCollapsed(false);
});

const user = computed(() => authStore.userSession);

const lgAndLarger = breakpoints.greater('lg');
// watch(
//   () => lgAndLarger.value,
//   (lgAndLarger: Boolean) => {
//     if (lgAndLarger) {
//       state.sideDrawerIsCollapsed = state.sideDrawerPreBreakpoint;
//       state.metaDrawerIsCollapsed = state.metaDrawerPreBreakpoint;
//     } else {
//       state.sideDrawerPreBreakpoint = state.sideDrawerIsCollapsed;
//       state.metaDrawerPreBreakpoint = state.metaDrawerIsCollapsed;

//       state.sideDrawerIsCollapsed = true;
//       state.metaDrawerIsCollapsed = true;
//     }
//   },
//   { immediate: true },
// );

function dismissAlert() {
  state.showAlert = false;
}
</script>
