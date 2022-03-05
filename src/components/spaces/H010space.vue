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
import { onMounted, onUnmounted, PropType, reactive, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';
import * as pc from 'playcanvas';
import { debounce } from 'lodash';

import usePlayCanvas from '@/use/playcanvas';
import { IClient, IVec3, IUser } from '@/data/interfaces';

const { worldToScreenSpace } = usePlayCanvas();
const route = useRoute();

const props = defineProps({
  width: Number,
  height: Number,
  me: {
    type: Object as PropType<IUser>,
    default: {},
  },
});
const { width, height, me } = toRefs(props);

const app = ref<pc.Application>();
const canvas = ref<HTMLCanvasElement>();
const state = reactive({
  loading: false,
  error: '',
  // scene: 'Lobby' | 'H010SPACE'
  ws: {} as WebSocket,
  clientId: '',
  joinedSpace: false,
});

const assetsToLoad = [
  new pc.Asset('xbot.json', 'model', {
    url: '/src/assets/models/h010bot/xbot/xbot.json',
  }),
  new pc.Asset('ybot.json', 'model', {
    url: '/src/assets/models/h010bot/ybot/Y_Bot.json',
  }),
  new pc.Asset('idle', 'animation', {
    url: '/src/assets/animations/glb/Idle.glb',
  }),
  new pc.Asset('jump', 'animation', {
    url: '/src/assets/animations/glb/Jump.glb',
  }),
  new pc.Asset('JogBackward', 'animation', {
    url: '/src/assets/animations/glb/jog/JogBackward.glb',
  }),
  new pc.Asset('JogBackwardDiagonalLeft', 'animation', {
    url: '/src/assets/animations/glb/jog/JogBackwardDiagonalLeft.glb',
  }),
  new pc.Asset('JogBackwardDiagonalRight', 'animation', {
    url: '/src/assets/animations/glb/jog/JogBackwardDiagonalRight.glb',
  }),
  new pc.Asset('JogForward', 'animation', {
    url: '/src/assets/animations/glb/jog/JogForward.glb',
  }),
  new pc.Asset('JogForwardDiagonalLeft', 'animation', {
    url: '/src/assets/animations/glb/jog/JogForwardDiagonalLeft.glb',
  }),
  new pc.Asset('JogForwardDiagonalRight', 'animation', {
    url: '/src/assets/animations/glb/jog/JogForwardDiagonalRight.glb',
  }),
  new pc.Asset('JogStrafeLeft', 'animation', {
    url: '/src/assets/animations/glb/jog/JogStrafeLeft.glb',
  }),
  new pc.Asset('JogStrafeRight', 'animation', {
    url: '/src/assets/animations/glb/jog/JogStrafeRight.glb',
  }),
  new pc.Asset('LeftTurn', 'animation', {
    url: '/src/assets/animations/glb/LeftTurn.glb',
  }),
  new pc.Asset('RightTurn', 'animation', {
    url: '/src/assets/animations/glb/RightTurn.glb',
  }),
  new pc.Asset('Montserrat-Black.json', 'font', {
    url: '/src/assets/fonts/Montserrat-Black/Montserrat-Black.json',
  }),
  new pc.Asset('checkboard.png', 'texture', {
    url: '/src/assets/textures/checkboard.png',
  }),
];

const assets = ref({
  models: {
    xbot: assetsToLoad[0],
    ybot: assetsToLoad[1],
  },
  animations: {
    Idle: assetsToLoad[2],
    Jump: assetsToLoad[3],
    JogBackward: assetsToLoad[4],
    JogBackwardDiagonalLeft: assetsToLoad[5],
    JogBackwardDiagonalRight: assetsToLoad[6],
    JogForward: assetsToLoad[7],
    JogForwardDiagonalLeft: assetsToLoad[8],
    JogForwardDiagonalRight: assetsToLoad[9],
    JogStrafeLeft: assetsToLoad[10],
    JogStrafeRight: assetsToLoad[11],
    LeftTurn: assetsToLoad[12],
    RightTurn: assetsToLoad[13],
  },
  fonts: {
    montserratBlack: assetsToLoad[14],
  },
  textures: {
    checkboard: assetsToLoad[15],
  },
});

// TODO: est connection to server (ws) then createApp() else display 500 server err
onMounted(() => loadAmmo().then(() => createApp(canvas.value!)));

onUnmounted(() => {
  state.ws.send(JSON.stringify({ method: 'exit:h010space', id: state.clientId }));
  state.joinedSpace = false;
  // state.scene = 'Lobby'
});

// check for wasm module support
function wasmSupported() {
  try {
    if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
      const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
      if (module instanceof WebAssembly.Module) return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
    }
  } catch (e: any) {
    state.error = `WASM support error: ${e}`;
  }
  return false;
}

// load a script
function loadScriptAsync(url: string, moduleName: string, doneCallback: Function) {
  const checkScript = document.getElementById(moduleName);
  if (checkScript === null) {
    const tag = document.createElement('script');
    tag.setAttribute('id', moduleName);
    tag.onload = function () {
      doneCallback();
    };
    tag.onerror = function () {
      throw new Error(`failed to load ${url}`);
    };
    tag.async = true;
    tag.src = url;
    document.head.appendChild(tag);
  } else {
    checkScript.onload = function () {
      doneCallback();
    };
  }
}

