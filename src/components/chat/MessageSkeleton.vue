<template>
  <div class="flex flex-start w-96 p-2 rounded">
    <Skeleton css="w-10 h-10 rounded-full mx-2 flex-shrink-0" />
    <div class="w-full flex flex-col gap-2 bg-base-100 bg-opacity-80 rounded p-2">
      <Skeleton />
      <Skeleton css="w-full h-4 " />
      <Skeleton css="w-1/2 h-4 " />
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from '@/components/DockUI/Skeleton.vue';
</script>
