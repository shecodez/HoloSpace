<template>
  <Panel css="bg-base-200 bg-opacity-70">
    <template #header>
      <DeckToolbar :deck="deck" />
    </template>

    <div class="overflow-y-auto overflow-x-hidden">
      <DiskspaceList :type="SpaceType.TEXT" :diskspaces="textDiskspaces" :open="isActiveType(SpaceType.TEXT)" />
      <DiskspaceList :type="SpaceType.VOIP" :diskspaces="voipDiskspaces" :open="isActiveType(SpaceType.VOIP)" />
      <DiskspaceList :type="SpaceType.H010" :diskspaces="h010Diskspaces" :open="isActiveType(SpaceType.H010)" />
    </div>

    <template #footer>
      <div>Ad</div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';

import Panel from '@/components/DockUI/Panel.vue';
import DiskspaceList from '@/components/diskspaces/DiskspaceList.vue';
import DeckToolbar from '@/components/decks/DeckToolbar.vue';
import { SpaceType } from '@/data/mock';
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
});

const textDiskspaces = computed(() => diskspaces.value.filter((x) => x.type === SpaceType.TEXT));
const voipDiskspaces = computed(() => diskspaces.value.filter((x) => x.type === SpaceType.VOIP));
const h010Diskspaces = computed(() => diskspaces.value.filter((x) => x.type === SpaceType.H010));

const route = useRoute();

function isActiveType(listType: SpaceType) {
  const activeDiskspace = diskspaces.value.find((x) => x.id === route.params.diskspace_id);
  return activeDiskspace?.type === listType;
}

const { deck, diskspaces } = toRefs(props);
</script>