// load and initialize a wasm module
function loadWasmModuleAsync(moduleName: any, jsUrl: string, binaryUrl: string, doneCallback: Function) {
  const checkModule = window[moduleName];
  if (checkModule === undefined) {
    loadScriptAsync(jsUrl, moduleName, () => {
      const lib = window[moduleName] as any;
      (window as any)[`${moduleName}Lib`] = lib;
      lib({
        locateFile() {
          return binaryUrl;
        },
      }).then((instance: any) => {
        window[moduleName] = instance;
        doneCallback();
      });
    });
  } else {
    doneCallback();
  }
}

const loadAmmo = () =>
  new Promise((resolve: Function) => {
    if (wasmSupported()) {
      loadWasmModuleAsync('Ammo', '/src/assets/lib/ammo.wasm.js', '/src/assets/lib/ammo.wasm.wasm', () => {
        resolve();
      });
    } else {
      loadWasmModuleAsync('Ammo', '/src/assets/lib/ammo.js', '', () => {
        resolve();
      });
    }
  });

function createApp(canvas: HTMLCanvasElement) {
  try {
    app.value = new pc.Application(canvas, {
      elementInput: new pc.ElementInput(canvas),
      gamepads: new pc.GamePads(),
      keyboard: new pc.Keyboard(window),
      mouse: new pc.Mouse(canvas),
      touch: pc.platform.touch ? new pc.TouchDevice(canvas) : undefined,
    });

    // fill the available space at full resolution
    app.value.setCanvasFillMode(pc.FILLMODE_NONE); // FILLMODE_FILL_WINDOW
    app.value.setCanvasResolution(pc.RESOLUTION_AUTO);

    // use device pixel ratio
    app.value.graphicsDevice.maxPixelRatio = window.devicePixelRatio;

    // start the update loop
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

function loadAssets(app: pc.Application) {
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
}

// called when all assets are loaded
function onLoadComplete(app: pc.Application) {
  // create the entities
  createH010space(app);

  // show main menu
  // showH010spaceLobby();
}

function createH010space(app: pc.Application) {
  // set up some general scene rendering properties
  app.scene.toneMapping = pc.TONEMAP_ACES;

  // Create an Entity with a camera component
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', {
    clearColor: new pc.Color(30, 30, 30),
  });
  // app.root.addChild(camera);

  // Create an entity with a light component
  const light = new pc.Entity();
  light.addComponent('light', {
    type: 'directional',
    color: new pc.Color(1, 1, 1),
    castShadows: true,
    shadowResolution: 2048,
    shadowDistance: 30,
    shadowType: pc.SHADOW_PCF3,
    normalOffsetBias: 0.5,
  });
  light.translateLocal(0, 20, 0);
  light.setLocalEulerAngles(-45, 0, -45);
  app.root.addChild(light);

  const environment = createEnvironment(app);
  app.root.addChild(environment);

  // Create a 2D screen
  const screen = new pc.Entity();
  screen.setLocalScale(0.01, 0.01, 0.01);
  screen.addComponent('screen', {
    referenceResolution: new pc.Vec2(1280, 720),
    screenSpace: true,
  });
  app.root.addChild(screen);

  createCharacterModel(app, screen, camera, `${me.value.name}#${me.value.pin}`);
}

