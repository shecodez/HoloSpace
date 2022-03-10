<template>
  <DrawerModal v-if="isSmScreen" :isOpen="!collapsed" @close="appStore.setSideDrawerCollapsed(true)">
    <div class="w-64 h-screen bg-base-100">SHOP</div>
  </DrawerModal>
  <Drawer v-else :collapsed="collapsed">SHOP</Drawer>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

import Drawer from '@/components/DockUI/Drawer.vue';
import DrawerModal from '@/components/DockUI/DrawerModal.vue';
import { useAppStore } from '@/stores/app';

const props = defineProps({
  isSmScreen: Boolean,
});

const appStore = useAppStore();

const collapsed = computed(() => appStore.isSideDrawerCollapsed);
</script>
