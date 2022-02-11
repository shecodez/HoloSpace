<template>
  <DrawerModal v-if="isSmScreen" :isOpen="!collapsed" @close="$emit('close')">
    <div class="w-64 h-screen bg-base-100">
      <SpacePanel :deck="deck" :isTeam="isTeam" :spaces="spaces" />
    </div>
  </DrawerModal>
  <Drawer v-else :collapsed="collapsed">
    <SpacePanel :deck="deck" :isTeam="isTeam" :spaces="spaces" />
  </Drawer>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';

import Drawer from '@/components/DockUI/Drawer.vue';
import DrawerModal from '@/components/DockUI/DrawerModal.vue';
import SpacePanel from '@/components/spaces/SpacePanel.vue';
import { IDeck, ISpace } from '@/data/interfaces';

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
  isSmScreen: Boolean,
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
</script>
