<template>
  <Panel css="w-0 bg-base-100 bg-opacity-80">
    <template #header>
      <SpaceToolbar :space="space" :collapsed="collapsed" @toggleCollapsed="emitToggleCollapsed" />
    </template>

    <div ref="canvasarea" v-if="state.isReadyToJoin" class="relative block w-full h-full">
      <H010space :width="width" :height="height" />
    </div>
    <StarfieldBackground v-else>
      <h1 class="mb-4">
        Welcome to {{ me.name }}'s <span class="underline">{{ space.name }}</span>
      </h1>
      <button @click="state.isReadyToJoin = true" class="btn btn-primary">Join</button>
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

<style scoped lang="scss">
// credit: https://codepen.io/saransh/pen/BKJun

@function multiple-box-shadow($numOfStars) {
  $value: '#{random(2000)}px #{random(2000)}px #FFF';
  @for $i from 2 through $numOfStars {
    $value: '#{$value}, #{random(2000)}px #{random(2000)}px #FFF';
  }
  @return unquote($value);
}

$shadows-small: multiple-box-shadow(700);
$shadows-medium: multiple-box-shadow(200);
$shadows-large: multiple-box-shadow(100);

.space-bg {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;

  .some-stars {
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: $shadows-medium;
    animation: parallaxStar 100s linear infinite;

    &:after {
      content: ' ';
      position: absolute;
      top: 2000px;
      width: 2px;
      height: 2px;
      background: transparent;
      box-shadow: $shadows-medium;
    }
  }

  .stars {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: $shadows-small;
    animation: parallaxStar 50s linear infinite;

    &:after {
      content: ' ';
      position: absolute;
      top: 2000px;
      width: 1px;
      height: 1px;
      background: transparent;
      box-shadow: $shadows-small;
    }
  }

  .more-stars {
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: $shadows-large;
    animation: parallaxStar 150s linear infinite;

    &:after {
      content: ' ';
      position: absolute;
      top: 2000px;
      width: 3px;
      height: 3px;
      background: transparent;
      box-shadow: $shadows-large;
    }
  }

  .cta {
    text-align: center;
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
  }
}
</style>