function createCharacterModel(app: pc.Application, screen: pc.Entity, camera: pc.Entity, h010tag: string) {
  // Create an Entity to represent the user in the h010space (3d world)
  const character = new pc.Entity();
  character.translateLocal(0, 1.5, 0);
  // add rigidbody
  character.addComponent('rigidbody', {
    type: pc.BODYTYPE_DYNAMIC,
    mass: 50,
    linearDamping: 0.99,
    angularDamping: 1,
    linearFactor: pc.Vec3.ONE,
    angularFactor: pc.Vec3.ZERO,
    friction: 0.75,
    restitution: 0.5,
  });
  // add collision
  character.addComponent('collision', {
    type: 'capsule',
    radius: 0.35,
    height: 2,
    axis: 1, // x:0 y:1 z:2
  });

  const characterModel = loadH010botFromUrl(
    app,
    `${me.value.name}#${me.value.pin}`,
    me.value.modelURL || '/src/assets/models/h010bot/xbot/xbot.json',
  );
  characterModel.translateLocal(0, -1, 0);
  characterModel.setLocalEulerAngles(0, 180, 0);
  character.addChild(characterModel);

  const cameraAxis = new pc.Entity('Camera Axis');
  cameraAxis.translateLocal(0, 0.5, 0);
  createCameraController(app, cameraAxis);
  camera.addComponent('script');
  camera.script.create('CameraController');
  const raycastEndPoint = new pc.Entity('RaycastEndPoint');
  raycastEndPoint.translateLocal(0, 0, 4.3);
  cameraAxis.addChild(camera);
  cameraAxis.addChild(raycastEndPoint);
  character.addChild(cameraAxis);

  createCharacterController(app, camera, character);
  character.addComponent('script');
  character.script.create('CharacterController');
  characterAnimController(app, character, characterModel);

  const networkManager = new pc.Entity('Network Manager');
  state.ws = new WebSocket(`${import.meta.env.VITE_WS_URL}`); // TODO: is this the best place for this line?
  const networkClient = {
    space_id: route.params.space_id,
    h010tag: `${me.value.name}#${me.value.pin}`,
    modelURL: me.value.modelURL,
    model: character,
  } as IClient;
  createNetworkManager(app, state.ws, networkClient, screen, camera);
  networkManager.addComponent('script');
  networkManager.script.create('NetworkManager');
  app.root.addChild(networkManager);

  app.root.addChild(character);

  // Create a text element that will hover the character's head
  // createH010tagBillboard(app, `${me.value.name}#${me.value.pin}`, character, camera, screen);
  const characterInfo = new pc.Entity(`${me.value.name}#${me.value.pin}`);
  characterInfo.addComponent('element', {
    pivot: new pc.Vec2(0.5, 0),
    anchor: new pc.Vec4(0, 0, 0, 0),
    width: 150,
    height: 50,
    opacity: 0, // 0.05,
    type: pc.ELEMENTTYPE_IMAGE,
  });
  screen.addChild(characterInfo);

  const name = new pc.Entity();
  name.addComponent('element', {
    pivot: new pc.Vec2(0.5, 0.5),
    anchor: new pc.Vec4(0, 1, 1, 1),
    margin: new pc.Vec4(0, 0, 0, 0),
    fontAsset: assets.value.fonts.montserratBlack.id,
    fontSize: 16,
    text: h010tag.split('#')[0],
    useInput: true,
    type: pc.ELEMENTTYPE_TEXT,
  });
  name.addComponent('button', {
    imageEntity: name,
  });
  name.button.on('click', function (e) {
    // const color = new pc.Color(Math.random(), Math.random(), Math.random());
    // name.element.color = color;
    // character.render.material.setParameter('material_diffuse', [color.r, color.g, color.b]);
    name.element.text = name.element.text.includes('#') ? name.element.text.split('#')[0] : h010tag;
  });
  characterInfo.addChild(name);

  // update the character text's position to always hover the character
  app.on('update', function () {
    // get the desired world position
    const worldPosition = character.getPosition();
    worldPosition.y += 0.6; // slightly above the character's head

    // convert to screen position
    const screenPosition = worldToScreenSpace(app, worldPosition, camera.camera, screen.screen);

    if (screenPosition.z > 0) {
      // if world position is in front of the camera, show it
      characterInfo.enabled = true;

      // set the UI position
      characterInfo.setLocalPosition(screenPosition);
    } else {
      // if world position is actually *behind* the camera, hide the UI
      characterInfo.enabled = false;
    }
  });

  return character;
}

const createH010tagBillboard = (
  app: pc.Application,
  h010tag: string,
  character: pc.Entity,
  camera: pc.Entity,
  screen: pc.Entity,
) => {
  // Create a text element that will hover the character's head
  const characterInfo = new pc.Entity(h010tag);
  characterInfo.addComponent('element', {
    pivot: new pc.Vec2(0.5, 0),
    anchor: new pc.Vec4(0, 0, 0, 0),
    width: 150,
    height: 50,
    opacity: 0, // 0.05,
    type: pc.ELEMENTTYPE_IMAGE,
  });
  screen.addChild(characterInfo);

  const name = new pc.Entity();
  name.addComponent('element', {
    pivot: new pc.Vec2(0.5, 0.5),
    anchor: new pc.Vec4(0, 1, 1, 1),
    margin: new pc.Vec4(0, 0, 0, 0),
    fontAsset: assets.value.fonts.montserratBlack.id,
    fontSize: 16,
    text: h010tag.split('#')[0],
    useInput: true,
    type: pc.ELEMENTTYPE_TEXT,
  });
  name.addComponent('button', {
    imageEntity: name,
  });
  name.button.on('click', function (e) {
    // const color = new pc.Color(Math.random(), Math.random(), Math.random());
    // name.element.color = color;
    // character.render.material.setParameter('material_diffuse', [color.r, color.g, color.b]);
    name.element.text = name.element.text.includes('#') ? name.element.text.split('#')[0] : h010tag;
  });
  characterInfo.addChild(name);

  // update the character text's position to always hover the character
  app.on('update', function () {
    // get the desired world position
    const worldPosition = character.getPosition();
    worldPosition.y += 1.6; // slightly above the character's head

    // convert to screen position
    const screenPosition = worldToScreenSpace(app, worldPosition, camera.camera, screen.screen);

    if (screenPosition.z > 0) {
      // if world position is in front of the camera, show it
      characterInfo.enabled = true;

      // set the UI position
      characterInfo.setLocalPosition(screenPosition);
    } else {
      // if world position is actually *behind* the camera, hide the UI
      characterInfo.enabled = false;
    }
  });
};

const loadH010botFromUrl = (app: pc.Application, name: string, url: string, colors?: pc.Color[]) => {
  const h010bot = new pc.Entity(name);
  app.assets.loadFromUrl(url, 'model', function (err: any, asset: pc.Asset | any) {
    h010bot.addComponent('model', { castShadows: true });
    h010bot.model.model = asset.resource;

    const mis = h010bot.model.model.meshInstances;
    if (mis) {
      mis.map((mi, i) => {
        // if colors[] not provided add a randomly generated material to mesh instances
        const color =
          colors && colors[i] !== undefined ? colors[i] : new pc.Color(Math.random(), Math.random(), Math.random());

        mi.material = new pc.StandardMaterial();
        mi.material.diffuse = color;
        mi.material.update();
      });
    }
  });

  return h010bot;
};

