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
import { computed, defineProps, onMounted, ref, toRefs } from 'vue';
import { useTitle } from '@vueuse/core';

import Banner from '@/components/DockUI/Banner.vue';
import { useAppStore } from '@/stores/app';

const props = defineProps({
  pageTitle: String,
});
const { pageTitle } = toRefs(props);

const title = computed(() =>
  pageTitle?.value ? `${pageTitle?.value} | ${import.meta.env.VITE_APP_NAME}` : import.meta.env.VITE_APP_NAME,
);
useTitle(title);

const appStore = useAppStore();

const backgroundImageURL = ref(
  'https://heipqgxfpjhqerywembc.supabase.in/storage/v1/object/public/backgrounds/default-bg.jpg',
);

// TODO: allow HTML in banner message i.e. "The <span class="font-brand">H010SPACE</span> beta is live!"
onMounted(() => {
  // get latest notification where notify = 'SITE' and date.now() >= startDate && date.now() <= endDate
  appStore.setBanner({ text: 'The H010SPACE beta is live!', icon: 'vs:party' }, 'info', true);
  // get user backgroundImageURL
});
</script>

<style scoped>
.default-layout {
  background-position: center center;
}
</style>
