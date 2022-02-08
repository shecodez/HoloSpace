<template>
  <div v-if="state.error" class="alert alert-error rounded m-2">
    <div class="flex-1 flex gap-2 justify-start">
      <Icon icon="carbon:error" width="24" />
      <label>{{ state.error }}</label>
    </div>
  </div>
  <canvas ref="canvas" :style="{ width: `${width}px`, height: `${height}px` }" />
  <button @click="saveH010bot" title="Save" class="absolute bottom-4 right-4 z-10">
    <Icon icon="mdi:content-save" width="40" class="btn btn-ghost btn-square" />
    <h5 class="text-xs font-bold uppercase">Save</h5>
  </button>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';
import * as pc from 'playcanvas';
import { createToast, withProps } from 'mosha-vue-toastify';

import usePlayCanvas from '@/use/playcanvas';
import Toast from '@/components/DockUI/Toast.vue';

const props = defineProps({
  width: Number,
  height: Number,
});

const { width, height } = toRefs(props);

const { createPrimitiveEntity, createTextEntity } = usePlayCanvas();

const canvas = ref<HTMLCanvasElement>();
const app = ref(); // <pc.Application>
const userModel = ref<pc.Entity>();
const state = reactive({
  loading: false,
  customModelUrl: '',
  h010bot: {
    model: '',
    colors: [] as pc.Color[],
  },
  xh010botColor: [] as pc.Color[],
  yh010botColor: [] as pc.Color[],
  error: '',
});

const assets = [
  new pc.Asset('xbot.json', 'model', {
    url: '/src/assets/models/h010bot/xbot/xbot.json',
  }),
  new pc.Asset('ybot.json', 'model', {
    url: '/src/assets/models/h010bot/ybot/ybot.json',
  }),
  new pc.Asset('idle.json', 'animation', {
    url: '/src/assets/models/h010bot/animations/idle.json',
  }),
  new pc.Asset('Montserrat-Black.json', 'font', {
    url: '/src/assets/fonts/Montserrat-Black/Montserrat-Black.json',
  }),
];

function loadAppAssets() {
  assets.forEach((asset, i) => {
    state.loading = true;

    app.value.assets.add(asset);
    app.value.assets.load(asset);

    // if loaded all assets
    if (i + 1 >= assets.length) {
      state.loading = false;
    }
  });
}

// TODO: function uploadCustomModelJSON() {} return modelUrl from db

function saveH010bot() {
  state.h010bot.model === 'xbot'
    ? (state.h010bot.colors = state.xh010botColor)
    : (state.h010bot.colors = state.yh010botColor);
  // TODO: save to db
  createToast(
    withProps(Toast, {
      type: 'success',
      title: 'Save H010bot',
      text: `model: '${state.h010bot.model}' colors: [${state.h010bot.colors.toString()}]`,
    }),
    { type: 'success' },
  );
}

/**
 * create and random color h010bot entity from url in pc
 */
const loadH010botFromUrl = (name: string, url: string, genRandomColors = false) => {
  const entity = new pc.Entity(name);
  app.value.assets.loadFromUrl(url, 'model', function (err: any, asset: pc.Asset) {
    entity.addComponent('model');
    entity.model.model = asset.resource;

    if (genRandomColors) {
      if (name === 'xbot') {
        state.xh010botColor = [];
      } else if (name === 'ybot') {
        state.yh010botColor = [];
      } // clear prev colors
      // add a randomly generated material to all mesh instances
      const mis = entity.model.model.meshInstances;
      //console.log('entity mis', entity.model.model.meshInstances);
      if (mis) {
        for (let i = 0; i < mis.length; i++) {
          const color = new pc.Color(pc.math.random(0, 1), pc.math.random(0, 1), pc.math.random(0, 1));
          if (name === 'xbot') {
            state.xh010botColor.push(color);
          } else if (name === 'ybot') {
            state.yh010botColor.push(color);
          }
          mis[i].material = new pc.StandardMaterial();
          mis[i].material.diffuse = color;
          mis[i].material.update();
        }
      }
    }
  });

  return entity;
};

function createH010botModel(name: 'xbot' | 'ybot', random = false) {
  state.h010bot.model = name;
  if (userModel.value) userModel.value.destroy();
  if (name === 'xbot') {
    userModel.value = loadH010botFromUrl(name, '/src/assets/models/h010bot/xbot/xbot.json', random);
  } else if (name === 'ybot') {
    userModel.value = loadH010botFromUrl(name, '/src/assets/models/h010bot/ybot/ybot.json', random);
  }
  userModel.value?.addComponent('animation', { assets: [assets[2]], speed: 1 });
  app.value.root.addChild(userModel.value);
  //console.log(state.h010botColors);
}

function createRandomColorH010botModel(name: 'xbot' | 'ybot') {
  createH010botModel(name, true);
}

function createDefaultH010botModel() {
  createH010botModel('xbot');
}

function setColorSelected(name: string) {
  return userModel.value?.name === name ? new pc.Color(0, 1, 1) : new pc.Color(1, 1, 1);
}