const loadModelFromUrl = (app: pc.Application, name: string, url: string) => {
  const entity = new pc.Entity(name);
  entity.addComponent('model', {
    type: 'asset',
    asset: assets.value.models.xbot,
    castShadows: true,
  });

  // if (url) {
  //   app.assets.loadFromUrl(url, 'model', function (err: any, asset: pc.Asset | any) {
  //     entity.addComponent('model');
  //     entity.model.model = assets.value.models.xbot.resource; //asset.resource;

  //     // const mis = entity.model.model.meshInstances;
  //     // if (mis && materials) {
  //     //   mis.map((mi, i) => {
  //     //     mi.material = materials[i];
  //     //     mi.material.update();
  //     //   });
  //     // }
  //   });
  // } else {
  //   entity.addComponent('model', {
  //     type: 'asset',
  //     asset: assets.value.models.xbot,
  //     castShadows: true,
  //   });
  // }

  return entity;
};

const createCameraController = (app: pc.Application, cameraAxis: pc.Entity) => {
  const script = pc.createScript('CameraController');

  const mouseSpeed = 1.4; // mouse sensitivity
  let euler = new pc.Vec3();
  let rayEnd: pc.GraphNode | null;

  // @ts-ignore engine-tsd
  script.prototype.getEuler = function () {
    return euler;
  };

  script!.prototype.initialize = function () {
    app.mouse.on('mousemove', onMouseMove, this);
    app.mouse.on('mousedown', onMouseDown, this);

    rayEnd = app.root.findByName('RaycastEndPoint');

    this.on(
      'destroy',
      function () {
        app.mouse.off('mousemove', onMouseMove);
        app.mouse.off('mousedown', onMouseDown);
      },
      this,
    );
  };

  function onMouseMove(e: any) {
    if (pc.Mouse.isPointerLocked() || e.buttons[0]) {
      euler.x -= ((mouseSpeed * e.dx) / 60) % 360;
      euler.y += ((mouseSpeed * e.dy) / 60) % 360;

      if (euler.x < 0) euler.x += 360; // yaw
      if (euler.y < 0) euler.y += 360; // pitch
    }
  }

  function onMouseDown(e: any) {
    app.mouse.enablePointerLock();
  }

  // function onMouseWheel(e: any) {
  //   const distanceSensitivity = 0.15;
  //   camera.camera.fov -= e.wheel * distanceSensitivity * (Camera.distance * 0.1);
  // }

  function getWorldPoint() {
    const from = cameraAxis.getPosition();
    const to = rayEnd?.getPosition();

    const hit = app.systems.rigidbody.raycastFirst(from, to as pc.Vec3);

    return hit ? hit.point : to;
  }

  script!.prototype.postUpdate = function (dt) {
    let originEntity = cameraAxis;

    const targetY = euler.x + 180;
    const targetX = euler.y;

    const targetAng = new pc.Vec3(-targetX, targetY, 0);

    originEntity.setEulerAngles(targetAng);

    this.entity.setPosition(getWorldPoint() as pc.Vec3);
    this.entity.lookAt(originEntity.getPosition());
  };
};

