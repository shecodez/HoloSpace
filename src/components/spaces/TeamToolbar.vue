<template>
  <div class="navbar bg-base-100">
    <div class="flex-1 px-2 mx-2 overflow-hidden">
      <span class="text-lg font-bold truncate">Teams</span>
    </div>
    <div class="flex-none">
      <button class="btn btn-square btn-ghost" title="Filter">
        <Icon icon="mdi:filter-variant" width="24" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
