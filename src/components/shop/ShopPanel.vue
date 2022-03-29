<template>
  <Panel css="bg-base-200 bg-opacity-70">
    <template #header>
      <div class="navbar bg-base-200">
        <div class="flex-1 px-2 mx-2 overflow-hidden">
          <span class="text-lg font-bold truncate">Shop</span>
        </div>
        <div class="flex-none">
          <button class="btn btn-square btn-ghost" title="Search">
            <Icon icon="mdi:search" width="24" />
          </button>
        </div>
      </div>
    </template>

    <div class="overflow-y-auto overflow-x-hidden">
      <!-- TODO: category tabs for: head, tops, bottoms, hands, feet, & misc items -->
      <!-- misc items: include skins(outfits), pets, auras, back(capes/wings) etc. -->
      <div class="grid grid-cols-3 gap-1">
        <template v-for="i in 12" :key="i">
          <div class="bg-base-300 relative aspect-square overflow-hidden">
            <Icon icon="mdi:loading" class="absolute inset-0 m-auto animate-spin" />
          </div>
        </template>
      </div>
    </div>

    <template #footer>
      <div class="bg-black p-2 flex items-center justify-center">Ad</div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

import Panel from '@/components/DockUI/Panel.vue';
</script>
