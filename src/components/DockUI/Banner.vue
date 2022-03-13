<template>
  <div class="bg-base-300 bg-opacity-30">
    <div class="banner ribbon-tail relative before:pr-11 before:bg-base-300 flex items-center">
      <slot>
        <div class="alert flex-1 bg-opacity-20 border-l-4 rounded-none" :class="`alert-${type} border-${type}`">
          <div class="flex-1 items-center text-white text-lg">
            <Icon v-if="icon" :icon="icon" width="24" />
            <div>
              <h3 v-if="title" class="font-bold">{{ title }}</h3>
              <div :class="title ? 'text-xs' : 'text-lg'">{{ text }}</div>
            </div>
          </div>
        </div>
      </slot>

      <button
        v-if="dismissible"
        @click="$emit('close')"
        title="Dismiss"
        class="btn btn-sm btn-circle btn-ghost absolute right-0"
      >
        <Icon icon="mdi:close-outline" width="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue';
import { Icon } from '@iconify/vue';

import { BannerType } from '@/data/interfaces';

const props = defineProps({
  icon: String,
  title: String,
  text: String,
  type: String as PropType<BannerType>,
  dismissible: Boolean,
});

const { dismissible } = toRefs(props);
</script>
