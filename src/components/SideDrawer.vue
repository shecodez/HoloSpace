<template>
  <Drawer :collapsed="collapsed">
    <Panel css="bg-gray-300 bg-opacity-80 dark:bg-gray-700 dark:bg-opacity-80 text-gray-800 dark:text-gray-200">
      <template #header>
        <div class="navbar bg-gray-300 dark:bg-gray-700">
          <div class="flex-1 px-2 mx-2">
            <span class="text-lg font-bold">{{ deck.name }}</span>
          </div>
          <div class="flex-none">
            <button class="btn btn-square btn-ghost">
              <Icon icon="mdi:chevron-down" width="24" />
            </button>
          </div>
        </div>
      </template>

      <div class="overflow-y-auto overflow-x-hidden">
        <DiskspaceList type="TEXTSPACE" :diskspaces="textDiskspaces" :open="isActiveType(DiskspaceType.TEXT)" />

        <DiskspaceList type="VoIPSPACE" :diskspaces="voipDiskspaces" :open="isActiveType(DiskspaceType.VOIP)" />

        <DiskspaceList type="H010SPACE" :diskspaces="h010Diskspaces" :open="isActiveType(DiskspaceType.H010)" />
      </div>

      <template #footer>
        <div>Ad</div>
      </template>
    </Panel>
  </Drawer>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';

import Drawer from '@/components/Drawer.vue';
import Panel from '@/components/Panel.vue';
import DiskspaceList from '@/components/DiskspaceList.vue';
import { DiskspaceType } from '../data/mock';
import { IDeck, IDiskspace } from '../data/interfaces';

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
});

const textDiskspaces = computed(() => diskspaces.value.filter((x) => x.type === DiskspaceType.TEXT));
const voipDiskspaces = computed(() => diskspaces.value.filter((x) => x.type === DiskspaceType.VOIP));
const h010Diskspaces = computed(() => diskspaces.value.filter((x) => x.type === DiskspaceType.H010));

const route = useRoute();

function isActiveType(listType: DiskspaceType) {
  const activeDiskspace = diskspaces.value.find((x) => x.id === route.params.diskspace_id);
  return activeDiskspace?.type === listType;
}

const { deck, diskspaces, collapsed } = toRefs(props);
</script>
