<template>
  <DrawerModal v-if="isSmScreen" :isOpen="!collapsed" @close="$emit('close')">
    <div class="w-64 h-screen bg-base-100">SHOP</div>
  </DrawerModal>
  <Drawer v-else :collapsed="collapsed">SHOP</Drawer>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

import Drawer from '@/components/DockUI/Drawer.vue';
import DrawerModal from '@/components/DockUI/DrawerModal.vue';

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
  isSmScreen: Boolean,
});

const { collapsed } = toRefs(props);
</script>
