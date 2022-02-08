import { ref } from 'vue';
import * as pc from 'playcanvas';

const app = ref<pc.Application>();
const error = ref();

interface IAssetResourse {
  name: string;
  type: string;
  url?: string;
  data?: any;
}

interface IScriptResourse {
  name: string;
  url: string;
}

export default function usePlayCanvas() {
  const initializeApp = (canvas: HTMLCanvasElement) => {
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
    } catch (e) {
      if (e instanceof pc.UnsupportedBrowserError) {
        error.value = 'This page requires a browser that supports WebGL. More information here: http://get.webgl.org';
      } else if (e instanceof pc.ContextCreationError) {
        error.value = 'Your computer may not support WebGL. Troubleshoot here: http://get.webgl.org/troubleshooting/';
      } else {
        error.value = `Could not initialize application. Error: ${e}`;
      }
    }
  };

  // const updateApp = (dt: string) => {}

  /**
   * loads assets from data or url
   * @param resource
   * @param app
   * @param onLoad (optional)
   */
  const assetLoader = (resource: IAssetResourse, app: pc.Application, onLoad?: any) => {
    if (resource.data) {
      const asset = new pc.Asset(
        resource.name,
        resource.type,
        resource.type === 'cubemap' ? { url: resource.url } : undefined,
        resource.data,
      );
      asset.on('load', function (asset) {
        onLoad(resource.name, asset);
      });
      app.assets.add(asset);
      app.assets.load(asset);
    } else {
      if (resource.url) {
        try {
          app.assets.loadFromUrl(resource.url, resource.type, function (err, asset) {
            if (!err && asset) {
              onLoad(resource.name, asset);
            }
          });
        } catch (e) {
          console.error('AssetLoaderError', e);
        }
      }
    }
  };

  /**
   * loads scripts from url
   * @param resource
   * @param app
   * @param onLoad (optional)
   */
  const scriptLoader = (resource: IScriptResourse, app: pc.Application, onLoad?: any) => {
    try {
      fetch(resource.url)
        .then((response: any) => response.text())
        .then((data) => {
          (window as any)[resource.name] = (Function('module', 'exports', data).call(module, module, module.exports),
          module).exports;
          onLoad();
        });
    } catch (e) {
      console.error('ScriptLoaderError', e);
    }
  };

  /**
   * creates primitive entity in pc
   */
  const createPrimitiveEntity = (
    name: string,
    type: string,
    position: Array<number>,
    rotation: Array<number>,
    scale: Array<number>,
  ) => {
    const entity = new pc.Entity(name);
    entity.addComponent('model', {
      type: type,
    });
    entity.setPosition(position[0], position[1], position[2]);
    entity.setEulerAngles(rotation[0], rotation[1], rotation[2]);
    entity.setLocalScale(scale[0], scale[1], scale[2]);

    return entity;
  };

  /**
   * creates asset entity in pc
   */
  const createAssetEntity = (name: string, asset: pc.Asset, castShadows = true) => {
    const entity = new pc.Entity(name);
    entity.addComponent('model', {
      type: 'asset',
      asset,
      castShadows,
    });

    return entity;
  };

  /**
   * creates texture entity in pc
   */
  const createTextureEntity = (name: string, texture: any) => {
    const entity = new pc.Entity(name);
    entity.addComponent('element', {
      anchor: new pc.Vec4(1, 0, 1, 0),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 32,
      height: 32,
      type: pc.ELEMENTTYPE_IMAGE,
      rect: [0, 0, 1, 1],
      textureAsset: texture,
      useInput: true,
    });

    return entity;
  };

  const createTextEntity = (
    name: string,
    text: string,
    fontAsset: any,
    useInput = false,
    fontSize = 32,
    color = pc.Color.WHITE,
    opacity = 1,
  ) => {
    const entity = new pc.Entity(name);
    entity.addComponent('element', {
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      type: pc.ELEMENTTYPE_TEXT,
      rect: [0, 0, 1, 1],
      text,
      fontSize,
      fontAsset,
      useInput,
      color,
      opacity,
    });

    return entity;
  };

  const createStandardMaterial = (name: string, color: pc.Color) => {
    const material = new pc.StandardMaterial();
    material.name = name;
    material.diffuse = color;
    material.update();

    return material;
  };

  return {
    app,
    error,
    initializeApp,
    assetLoader,
    scriptLoader,
    createPrimitiveEntity,
    createAssetEntity,
    createTextureEntity,
    createTextEntity,
    createStandardMaterial,
  };
}
