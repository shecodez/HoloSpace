<template>
  <Panel css="bg-base-200 bg-opacity-70">
    <template #header>
      <DirectToolbar :diskspaces="diskspaces" />
    </template>

    <div class="overflow-y-auto overflow-x-hidden">
      <DirectSpaceList :type="SpaceType.TEXT" :diskspaces="textspace" :open="isActiveType(SpaceType.TEXT)" />
      <DirectSpaceList :type="SpaceType.VOIP" :diskspaces="voipspace" :open="isActiveType(SpaceType.VOIP)" />
      <DirectSpaceList :type="SpaceType.H010" :diskspaces="h010space" :open="isActiveType(SpaceType.H010)" />
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
import { SpaceType } from '@/data/mock';
import { IDiskspace } from '@/data/interfaces';
import DirectToolbar from '@/components/diskspaces/DirectToolbar.vue';
import DirectSpaceList from '@/components/diskspaces/DirectDiskspaceList.vue';

const props = defineProps({
  diskspaces: {
    type: Array as PropType<IDiskspace[]>,
    default: [],
  },
});

const textspace = computed(() => diskspaces.value.filter((x) => x.type === SpaceType.TEXT));
const voipspace = computed(() => diskspaces.value.filter((x) => x.type === SpaceType.VOIP));
const h010space = computed(() => diskspaces.value.filter((x) => x.type === SpaceType.H010));

const route = useRoute();

function isActiveType(listType: SpaceType) {
  const activeDiskspace = diskspaces.value.find((x) => x.id === route.params.diskspace_id);
  return activeDiskspace?.type === listType;
}

const { diskspaces } = toRefs(props);
</script>