onMounted(() => {
  try {
    app.value = new pc.Application(canvas.value!, {
      elementInput: new pc.ElementInput(canvas.value!, {
        useMouse: true,
        useTouch: true,
      }),
      keyboard: new pc.Keyboard(window),
      mouse: new pc.Mouse(canvas.value),
      gamepads: new pc.GamePads(),
      touch: pc.platform.touch ? new pc.TouchDevice(canvas.value!) : undefined,
    });
  } catch (e) {
    if (e instanceof pc.UnsupportedBrowserError) {
      state.error = 'This page requires a browser that supports WebGL. More information here: http://get.webgl.org';
    } else if (e instanceof pc.ContextCreationError) {
      state.error = 'Your computer may not support WebGL. Troubleshoot here: http://get.webgl.org/troubleshooting/';
    } else {
      state.error = `Could not initialize application. Error: ${e}`;
    }
  }

  // fill the available space at full resolution
  app.value.setCanvasFillMode(pc.FILLMODE_NONE); // FILLMODE_FILL_WINDOW
  app.value.setCanvasResolution(pc.RESOLUTION_AUTO);

  // ensure canvas is resized when window changes size
  // window.addEventListener("resize", () => {
  //   app.value.resizeCanvas(width?.value, height?.value);
  // });

  loadAppAssets();

  // TODO: if user.model_url createCustomUserModel(user.name, user.model_url)
  // if user.h010bot createCustomH010botModel(user.h010bot.name, user.h010bot.colors)
  // else
  createDefaultH010botModel();

  // create character platform
  const platform = createPrimitiveEntity('platform', 'cylinder', [0, -0.25, 0], [0, 0, 0], [2, 0.5, 2]);
  app.value.root.addChild(platform);

  // TODO: create 3 mirrors in background (like dressing room)

  // create camera entity
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', {
    clearColor: new pc.Color(0.1, 0.1, 0.1),
  });
  camera.setPosition(0, 1, 3);
  app.value.root.addChild(camera);

  // create directional light entity
  const light = new pc.Entity('light');
  light.addComponent('light', {
    type: 'directional',
    color: new pc.Color(1, 1, 1),
    castShadows: true,
    intensity: 1,
    shadowBias: 0.2,
    shadowDistance: 4,
    normalOffsetBias: 0.05,
    shadowResolution: 2048,
  });
  light.setEulerAngles(35, 15, 0);
  app.value.root.addChild(light);

  // create ui
  const ui = new pc.Entity('ui');
  app.value.root.addChild(ui);

  // h010bot selection menu
  const h010botMenu = new pc.Entity('h010bot select menu');
  h010botMenu.addComponent('screen', {
    resolution: new pc.Vec2(640, 480),
    screenSpace: true,
  });
  h010botMenu.screen.scaleMode = pc.SCALEMODE_BLEND;
  h010botMenu.screen.referenceResolution = new pc.Vec2(1280, 720);

  const xBotBtn = createTextEntity('xbot button', 'xbot', assets[3], true, 32, setColorSelected('xbot'));
  xBotBtn.setLocalPosition(-150, 0, 0);
  h010botMenu.addChild(xBotBtn);

  const yBotBtn = createTextEntity('ybot button', 'ybot', assets[3], true, 32, setColorSelected('ybot'));
  yBotBtn.setLocalPosition(150, 0, 0);
  h010botMenu.addChild(yBotBtn);

  const xBotRandomBtn = createTextEntity('random xbot button', 'random', assets[3], true);
  xBotRandomBtn.setLocalPosition(-150, -50, 0);
  h010botMenu.addChild(xBotRandomBtn);

  const yBotRandomBtn = createTextEntity('random ybot button', 'random', assets[3], true);
  yBotRandomBtn.setLocalPosition(150, -50, 0);
  h010botMenu.addChild(yBotRandomBtn);

  h010botMenu.enabled = true; // TODO: if not custom user model
  ui.addChild(h010botMenu);

  // create menu script
  const script = pc.createScript('h010botSelectScript');
  script!.prototype.initialize = function () {
    app.value.root.findByName('xbot button').element.on('click', () => {
      createH010botModel('xbot');
      app.value.root.findByName('xbot button').element.color = new pc.Color(0, 1, 1);
      app.value.root.findByName('ybot button').element.color = new pc.Color(1, 1, 1);
    });
    app.value.root.findByName('ybot button').element.on('click', () => {
      createH010botModel('ybot');
      app.value.root.findByName('ybot button').element.color = new pc.Color(0, 1, 1);
      app.value.root.findByName('xbot button').element.color = new pc.Color(1, 1, 1);
    });

    app.value.root.findByName('random xbot button').element.on('click', () => {
      createRandomColorH010botModel('xbot');
      app.value.root.findByName('xbot button').element.color = new pc.Color(0, 1, 1);
      app.value.root.findByName('ybot button').element.color = new pc.Color(1, 1, 1);
    });
    app.value.root.findByName('random ybot button').element.on('click', () => {
      createRandomColorH010botModel('ybot');
      app.value.root.findByName('ybot button').element.color = new pc.Color(0, 1, 1);
      app.value.root.findByName('xbot button').element.color = new pc.Color(1, 1, 1);
    });
  };
  ui.addComponent('script');
  ui.script.create('h010botSelectScript');

  // TODO: h010bot color selection menu

  app.value.start();
});
</script>
