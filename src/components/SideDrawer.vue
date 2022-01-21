<template>
  <Drawer :collapsed="collapsed">
    <Panel css="bg-base-200 bg-opacity-70">
      <template #header>
        <DeckToolbar :deck="deck" />
      </template>

      <div class="overflow-y-auto overflow-x-hidden">
        <DiskspaceList
          :type="DiskspaceType.TEXT"
          :diskspaces="textDiskspaces"
          :open="isActiveType(DiskspaceType.TEXT)"
        />
        <DiskspaceList
          :type="DiskspaceType.VOIP"
          :diskspaces="voipDiskspaces"
          :open="isActiveType(DiskspaceType.VOIP)"
        />
        <DiskspaceList
          :type="DiskspaceType.H010"
          :diskspaces="h010Diskspaces"
          :open="isActiveType(DiskspaceType.H010)"
        />
      </div>

      <template #footer>
        <div>Ad</div>
      </template>
    </Panel>
  </Drawer>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';

import Drawer from '@/components/MyDrawer.vue';
import Panel from '@/components/Panel.vue';
import DiskspaceList from '@/components/DiskspaceList.vue';
import DeckToolbar from './DeckToolbar.vue';
import { DiskspaceType } from '@/data/mock';
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
