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
      <ShopSideDrawer
        :collapsed="state.sideDrawerIsCollapsed"
        :isSmScreen="!lgAndLarger"
        @close="state.sideDrawerIsCollapsed = true"
      />
    </template>

    <UserModelPanel
      :me="user.user_metadata.username"
      :collapsed="state.sideDrawerIsCollapsed"
      @toggleCollapsed="toggleSideDrawer"
    />

    <template v-slot:right>
      <UserMetaDrawer
        title="Friends"
        :users="users"
        :collapsed="state.metaDrawerIsCollapsed"
        @toggleCollapsed="toggleMetaDrawer"
      />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { Icon } from '@iconify/vue';

import Layout from '@/layouts/DefaultLayout.vue';
import BetaAlert from '@/components/alerts/BetaAlert.vue';
import DeckPanel from '@/components/decks/DeckPanel.vue';
import UserMetaDrawer from '@/components/users/UserMetaDrawer.vue';
import UserModelPanel from '@/components/me/UserModelPanel.vue';
import ShopSideDrawer from '@/components/me/ShopSideDrawer.vue';
import { decks, users } from '@/data/mock';
import useAuth from '@/use/auth';

const { user } = useAuth();

const breakpoints = useBreakpoints(breakpointsTailwind);

const state = reactive({
  showAlert: true,
  sideDrawerIsCollapsed: true,
  metaDrawerIsCollapsed: false,
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
</script>
