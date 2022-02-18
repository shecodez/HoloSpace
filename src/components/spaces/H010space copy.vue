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
import { onMounted, PropType, reactive, ref, toRefs } from 'vue';
import { Icon } from '@iconify/vue';
import * as pc from 'playcanvas';

import usePlayCanvas from '@/use/playcanvas';
import { IUser } from '@/data/interfaces';

const { worldToScreenSpace } = usePlayCanvas();

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
});

const assetsToLoad = [
  new pc.Asset('xbot.json', 'model', {
    url: '/src/assets/models/h010bot/xbot/xbot.json',
  }),
  new pc.Asset('ybot.json', 'model', {
    url: '/src/assets/models/h010bot/ybot/Y_Bot.json',
  }),
  new pc.Asset('idle', 'animation', {
    url: '/src/assets/animations/glb/idle.glb',
  }),
  new pc.Asset('jog', 'animation', {
    url: '/src/assets/animations/glb/jog.glb',
  }),
  new pc.Asset('jump', 'animation', {
    url: '/src/assets/animations/glb/jump.glb',
  }),
  new pc.Asset('run', 'animation', {
    url: '/src/assets/animations/glb/run.glb',
  }),
  new pc.Asset('walk', 'animation', {
    url: '/src/assets/animations/glb/walk.glb',
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
    idle: assetsToLoad[2],
    jog: assetsToLoad[3],
    jump: assetsToLoad[4],
    run: assetsToLoad[5],
    walk: assetsToLoad[6],
  },
  fonts: {
    montserratBlack: assetsToLoad[7],
  },
  textures: {
    checkboard: assetsToLoad[8],
  },
});

onMounted(() => loadAmmo().then(() => createApp(canvas.value!)));

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
    // app.value.graphicsDevice.maxPixelRatio = window.devicePixelRatio;

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
  // showMenu();
}

function createH010space(app: pc.Application) {
  // Create an Entity with a camera component
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', {
    clearColor: new pc.Color(30, 30, 30),
  });
  app.root.addChild(camera);

  // Create an entity with a light component
  const light = new pc.Entity();
  light.addComponent('light', {
    type: 'directional',
    color: new pc.Color(1, 1, 1),
    castShadows: true,
    intensity: 1,
    shadowBias: 0.2,
    shadowDistance: 16,
    normalOffsetBias: 0.05,
    shadowResolution: 2048,
  });
  light.setLocalEulerAngles(45, 30, 0);
  app.root.addChild(light);

  const environment = createEnvironment();
  app.root.addChild(environment);

  // Create a 2D screen
  const screen = new pc.Entity();
  screen.setLocalScale(0.01, 0.01, 0.01);
  screen.addComponent('screen', {
    referenceResolution: new pc.Vec2(1280, 720),
    screenSpace: true,
  });
  app.root.addChild(screen);

  createCharacterModel(app, screen, camera, `${me.value.name}#${me.value.pin}`, 300);
}

function createEnvironment() {
  const environment = new pc.Entity();

  // Create ground material
  const material = new pc.StandardMaterial();
  material.diffuse = pc.Color.WHITE;
  material.diffuseMap = assets.value.textures.checkboard.resource;
  material.diffuseMapTiling = new pc.Vec2(50, 50);
  material.update();

  // Create an Entity for the ground
  const ground = new pc.Entity();
  ground.addComponent('render', {
    type: 'box',
    material: material,
  });
  const scale = new pc.Vec3(60, 1, 60);
  ground.setLocalScale(scale);
  ground.setLocalPosition(0, 0, 0);
  // add collision
  ground.addComponent('collision', {
    type: 'box',
    halfExtents: new pc.Vec3(scale.x / 2, scale.y + 0.3, scale.z / 2),
  });
  // add rigidbody
  ground.addComponent('rigidbody', {
    type: pc.BODYTYPE_STATIC,
    friction: 0.5,
    restitution: 0.5,
  });

  environment.addChild(ground);
  return environment;
}

