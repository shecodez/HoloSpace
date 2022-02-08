<template>
  <div class="navbar bg-base-100">
    <div class="flex-1 px-2 mx-2 overflow-hidden">
      <span class="text-lg font-bold truncate" title="Direct Space">Direct</span>
    </div>
    <div class="flex-none">
      <button class="btn btn-square btn-ghost" title="Filter">
        <Icon icon="mdi:filter-variant" width="24" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import { IDiskspace } from '@/data/interfaces';

const props = defineProps({
  diskspaces: {
    type: Object as PropType<IDiskspace[]>,
    default: {},
  },
});

const { diskspaces } = toRefs(props);
</script>
