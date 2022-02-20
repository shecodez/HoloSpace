<template>
  <Panel css="w-0 bg-base-100 bg-opacity-80">
    <template #header>
      <SpaceToolbar :space="space" :collapsed="collapsed" @toggleCollapsed="emitToggleCollapsed" />
    </template>

    <div ref="canvasarea" v-if="state.isReadyToJoin" class="relative block w-full h-full">
      <H010space :width="width" :height="height" :me="me" />
    </div>
    <StarfieldBackground v-else>
      <template #cta>
        <h1 class="mb-4">
          Welcome to {{ me.name }}'s <span class="font-bold">{{ space.name }}</span>
        </h1>
        <button @click="state.isReadyToJoin = true" class="btn btn-primary">Join</button>
      </template>
    </StarfieldBackground>
  </Panel>
</template>

<script setup lang="ts">
import { defineProps, PropType, reactive, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useElementSize } from '@vueuse/core';

import Panel from '@/components/DockUI/Panel.vue';
import SpaceToolbar from '@/components/spaces/SpaceToolbar.vue';
import H010space from '@/components/spaces/H010space.vue';
import { ISpace, IUser } from '@/data/interfaces';
import StarfieldBackground from '../StarfieldBackground.vue';

const props = defineProps({
  me: {
    type: Object as PropType<IUser>,
    default: {},
  },
  space: {
    type: Object as PropType<ISpace>,
    default: {},
  },
  collapsed: Boolean,
});

const canvasarea = ref();
const state = reactive({
  isReadyToJoin: true,
});
const { width, height } = useElementSize(canvasarea);

const emit = defineEmits<{
  (e: 'toggleCollapsed'): void;
}>();

function emitToggleCollapsed() {
  emit('toggleCollapsed');
}
</script>