function createCharacterModel(
  app: pc.Application,
  screen: pc.Entity,
  camera: pc.Entity,
  h010tag: string,
  speed: number,
) {
  // Create an Entity to represent the user in the h010space (3d world)
  const character = new pc.Entity();
  character.setLocalPosition(0, 1.5, 0);
  character.setLocalEulerAngles(0, 0, 0);
  //character.setLocalScale(new pc.Vec3(0.5, 0.5, 0.5));
  // add rigidbody
  character.addComponent('rigidbody', {
    type: pc.BODYTYPE_DYNAMIC,
    angularDamping: 0,
    angularFactor: pc.Vec3.ZERO,
    friction: 0.75,
    linearDamping: 0.99,
    linearFactor: pc.Vec3.ONE,
    mass: 80,
    restitution: 0.5,
  });
  // add collision
  character.addComponent('collision', {
    type: 'capsule',
    axis: 0,
    radius: 0.24,
    height: 1.8,
  });
  const characterModel = loadH010botFromUrl(app, 'xbot', '/src/assets/models/h010bot/xbot/xbot.json');
  characterModel.setLocalPosition(0, -1, 0);
  characterModel.setLocalRotation(0, 180, 0);
  character.addChild(characterModel);

  const cameraAxis = new pc.Entity('Camera Axis');
  cameraAxis.translateLocal(0, 0.5, 0);
  //createCameraController(app, cameraAxis);
  //camera.addComponent('script');
  //camera.script.create('CameraController');
  const raycastEndPoint = new pc.Entity('RaycastEndPoint');
  raycastEndPoint.translateLocal(0, 0, 4.43);
  //cameraAxis.addChild(camera);
  cameraAxis.addChild(raycastEndPoint);
  character.addChild(cameraAxis);

  // TODO: Only add character controller scripts if isLocal user
  createCharacterController(app, camera, character, speed);
  character.addComponent('script');
  character.script.create('CharacterController');
  // { attributes: { camera: camera } }
  characterAnimController(app, character, characterModel);
  app.root.addChild(character);

  // Create a text element that will hover the character's head
  const characterInfo = new pc.Entity();
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
}

