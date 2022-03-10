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

const assetsToLoad = [
  new pc.Asset('xbot.json', 'model', {
    url: '/src/assets/models/h010bot/xbot/xbot.json',
  }),
  new pc.Asset('ybot.json', 'model', {
    url: '/src/assets/models/h010bot/ybot/ybot.json',
  }),
  new pc.Asset('idle', 'animation', {
    url: '/src/assets/animations/glb/Idle.glb',
  }),
  new pc.Asset('Montserrat-Black.json', 'font', {
    url: '/src/assets/fonts/Montserrat-Black/Montserrat-Black.json',
  }),
];

const assets = ref({
  models: {
    xbot: assetsToLoad[0],
    ybot: assetsToLoad[1],
  },
  animations: {
    idle: assetsToLoad[2],
  },
  fonts: {
    montserratBlack: assetsToLoad[3],
  },
});

onMounted(() => createApp(canvas.value!));

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

const loadAssets = (app: pc.Application) => {
  var count = 0;
  app.assets.on('load', function () {
    count++;
    if (count === assetsToLoad.length) {
      onLoadComplete(app);
    }
  });

  for (var i = 0; i < assetsToLoad.length; i++) {
    app.assets.add(assetsToLoad[i]);
    app.assets.load(assetsToLoad[i]);
  }
};

// called when all assets are loaded
const onLoadComplete = (app: pc.Application) => {
  // create the entities
  createUserModelScene(app);
};

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
  userModel.value?.addComponent('animation', { assets: [assets.value.animations.idle], speed: 1 });
  app.value.root.addChild(userModel.value);
}

function createApp(canvas: HTMLCanvasElement) {
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

    // fill the available space at full resolution
    app.value.setCanvasFillMode(pc.FILLMODE_NONE); // FILLMODE_FILL_WINDOW
    app.value.setCanvasResolution(pc.RESOLUTION_AUTO);

    // ensure canvas is resized when window changes size
    // window.addEventListener("resize", () => {
    //   app.value.resizeCanvas(width?.value, height?.value);
    // });
    app.value.start();

    loadAssets(app.value);
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

const createUserModelScene = (app: pc.Application) => {
  // create camera entity
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', {
    clearColor: new pc.Color(0.1, 0.1, 0.1),
  });
  camera.setPosition(0, 1, 3);
  app.root.addChild(camera);

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
  app.root.addChild(light);

  // create character platform
  const platform = createPrimitiveEntity('platform', 'cylinder', [0, -0.25, 0], [0, 0, 0], [2, 0.5, 2]);
  app.root.addChild(platform);

  // TODO: create 3 mirrors in background (like dressing room)

  createH010botModel('xbot');

  // create ui
  const ui = createSelectionMenu();
  app.root.addChild(ui);
};

const createSelectionMenu = () => {
  const fontAsset = assets.value.fonts.montserratBlack;

  const ui = new pc.Entity('ui');

  const h010botMenu = new pc.Entity('h010bot select menu');
  h010botMenu.addComponent('screen', {
    resolution: new pc.Vec2(640, 480),
    screenSpace: true,
  });
  h010botMenu.screen.scaleMode = pc.SCALEMODE_BLEND;
  h010botMenu.screen.referenceResolution = new pc.Vec2(1280, 720);

  const xBotBtn = createTextEntity('xbot button', 'xbot', fontAsset, true, 32);
  xBotBtn.addComponent('button', { imageIntity: 'xbtn' });
  xBotBtn.setLocalPosition(-150, 0, 0);
  h010botMenu.addChild(xBotBtn);

  const yBotBtn = createTextEntity('ybot button', 'ybot', fontAsset, true, 32);
  yBotBtn.addComponent('button', { imageIntity: 'ybtn' });
  yBotBtn.setLocalPosition(150, 0, 0);
  h010botMenu.addChild(yBotBtn);

  const xBotRandBtn = createTextEntity('random xbot button', 'random', fontAsset, true);
  xBotRandBtn.addComponent('button', { imageIntity: 'xRandbtn' });
  xBotRandBtn.setLocalPosition(-150, -50, 0);
  h010botMenu.addChild(xBotRandBtn);

  const yBotRandBtn = createTextEntity('random ybot button', 'random', fontAsset, true);
  yBotRandBtn.addComponent('button', { imageIntity: 'yRandbtn' });
  yBotRandBtn.setLocalPosition(150, -50, 0);
  h010botMenu.addChild(yBotRandBtn);

  h010botMenu.enabled = true;
  ui.addChild(h010botMenu);

  // create menu script
  createCharacterCreatorScript(xBotBtn, yBotBtn, xBotRandBtn, yBotRandBtn);
  ui.addComponent('script');
  ui.script.create('CharacterCreator');

  return ui;
};

const createCharacterCreatorScript = (xBtn: pc.Entity, yBtn: pc.Entity, xRandBtn: pc.Entity, yRandBtn: pc.Entity) => {
  const script = pc.createScript('CharacterCreator');

  const selectedColor = pc.Color.CYAN;
  const defaultColor = pc.Color.WHITE;

  script!.prototype.initialize = function () {
    xBtn.element.color = selectedColor; // default selected btn

    xBtn.button.on('click', function (e) {
      createH010botModel('xbot');
      xBtn.element.color = selectedColor;
      yBtn.element.color = defaultColor;
    });
    yBtn.button.on('click', function (e) {
      createH010botModel('ybot');
      yBtn.element.color = selectedColor;
      xBtn.element.color = defaultColor;
    });

    xRandBtn.button.on('click', function (e) {
      createH010botModel('xbot', true);
      xBtn.element.color = selectedColor;
      yBtn.element.color = defaultColor;
    });
    yRandBtn.button.on('click', function (e) {
      createH010botModel('ybot', true);
      yBtn.element.color = selectedColor;
      xBtn.element.color = defaultColor;
    });
  };
};
</script>
