<template>
  <Banner v-if="show" dismissible>
    <div class="alert alert-info flex-1 border-l-4 border-info rounded-none">
      <div class="flex-1 items-center">
        <Icon icon="vs:party" width="24" />
        <label class="mx-3">Welcome to the <span class="font-brand">H010SPACE</span> Beta!</label>
      </div>
      <div class="flex-none">
        <button @click="$emit('close')" class="btn btn-sm btn-ghost mr-8">Got it!</button>
      </div>
    </div>
  </Banner>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { defineProps, toRefs } from 'vue';

import Banner from '@/components/DockUI/Banner.vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const { show } = toRefs(props);
</script>