const loadH010botFromUrl = (
  app: pc.Application,
  name: string,
  url: string,

  colors?: pc.Color[],
) => {
  const h010bot = new pc.Entity(name);
  app.assets.loadFromUrl(url, 'model', function (err: any, asset: pc.Asset | any) {
    h010bot.addComponent('model');
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

const createCameraController = (app: pc.Application, cameraAxis: pc.Entity) => {
  const script = pc.createScript('CameraController');

  const mouseSpeed = 1.4; // mouse sensitivity
  let euler = new pc.Vec3();
  //let touchCoord =new pc.Vec2();
  let rayEnd: pc.GraphNode | null;

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
    if (pc.Mouse.isPointerLocked() || pc.MOUSEBUTTON_LEFT) {
      euler.x -= ((mouseSpeed * e.dx) / 60) % 360;
      euler.y += ((mouseSpeed * e.dy) / 60) % 360;

      if (euler.x < 0) euler.x += 360; // yaw
      if (euler.y < 0) euler.y += 360; // pitch
      // euler.y = pc.math.clamp(euler.y, -75, 75); clamp pitch
    }
  }

  function onMouseDown(e: any) {
    e.preventDefault();
    app.mouse.enablePointerLock();
  }

  // function onMouseWheel(e: any) {
  //   e.event.preventDefault();
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

const createCharacterController = (app: pc.Application, camera: pc.Entity, character: pc.Entity, speed: number) => {
  const script = pc.createScript('CharacterController');

  //const lookSpeed = 0.25;
  //let force = new pc.Vec3();
  let anim = speedForState('Walk');
  const keyboard = new pc.Keyboard(document.body); // limit to canvas?

  let isOnGround = true;
  let isJumping = false;
  let groundCheckRay = new pc.Vec3(0, -1.2, 0);
  let rayEnd = new pc.Vec3();
  let groundNormal = new pc.Vec3();

  //const cameraScript = camera.script.CameraController;
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
    camera.translateLocal(0, 0, 4.43);

    camera.camera.fov = 45;
    camera.camera.nearClip = 0.3;
    camera.camera.farClip = 100;
  }

  function createFpCamera() {
    const fpcamera = new pc.Entity('fpcamera');
    fpcamera.addComponent('camera');
    character.addChild(fpcamera);
    fpcamera.translateLocal(0, 1, 0);

    return fpcamera;
  }

  // defines how many units the character should move per second given its current animation state
  function speedForState(state: any) {
    switch (state) {
      case 'Walk':
        return 1.0;
      case 'Run':
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
    //if (!character.anim.getInteger('speed')) return; // throw err?

    // Get camera directions to determine movement directions
    const forward = pov === Perspective.FirstPerson ? camera.forward : character.forward;
    const right = pov === Perspective.FirstPerson ? camera.right : character.right;

    // movement
    let x = 0;
    let z = 0;

    if (keyboard.isPressed(pc.KEY_J)) {
      anim = anim > 1 ? speedForState('Walk') : speedForState('Run');
    }

    if (keyboard.isPressed(pc.KEY_V)) {
      togglePerspective();
    }

    if (keyboard.isPressed(pc.KEY_W) || keyboard.isPressed(pc.KEY_UP)) {
      z += 1;
    }

    if (keyboard.isPressed(pc.KEY_A) || keyboard.isPressed(pc.KEY_LEFT)) {
      character.rotate(0, -1 + dt * speed, 0);
    }
    if (keyboard.isPressed(pc.KEY_Q)) {
      x -= 1;
    }

    if (keyboard.isPressed(pc.KEY_S) || keyboard.isPressed(pc.KEY_DOWN)) {
      z -= 1;
    }

    if (keyboard.isPressed(pc.KEY_D) || keyboard.isPressed(pc.KEY_RIGHT)) {
      character.rotate(0, 1 - dt * speed, 0);
    }
    if (keyboard.isPressed(pc.KEY_E)) {
      x += 1;
    }

    if (keyboard.isPressed(pc.KEY_SPACE)) {
      isJumping = character.anim.baseLayer.activeState === 'Jump';
      if (!isJumping && isOnGround) {
        character.anim.setTrigger('jump');
        character.rigidbody.applyImpulse(0, 200, 0);
      }
    }

    // move
    if (x !== 0 || z !== 0) {
      character.anim.setInteger('speed', anim);
      // x *= dt;
      // z *= dt;
      // character.anim.setInteger('speed', anim);
      // force
      //   .set(x, 0, z)
      //   .normalize()
      //   .mulScalar(999 * anim); // run is faster than walk
      // character.rigidbody.applyForce(force);
      worldDirection.add(tempDirection.copy(forward).mulScalar(z));
      worldDirection.add(tempDirection.copy(right).mulScalar(x));
      worldDirection.normalize();

      var pos = new pc.Vec3(worldDirection.x * dt, 0, worldDirection.z * dt);

      pos.normalize(); //.scale(0.09);
      pos.add(this.entity.getPosition());

      //var targetY = cameraScript.euler.x + 180;
      var rot = new pc.Vec3(0, 180, 0);

      this.entity.rigidbody.teleport(pos, rot);
    } else {
      character.anim.setInteger('speed', 0);
    }
    //character.anim.setFloat('xDirection', x);
    //character.anim.setFloat('zDirection', z);

    checkIfOnGround();

    // update camera angle from mouse events
    //camera.setLocalEulerAngles(euler.y, euler.x, 0);
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
            name: 'Walk',
            speed: 1,
          },
          {
            name: 'Jump',
            speed: 1,
          },
          {
            name: 'Run',
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
            from: 'Idle',
            to: 'Walk',
            time: 0.1,
            priority: 0,
            conditions: [
              {
                parameterName: 'speed',
                predicate: pc.ANIM_GREATER_THAN,
                value: 0,
              },
            ],
          },
          {
            from: 'ANY',
            to: 'Jump',
            time: 0.1,
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
            time: 0.2,
            priority: 0,
            exitTime: 0.8,
          },
          {
            from: 'Jump',
            to: 'Walk',
            time: 0.2,
            priority: 0,
            exitTime: 0.8,
          },
          {
            from: 'Walk',
            to: 'Idle',
            time: 0.1,
            priority: 0,
            conditions: [
              {
                parameterName: 'speed',
                predicate: pc.ANIM_LESS_THAN_EQUAL_TO,
                value: 0,
              },
            ],
          },
          {
            from: 'Walk',
            to: 'Run',
            time: 0.1,
            priority: 0,
            conditions: [
              {
                parameterName: 'speed',
                predicate: pc.ANIM_GREATER_THAN,
                value: 1,
              },
            ],
          },
          {
            from: 'Run',
            to: 'Walk',
            time: 0.1,
            priority: 0,
            conditions: [
              {
                parameterName: 'speed',
                predicate: pc.ANIM_LESS_THAN,
                value: 2,
              },
            ],
          },
        ],
      },
    ],
    parameters: {
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
  locomotionLayer.assignAnimation('Idle', assets.value.animations.idle.resource);
  locomotionLayer.assignAnimation('Walk', assets.value.animations.walk.resource);
  locomotionLayer.assignAnimation('Run', assets.value.animations.run.resource);
  locomotionLayer.assignAnimation('Jump', assets.value.animations.jump.resource);
};
</script>
