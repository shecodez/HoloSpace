<template>
  <div
    class="default-layout flex flex-col md:flex-row flex-wrap md:flex-nowrap h-screen overflow-hidden"
    :style="{ backgroundImage: `url(${backgroundImageUrl})` }"
  >
    <slot name="fixed"></slot>

    <div class="flex-1 flex flex-col w-full h-full overflow-hidden">
      <slot name="banner"></slot>

      <div class="flex h-full overflow-hidden">
        <slot name="left"></slot>

        <slot></slot>

        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  backgroundImageUrl: String,
});

const { backgroundImageUrl } = toRefs(props);
</script>

<style scoped>
.default-layout {
  background-position: center center;
}
</style>
