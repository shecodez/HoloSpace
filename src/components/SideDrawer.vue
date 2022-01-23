<template>
  <DrawerModal v-if="isSmScreen" :isOpen="!collapsed" @close="$emit('close')">
    <div class="w-64 h-screen bg-base-100">
      <DiskspaceSidePanel :deck="deck" :diskspaces="diskspaces" />
    </div>
  </DrawerModal>
  <Drawer v-else :collapsed="collapsed">
    <DiskspaceSidePanel :deck="deck" :diskspaces="diskspaces" />
  </Drawer>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';

import Drawer from '@/components/DockUI/Drawer.vue';
import DrawerModal from '@/components/DockUI/DrawerModal.vue';
import DiskspaceSidePanel from '@/components/diskspaces/DiskspaceSidePanel.vue';
import { IDeck, IDiskspace } from '@/data/interfaces';

const props = defineProps({
  deck: {
    type: Object as PropType<IDeck>,
    default: {},
  },
  diskspaces: {
    type: Array as PropType<IDiskspace[]>,
    default: [],
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
  isSmScreen: Boolean,
});

const { deck, diskspaces, collapsed } = toRefs(props);
</script>