const createCharacterController = (app: pc.Application, camera: pc.Entity, character: pc.Entity) => {
  const script = pc.createScript('CharacterController');

  const moveSpeed = 0.07;
  const turnSpeed = 300;

  let anim = speedForState('Jog');
  const keyboard = new pc.Keyboard(document.body); // limit to canvas?

  let isOnGround = true;
  let isJumping = false;
  let groundCheckRay = new pc.Vec3(0, -4.2, 0);
  let rayEnd = new pc.Vec3();
  let groundNormal = new pc.Vec3();

  //@ts-ignore
  const cameraScript = camera.script.CameraController;

  enum Perspective {
    FirstPerson = 'FirstPerson',
    ThirdPerson = 'ThirdPerson',
  }
  let pov = Perspective.ThirdPerson;

  // initialize code called once per entity
  script!.prototype.initialize = function () {
    if (camera) {
      changeCameraToTp(camera);
    }

    // Check for required components
    if (!character.collision) {
      state.error = "CharacterController script needs to have a 'collision' component";
    }
    if (!character.rigidbody || character.rigidbody.type !== pc.BODYTYPE_DYNAMIC) {
      state.error = "CharacterController script needs to have a DYNAMIC 'rigidbody' component";
    }

    // Disabling the context menu stops the browser displaying a menu when
    // you right-click the page
    app.mouse.disableContextMenu();
  };

  function togglePerspective() {
    pov = pov === Perspective.FirstPerson ? Perspective.ThirdPerson : Perspective.FirstPerson;
  }

  function changeCameraToTp(camera: pc.Entity) {
    camera.translateLocal(0, 0, 4.3);

    camera.camera.fov = 45;
    camera.camera.nearClip = 0.1;
    camera.camera.farClip = 100;
  }

  function createFpCamera() {
    const fpcamera = new pc.Entity('fpcamera');
    fpcamera.addComponent('camera', {
      farClip: 100,
      fov: 65,
      nearClip: 0.1,
    });
    character.addChild(fpcamera);
    fpcamera.translateLocal(0, 1, 0);

    return fpcamera;
  }

  // defines how many units the character should move per second given its current animation state
  function speedForState(state: any) {
    switch (state) {
      case 'Walk':
        return 1.0;
      case 'Jog':
        return 4.0;
      case 'Jump':
      case 'Idle':
      default:
        return 0.0;
    }
  }

  function checkIfOnGround() {
    const pos = character.getPosition();
    rayEnd.add2(pos, groundCheckRay);

    // Fire a ray straight down to just below the bottom of the rigid body,
    // if it hits something then the character is standing on something.
    const result = app.systems.rigidbody.raycastFirst(pos, rayEnd);
    isOnGround = !!result;
    if (result) {
      groundNormal.copy(result.normal);
    }
  }

  // Temp variable to avoid garbarge colleciton
  let worldDirection = new pc.Vec3();
  let tempDirection = new pc.Vec3();

  // update code called every frame
  script!.prototype.update = function (dt) {
    // if (!character.anim.getInteger('speed')) return; // throw err?

    let _worldDirection = worldDirection.set(0, 0, 0);
    let _tempDirection = tempDirection;

    // Get camera directions to determine movement directions
    const forward = this.entity.forward; //camera.forward;
    const right = this.entity.right; //camera.right;

    // movement
    let x = 0;
    let z = 0;

    if (keyboard.isPressed(pc.KEY_J)) {
      anim = anim > 1 ? speedForState('Walk') : speedForState('Jog');
    }

    // if (keyboard.isPressed(pc.KEY_V)) {
    //   togglePerspective();
    // }

    if (keyboard.isPressed(pc.KEY_W) || keyboard.isPressed(pc.KEY_UP)) {
      z += 1;
    }

    if (keyboard.isPressed(pc.KEY_A) || keyboard.isPressed(pc.KEY_LEFT)) {
      x -= 1;
    }
    if (keyboard.isPressed(pc.KEY_Q)) {
      character.rotate(0, -1 + dt * turnSpeed, 0);
    }

    if (keyboard.isPressed(pc.KEY_S) || keyboard.isPressed(pc.KEY_DOWN)) {
      z -= 1;
    }

    if (keyboard.isPressed(pc.KEY_D) || keyboard.isPressed(pc.KEY_RIGHT)) {
      x += 1;
    }
    if (keyboard.isPressed(pc.KEY_E)) {
      character.rotate(0, 1 - dt * turnSpeed, 0);
    }

    if (keyboard.isPressed(pc.KEY_SPACE)) {
      isJumping = character.anim.baseLayer.activeState === 'Jump';
      if (!isJumping && isOnGround) {
        character.anim.setTrigger('jump');
        character.rigidbody.applyImpulse(0, 99, 0);
      }
    }

    // move
    if (x !== 0 || z !== 0) {
      character.anim.setInteger('speed', anim);

      _worldDirection.add(_tempDirection.copy(forward).mulScalar(z));
      _worldDirection.add(_tempDirection.copy(right).mulScalar(x));
      _worldDirection.normalize();

      let pos = new pc.Vec3(_worldDirection.x * dt, 0, _worldDirection.z * dt);
      pos.normalize().mulScalar(moveSpeed); // pos.normalize().scale(moveSpeed);
      pos.add(character.getPosition());

      var targetY = cameraScript.getEuler().x + 180;
      let rot = new pc.Vec3(0, targetY, 0);

      character.rigidbody.teleport(pos, rot);
    } else {
      character.anim.setInteger('speed', 0);
    }

    character.anim.setFloat('xDirection', x);
    character.anim.setFloat('zDirection', z);

    checkIfOnGround();
  };

  return script;
};

