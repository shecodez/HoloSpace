<template>
  <div
    class="default-layout flex flex-col md:flex-row flex-wrap md:flex-nowrap h-screen max-h-screen overflow-hidden"
    :style="{ backgroundImage: `url(${backgroundImageURL})` }"
  >
    <slot name="fixed"></slot>

    <div class="flex-1 flex flex-col w-full h-full md:max-h-screen overflow-hidden">
      <slot name="banner">
        <Banner
          v-if="appStore.isBanner"
          :icon="appStore.bannerIcon"
          :title="appStore.bannerTitle"
          :text="appStore.bannerText"
          :type="appStore.bannerType"
          :dismissible="appStore.bannerDismissible"
          @close="appStore.clearBanner"
        />
      </slot>

      <div class="flex h-full overflow-hidden">
        <slot name="left"></slot>

        <slot></slot>

        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref, toRefs, watch } from 'vue';
import { useTitle } from '@vueuse/core';
import { useRoute } from 'vue-router';

import Banner from '@/components/DockUI/Banner.vue';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { useDeckStore } from '@/stores/deck';
import { useSpaceStore } from '@/stores/space';
import { useChatStore } from '@/stores/chat';

const props = defineProps({
  pageTitle: String,
  deckId: String,
  spaceId: String,
});
const { pageTitle, deckId, spaceId } = toRefs(props);

const title = computed(() =>
  pageTitle?.value ? `${pageTitle?.value} | ${import.meta.env.VITE_APP_NAME}` : import.meta.env.VITE_APP_NAME,
);
useTitle(title);

const route = useRoute();
const appStore = useAppStore();
const authStore = useAuthStore();
const deckStore = useDeckStore();
const spaceStore = useSpaceStore();
const chatStore = useChatStore();

const backgroundImageURL = ref(
  'https://heipqgxfpjhqerywembc.supabase.in/storage/v1/object/public/backgrounds/default-bg.jpg',
);

onMounted(() => {
  // get latest notification where notify = 'SITE' and date.now() >= start_date && date.now() <= end_date
  appStore.setBanner(
    { text: 'The <span class="font-brand">H010SPACE</span> beta is live!', icon: 'vs:party' },
    'info',
    true,
  );
  // get user backgroundImageURL
  deckStore.setUserDecks(authStore.userId!);
  spaceStore.setTeamSpaces(authStore.userId!);
});

watch(
  () => route.params.deckId,
  (deckId) => {
    if (deckId) {
      deckStore.setCurrentDeck(deckId as string);
      deckStore.setCrew(deckId as string);
      chatStore.setCurrentChatUsers(deckStore.crew);
      spaceStore.setDeckSpaces(deckId as string);
    }
  },
  { deep: true, immediate: true },
);
watch(
  () => route.params.spaceId,
  (spaceId) => {
    if (spaceId) {
      spaceStore.setCurrentSpace(spaceId as string);
      chatStore.setCurrentChatMessages(spaceId as string);
      chatStore.setCurrentChatMessageReactions(spaceId as string);
      spaceStore.setTeam(spaceId as string);
      chatStore.setCurrentChatUsers(spaceStore.team);
    }
  },
  { deep: true, immediate: true },
);
</script>

<style scoped>
.default-layout {
  background-position: center center;
}
</style>
