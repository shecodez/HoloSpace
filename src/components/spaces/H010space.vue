<template>
  <div v-if="state.error" class="alert alert-error rounded m-2">
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

import usePlayCanvas from '@/use/playcanvas';

//const { app, error, initializeApp } = usePlayCanvas();

const props = defineProps({
  width: Number,
  height: Number,
});
const { width, height } = toRefs(props);

const app = ref<pc.Application>();
const canvas = ref<HTMLCanvasElement>();
const state = reactive({
  loading: false,
  error: '',
});

const resources = [
  {
    name: 'xbot.json',
    type: 'model',
    url: '/src/assets/models/h010bot/xbot/xbot.json',
  },
  // new pc.Asset('xbot.json', 'model', {
  //   url: '/src/assets/models/h010bot/xbot/xbot.json',
  // }),
  // new pc.Asset('xbot.json', 'model', {
  //   url: '/src/assets/models/h010bot/xbot/xbot.json',
  // }),
  // new pc.Asset('ybot.json', 'model', {
  //   url: '/src/assets/models/h010bot/ybot/Y_Bot.json',
  // }),
  // new pc.Asset('idle.json', 'animation', {
  //   url: '/src/assets/models/h010bot/animations/idle.json',
  // }),
];

onMounted(() => initializeApp(canvas.value!));

function initializeApp(canvas: HTMLCanvasElement) {
  try {
    app.value = new pc.Application(canvas, {
      elementInput: new pc.ElementInput(canvas, {
        useMouse: true,
        useTouch: true,
      }),
      keyboard: new pc.Keyboard(window),
      mouse: new pc.Mouse(canvas),
      gamepads: new pc.GamePads(),
      touch: pc.platform.touch ? new pc.TouchDevice(canvas) : undefined,
    });

    app.value.start();

    // fill the available space at full resolution
    app.value.setCanvasFillMode(pc.FILLMODE_NONE); // FILLMODE_FILL_WINDOW
    app.value.setCanvasResolution(pc.RESOLUTION_AUTO);

    //loadAssets()
    createH010space(app.value);
  } catch (e) {
    if (e instanceof pc.UnsupportedBrowserError) {
      state.error = 'This page requires a browser that supports WebGL. More information here: http://get.webgl.org';
    } else if (e instanceof pc.ContextCreationError) {
      state.error = 'Your computer may not support WebGL. Troubleshoot here: http://get.webgl.org/troubleshooting/';
    } else {
      state.error = `Could not initialize application. Error: ${e}`;
    }
  }
}

function createH010space(app: pc.Application) {
  console.log('Create H010space', app);
  // create box entity
  const box = new pc.Entity('cube');
  box.addComponent('model', { type: 'box' });
  app.root.addChild(box);

  // create camera entity
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', {
    clearColor: new pc.Color(0.1, 0.1, 0.1),
  });
  app.root.addChild(camera);
  camera.setPosition(0, 0, 3);

  // create directional light entity
  const light = new pc.Entity('light');
  light.addComponent('light');
  app.root.addChild(light);
  light.setEulerAngles(45, 0, 0);

  // rotate the box according to the delta time since the last frame
  app.on('update', (dt: number) => box.rotate(10 * dt, 20 * dt, 30 * dt));
}
</script>
