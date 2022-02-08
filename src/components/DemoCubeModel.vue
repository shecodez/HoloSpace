<template>
  <div v-if="state.error" class="alert alert-error rounded my-2">
    <div class="flex-1 flex gap-2 justify-start">
      <Icon icon="carbon:error" width="24" />
      <label>{{ state.error }}</label>
    </div>
  </div>
  <canvas ref="canvas" :style="{ width: `${width}px`, height: `${height}px` }" />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';
import * as pc from 'playcanvas';

const props = defineProps({
  width: Number,
  height: Number,
});

const { width, height } = toRefs(props);

const canvas = ref();
const app = ref();
const state = reactive({
  error: '',
});

onMounted(() => {
  try {
    app.value = new pc.Application(canvas.value);
  } catch (e) {
    if (e instanceof pc.UnsupportedBrowserError) {
      state.error = 'This page requires a browser that supports WebGL. More information here: http://get.webgl.org';
    } else if (e instanceof pc.ContextCreationError) {
      state.error = 'Your computer may not support WebGL. Troubleshoot here: http://get.webgl.org/troubleshooting/';
    } else {
      state.error = `Could not initialize application. Error: ${e}`;
    }
  }

  app.value.setCanvasResolution(pc.RESOLUTION_AUTO);

  // create box entity
  const box = new pc.Entity('cube');
  box.addComponent('model', { type: 'box' });
  app.value.root.addChild(box);

  // create camera entity
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', {
    clearColor: new pc.Color(0.1, 0.1, 0.1),
  });
  app.value.root.addChild(camera);
  camera.setPosition(0, 0, 3);

  // create directional light entity
  const light = new pc.Entity('light');
  light.addComponent('light');
  app.value.root.addChild(light);
  light.setEulerAngles(45, 0, 0);

  // rotate the box according to the delta time since the last frame
  app.value.on('update', (dt: number) => box.rotate(10 * dt, 20 * dt, 30 * dt));

  app.value.start();
});
</script>
