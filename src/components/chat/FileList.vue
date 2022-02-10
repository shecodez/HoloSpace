<template>
  <ul class="mx-2 md:mx-6">
    <li v-if="!files.length" class="flex flex-col gap-2 items-center align-center py-8">
      <h2 class="text-5xl font-bold">No files yet. Add something.</h2>
      <button class="btn btn-accent">Upload</button>
    </li>
    <!-- <li class="text-center p-2">Comms Start</li> -->
    <template v-for="file in files" :key="file.id">
      <li class="mx-6 md:mx-16">
        <div class="divider md:mx-2">{{ file.name }}</div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import { IFile } from '@/data/interfaces';

const props = defineProps({
  files: {
    type: Array as PropType<IFile[]>,
    default: [],
  },
});
//const { files } = toRefs(props);
</script>
