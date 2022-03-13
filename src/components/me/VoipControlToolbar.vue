<template>
  <div class="flex items-center justify-between gap-1">
    <div class="flex flex-col pr-2">
      <div class="text-success flex items-center gap-2">
        <Icon icon="mdi:signal-cellular-2" class="text-warning" />
        <h5 class="font-semibold">VoIP Connected</h5>
      </div>
      <div class="text-sm font-extralight text-gray-400 -mt-1.5">(3) + @me joined</div>
    </div>
    <button class="btn btn-sm btn-square btn-ghost">
      <Icon icon="entypo:sound-mix" />
    </button>
    <button class="btn btn-sm btn-square btn-error btn-outline">
      <Icon icon="ic:baseline-call-end" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
