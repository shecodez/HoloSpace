<template>
  <DrawerModal v-if="!isLgScreen" :isOpen="!collapsed" @close="appStore.setSideDrawerCollapsed(true)">
    <div class="w-64 h-screen bg-base-100">
      <SpacePanel :deck="deck" :isTeam="isTeam" :spaces="spaces" />
    </div>
  </DrawerModal>
  <Drawer v-else :collapsed="collapsed">
    <SpacePanel :deck="deck" :isTeam="isTeam" :spaces="spaces" />
  </Drawer>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from 'vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import Drawer from '@/components/DockUI/Drawer.vue';
import DrawerModal from '@/components/DockUI/DrawerModal.vue';
import SpacePanel from '@/components/spaces/SpacePanel.vue';
import { IDeck, ISpace } from '@/data/interfaces';
import { useAppStore } from '@/stores/app';

const props = defineProps({
  deck: {
    type: Object as PropType<IDeck>,
    default: {},
  },
  isTeam: {
    type: Boolean,
    default: false,
  },
  spaces: {
    type: Array as PropType<ISpace[]>,
    default: [],
  },
});

const appStore = useAppStore();
const breakpoints = useBreakpoints(breakpointsTailwind);

const collapsed = computed(() => appStore.isSideDrawerCollapsed);
const isLgScreen = breakpoints.greater('lg');
</script>