const characterAnimController = (app: pc.Application, character: pc.Entity, model: pc.Entity) => {
  // add an anim component to the entity
  character.addComponent('anim', {
    activate: true,
    rootBone: model,
  });

  // create an anim state graph
  const animStateGraphData = {
    layers: [
      {
        name: 'locomotion',
        states: [
          {
            name: 'START',
          },
          {
            name: 'ANY',
          },
          {
            name: 'Idle',
            speed: 1,
          },
          {
            name: 'Jump',
            speed: 1,
          },
          {
            name: 'JogBackward',
            speed: 1,
          },
          {
            name: 'JogBackwardDiagonalLeft',
            speed: 1,
          },
          {
            name: 'JogBackwardDiagonalRight',
            speed: 1,
          },
          {
            name: 'JogForward',
            speed: 1,
          },
          {
            name: 'JogForwardDiagonalLeft',
            speed: 1,
          },
          {
            name: 'JogForwardDiagonalRight',
            speed: 1,
          },
          {
            name: 'JogStrafeLeft',
            speed: 1,
          },
          {
            name: 'JogStrafeRight',
            speed: 1,
          },
          {
            name: 'END',
          },
        ],
        transitions: [
          {
            from: 'START',
            to: 'Idle',
            time: 0,
            priority: 0,
          },
          {
            from: 'ANY',
            to: 'Idle',
            time: 0.15,
            priority: 0,
            conditions: [
              {
                parameterName: 'xDirection',
                predicate: pc.ANIM_EQUAL_TO,
                value: 0,
              },
              {
                parameterName: 'zDirection',
                predicate: pc.ANIM_EQUAL_TO,
                value: 0,
              },
            ],
          },
          {
            from: 'ANY',
            to: 'JogForwardDiagonalLeft',
            time: 0.15,
            priority: 0,
            conditions: [
              {
                parameterName: 'xDirection',
                predicate: pc.ANIM_LESS_THAN,
                value: 0,
              },
              {
                parameterName: 'zDirection',
                predicate: pc.ANIM_GREATER_THAN,
                value: 0,
              },
            ],
          },
          {
            from: 'ANY',
            to: 'JogForward',
            time: 0.15,
            priority: 0,
            conditions: [
              {
                parameterName: 'xDirection',
                predicate: pc.ANIM_EQUAL_TO,
                value: 0,
              },
              {
                parameterName: 'zDirection',
                predicate: pc.ANIM_GREATER_THAN,
                value: 0,
              },
            ],
          },
          {
            from: 'ANY',
            to: 'JogForwardDiagonalRight',
            time: 0.15,
            priority: 0,
            conditions: [
              {
                parameterName: 'xDirection',
                predicate: pc.ANIM_GREATER_THAN,
                value: 0,
              },
              {
                parameterName: 'zDirection',
                predicate: pc.ANIM_GREATER_THAN,
                value: 0,
              },
            ],
          },
          {
            from: 'ANY',
            to: 'JogStrafeLeft',
            time: 0.15,
            priority: 0,
            conditions: [
              {
                parameterName: 'xDirection',
                predicate: pc.ANIM_LESS_THAN,
                value: 0,
              },
              {
                parameterName: 'zDirection',
                predicate: pc.ANIM_EQUAL_TO,
                value: 0,
              },
            ],
          },
          {
            from: 'ANY',
            to: 'JogStrafeRight',
            time: 0.15,
            priority: 0,
            conditions: [
              {
                parameterName: 'xDirection',
                predicate: pc.ANIM_GREATER_THAN,
                value: 0,
              },
              {
                parameterName: 'zDirection',
                predicate: pc.ANIM_EQUAL_TO,
                value: 0,
              },
            ],
          },
          {
            from: 'ANY',
            to: 'JogBackwardDiagonalLeft',
            time: 0.15,
            priority: 0,
            conditions: [
              {
                parameterName: 'xDirection',
                predicate: pc.ANIM_LESS_THAN,
                value: 0,
              },
              {
                parameterName: 'zDirection',
                predicate: pc.ANIM_LESS_THAN,
                value: 0,
              },
            ],
          },
          {
            from: 'ANY',
            to: 'JogBackward',
            time: 0.15,
            priority: 0,
            conditions: [
              {
                parameterName: 'xDirection',
                predicate: pc.ANIM_EQUAL_TO,
                value: 0,
              },
              {
                parameterName: 'zDirection',
                predicate: pc.ANIM_LESS_THAN,
                value: 0,
              },
            ],
          },
          {
            from: 'ANY',
            to: 'JogBackwardDiagonalRight',
            time: 0.15,
            priority: 0,
            conditions: [
              {
                parameterName: 'xDirection',
                predicate: pc.ANIM_GREATER_THAN,
                value: 0,
              },
              {
                parameterName: 'zDirection',
                predicate: pc.ANIM_LESS_THAN,
                value: 0,
              },
            ],
          },
          {
            from: 'ANY',
            to: 'Jump',
            time: 0.15,
            priority: 0,
            conditions: [
              {
                parameterName: 'jump',
                predicate: pc.ANIM_EQUAL_TO,
                value: true,
              },
            ],
          },
          {
            from: 'Jump',
            to: 'Idle',
            time: 0.25,
            priority: 0,
            exitTime: 0.8,
          },
        ],
      },
    ],
    parameters: {
      xDirection: {
        name: 'xDirection',
        type: pc.ANIM_PARAMETER_FLOAT,
        value: 0,
      },
      zDirection: {
        name: 'zDirection',
        type: pc.ANIM_PARAMETER_FLOAT,
        value: 0,
      },
      speed: {
        name: 'speed',
        type: pc.ANIM_PARAMETER_INTEGER,
        value: 0,
      },
      jump: {
        name: 'jump',
        type: pc.ANIM_PARAMETER_TRIGGER,
        value: false,
      },
    },
  };

  // load the state graph into the anim component
  character.anim.loadStateGraph(animStateGraphData);

  // assign the loaded animation assets to each of the states present in the state graph
  const locomotionLayer = character.anim.baseLayer;
  locomotionLayer.assignAnimation('Idle', assets.value.animations.Idle.resource);
  locomotionLayer.assignAnimation('Jump', assets.value.animations.Jump.resource);
  locomotionLayer.assignAnimation('JogBackward', assets.value.animations.JogBackward.resource);
  locomotionLayer.assignAnimation('JogBackwardDiagonalLeft', assets.value.animations.JogBackwardDiagonalLeft.resource);
  locomotionLayer.assignAnimation(
    'JogBackwardDiagonalRight',
    assets.value.animations.JogBackwardDiagonalRight.resource,
  );
  locomotionLayer.assignAnimation('JogForward', assets.value.animations.JogForward.resource);
  locomotionLayer.assignAnimation('JogForwardDiagonalLeft', assets.value.animations.JogForwardDiagonalLeft.resource);
  locomotionLayer.assignAnimation('JogForwardDiagonalRight', assets.value.animations.JogForwardDiagonalRight.resource);
  locomotionLayer.assignAnimation('JogStrafeLeft', assets.value.animations.JogStrafeLeft.resource);
  locomotionLayer.assignAnimation('JogStrafeRight', assets.value.animations.JogStrafeRight.resource);
};

