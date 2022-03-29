<template>
  <DrawerModal v-if="!isLgScreen" :isOpen="!collapsed" @close="appStore.setSideDrawerCollapsed(true)">
    <div class="w-64 h-screen bg-base-100">
      <ShopPanel />
    </div>
  </DrawerModal>
  <Drawer v-else :collapsed="collapsed">
    <ShopPanel />
  </Drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import Drawer from '@/components/DockUI/Drawer.vue';
import DrawerModal from '@/components/DockUI/DrawerModal.vue';
import ShopPanel from '@/components/shop/ShopPanel.vue';
import { useAppStore } from '@/stores/app';

//const props = defineProps({});

const appStore = useAppStore();
const breakpoints = useBreakpoints(breakpointsTailwind);

const isLgScreen = breakpoints.greater('lg');
const collapsed = computed(() => appStore.isSideDrawerCollapsed);
</script>
