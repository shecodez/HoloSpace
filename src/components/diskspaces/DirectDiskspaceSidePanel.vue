<template>
  <Panel css="bg-base-200 bg-opacity-70">
    <template #header>
      <DirectToolbar :diskspaces="diskspaces" />
    </template>

    <div class="overflow-y-auto overflow-x-hidden">
      <DirectSpaceList
        :type="DiskspaceType.TEXT"
        :diskspaces="textDiskspaces"
        :open="isActiveType(DiskspaceType.TEXT)"
      />
      <DirectSpaceList
        :type="DiskspaceType.VOIP"
        :diskspaces="voipDiskspaces"
        :open="isActiveType(DiskspaceType.VOIP)"
      />
      <DirectSpaceList
        :type="DiskspaceType.H010"
        :diskspaces="h010Diskspaces"
        :open="isActiveType(DiskspaceType.H010)"
      />
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
import { DiskspaceType } from '@/data/mock';
import { IDiskspace } from '@/data/interfaces';
import DirectToolbar from '@/components/diskspaces/DirectToolbar.vue';
import DirectSpaceList from '@/components/diskspaces/DirectDiskspaceList.vue';

const props = defineProps({
  diskspaces: {
    type: Array as PropType<IDiskspace[]>,
    default: [],
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

const { diskspaces } = toRefs(props);
</script>