const createNetworkManager = (app: pc.Application, ws: any, target: IClient, screen: pc.Entity, camera: pc.Entity) => {
  const script = pc.createScript('NetworkManager');

  let clientId = '';
  let clients = {} as { [key: string]: IClient };

  script!.prototype.initialize = function () {
    ws.onopen = function (event: any) {
      console.log('ws open event:', JSON.stringify(event));
      // @ts-ignore engine-tsd
      script.prototype.requestClientIdFromServer();
    };

    ws.onclose = function (event: any) {
      console.log('ws close event:', JSON.stringify(event));
      // @ts-ignore engine-tsd
      script.prototype.exitH010space();
    };

    ws.onerror = function (error: any) {
      state.error = `ws error: ${JSON.stringify(error)}`;
    };

    ws.onmessage = function (message: any) {
      const data = JSON.parse(message.data);

      switch (data.method) {
        case 'recv:id':
          // from server -> data: { method: string, id: string }
          state.clientId = data.id;
          clientId = data.id;
          // @ts-ignore engine-tsd
          script.prototype.joinH010space();
          break;
        case 'init:h010space':
          // from server -> data: { method: string, clients: IClient[] }
          loadInitclients(data.clients);
          break;
        case 'load:client':
          // from server -> data: { method: string, client: IClient }
          loadClient(data.client);
          break;
        case 'move:client':
          // from server -> data: { method: string, id: string, position: IVec3 }
          moveClient({ id: data.id, position: data.position });
          break;
        case 'turn:client':
          // from server -> data: { method: string, id: string, rotation: IVec3 }
          turnClient({ id: data.id, rotation: data.rotation });
          break;
        case 'recv:exit':
          // from server -> data: { method: string, id: string }
          removeClient(data.id);
          break;
        default:
          console.error(`server sent unknown message.method: ${JSON.stringify(data)}`);
          break;
      }
    };
  };

  let prevPosX = parseInt(target.model.getPosition().x);
  let prevPosY = parseInt(target.model.getPosition().y);
  let prevPosZ = parseInt(target.model.getPosition().z);
  script!.prototype.update = function (dt) {
    if (state.joinedSpace) {
      const posX = parseInt(target.model.getPosition().x);
      const posY = parseInt(target.model.getPosition().y);
      const posZ = parseInt(target.model.getPosition().z);
      if (prevPosX === posX && prevPosY === posY && prevPosZ === posZ) {
        // start afk timer
      } else {
        ws.send(JSON.stringify({ method: 'update:position', id: clientId, position: target.model.getPosition() }));
        // update prev position with new position
        prevPosX = parseInt(target.model.getPosition().x);
        prevPosY = parseInt(target.model.getPosition().y);
        prevPosZ = parseInt(target.model.getPosition().z);
        // reset afk timer
      }
      // debounce(
      //   ws.send(JSON.stringify({ method: 'update:rotation', id: clientId, rotation: target.model.getRotation() })),
      //   5000,
      // );
    }
  };

  // @ts-ignore engine-tsd
  script.prototype.requestClientIdFromServer = function () {
    ws.send(JSON.stringify({ method: 'send:id' }));
  };

  // @ts-ignore engine-tsd
  script.prototype.joinH010space = function () {
    const client = {
      id: clientId,
      h010tag: target.h010tag,
      space_id: target.space_id,
      modelURL: target.modelURL,
      position: { x: 0, y: -1, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    };
    ws.send(JSON.stringify({ method: 'join:h010space', client }));
    state.joinedSpace = true;
    // app.root.findByName("Lobby Camera")!.enabled = false;
  };

  // @ts-ignore engine-tsd
  script.prototype.exitH010space = function () {
    clients = {};
    if (target.model) target.model.destroy();
    ws.send(JSON.stringify({ method: 'exit:h010space', id: clientId }));
    state.joinedSpace = false;
    // app.root.findByName("Lobby Camera")?.enabled = true;
  };

  function loadInitclients(clients: { [key: string]: IClient }) {
    const keys = Object.keys(clients);
    keys.forEach((key, i) => {
      if (key !== clientId) {
        loadClient(clients[key]);
      }
    });
  }

  function loadClient(client: IClient) {
    clients[client.id] = { ...client };
    const characterModel = loadModelFromUrl(
      app,
      client.h010tag,
      client.modelURL || '/src/assets/models/h010bot/ybot/ybot.json',
    );
    clients[client.id].model = characterModel;
    // TODO: should add rigidbody to remote clients?

    characterModel.translateLocal(new pc.Vec3(client.position?.x, client.position?.y, client.position?.z));
    characterModel.setLocalEulerAngles(new pc.Vec3(client.rotation?.x, client.rotation?.y, client.rotation?.z));

    createH010tagBillboard(app, client.h010tag, characterModel, camera, screen);

    app.root.addChild(characterModel);
  }

  function removeClient(id: string) {
    if (!clients[id]) return;

    if (clients[id].model) {
      clients[id].model.destroy();
    }
    const idx = screen.children.findIndex((c) => c.name === clients[id].h010tag);
    if (idx >= 0) {
      // @ts-ignore
      screen.children[idx].destroy();
    }

    delete clients[id];
  }

  function moveClient(data: { id: string; position: IVec3 }) {
    if (!clients[data.id] || clients[data.id].isDeleted) return;

    // TODO: must add rigidbody component to client for rigidbody.teleport to work
    // clients[data.id].model.rigidbody.teleport(
    //   new pc.Vec3(data.position.x, data.position.y, data.position.z),
    //   pc.Vec3.ZERO,
    // );
    clients[data.id].model.setPosition(data.position.x, data.position.y, data.position.z);
  }

  function turnClient(data: { id: string; rotation: IVec3 }) {
    if (!clients[data.id] || clients[data.id].isDeleted) return;

    clients[data.id].model.setLocalEulerAngles(new pc.Vec3(data.rotation.x, data.rotation.y, data.rotation.z));
  }
};

interface IWall {
  name?: string;
  type: string;
  position: pc.Vec3;
  rotation: pc.Vec3;
  scale: pc.Vec3;
  model?: boolean;
  material?: pc.Material;
  rigidbody?: boolean;
  collision?: boolean;
}

function createEnvironment(app: pc.Application) {
  // app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

  // Set the gravity for our rigid bodies
  app.systems.rigidbody.gravity.set(0, -9.81, 0);

  // TODO: move to assets
  // set a prefiltered cubemap as the skybox
  const cubemapAsset = new pc.Asset(
    'helipad',
    'cubemap',
    {
      url: '/src/assets/textures/cubemap/Helipad.dds',
    },
    {
      rgbm: true,
    },
  );
  app.assets.add(cubemapAsset);
  app.assets.load(cubemapAsset);
  cubemapAsset.ready(function () {
    app.scene.skyboxMip = 2;
    app.scene.setSkybox(cubemapAsset.resources);
  });

  const environment = new pc.Entity();

  // Create ground material
  const ground_mat = new pc.StandardMaterial();
  ground_mat.diffuse = pc.Color.WHITE;
  ground_mat.diffuseMap = assets.value.textures.checkboard.resource;
  ground_mat.diffuseMapTiling = new pc.Vec2(50, 50);
  ground_mat.update();

  // Create glass material
  const glass_mat = new pc.StandardMaterial();
  glass_mat.diffuse = pc.Color.WHITE;
  glass_mat.useMetalness = true;
  glass_mat.metalness = 0;
  glass_mat.shininess = 100;
  glass_mat.blendType = pc.BLEND_NORMAL;
  glass_mat.reflectivity = 0;
  glass_mat.refraction = 1;
  glass_mat.lightMapUv = 0;
  glass_mat.update();

  const walls = [
    {
      name: 'Ground',
      type: 'box',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 60, y: 1, z: 60 },
      material: ground_mat,
      rigidbody: true,
      collision: true,
    },
    {
      name: 'N_Wall',
      type: 'box',
      position: { x: 0, y: 10, z: -30 },
      rotation: { x: 90, y: 0, z: 0 },
      scale: { x: 60, y: 1, z: 20 },
      rigidbody: true,
      collision: true,
    },
    {
      name: 'S_Wall',
      type: 'box',
      position: { x: 0, y: 10, z: 30 },
      rotation: { x: 270, y: 0, z: 0 },
      scale: { x: 60, y: 1, z: 20 },
      rigidbody: true,
      collision: true,
    },
    {
      name: 'W_Wall',
      type: 'box',
      position: { x: -30, y: 10, z: 0 },
      rotation: { x: 270, y: 270, z: 0 },
      scale: { x: 60, y: 1, z: 20 },
      rigidbody: true,
      collision: true,
    },
    {
      name: 'E_Window',
      type: 'box',
      position: { x: 30, y: 10, z: 0 },
      rotation: { x: 270, y: 90, z: 0 },
      scale: { x: 60, y: 1, z: 20 },
      material: glass_mat,
      rigidbody: true,
      collision: true,
    },
    {
      name: 'Ceiling',
      type: 'box',
      position: { x: 0, y: 20, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 60, y: 1, z: 60 },
      rigidbody: false,
      collision: true,
    },
  ] as IWall[];

  walls.map((wall) => {
    const entity = createWallEntity(wall);
    environment.addChild(entity);
  });

  return environment;
}

const createWallEntity = (wall: IWall) => {
  const { name, type, position, rotation, scale, material } = wall;

  const entity = new pc.Entity(name);
  entity.addComponent('render', {
    type,
    material,
  });
  entity.translateLocal(position.x, position.y, position.z);
  entity.setLocalEulerAngles(rotation.x, rotation.y, rotation.z);
  entity.setLocalScale(scale.x, scale.y, scale.z);
  if (wall.collision) {
    // add collision
    entity.addComponent('collision', {
      type,
      halfExtents: new pc.Vec3(scale.x / 2, scale.y / 2, scale.z / 2),
    });
  }
  if (wall.rigidbody) {
    // add rigidbody
    entity.addComponent('rigidbody', {
      type: pc.BODYTYPE_STATIC,
      friction: 0.5,
      restitution: 0.5,
    });
  }
  return entity;
};
</script>
