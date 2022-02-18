import { ref } from 'vue';
import * as pc from 'playcanvas';

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
   * Converts a coordinate in world space into a screen's space.
   *
   * @param {pc.Vec3} worldPosition - the Vec3 representing the world-space coordinate.
   * @param {pc.CameraComponent} camera - the Camera.
   * @param {pc.ScreenComponent} screen - the Screen
   * @returns {pc.Vec3} a Vec3 of the input worldPosition relative to the camera and screen. The Z coordinate represents the depth,
   * and negative numbers signal that the worldPosition is behind the camera.
   */
  const worldToScreenSpace = (
    app: pc.Application,
    worldPosition: pc.Vec3,
    camera: pc.CameraComponent,
    screen: pc.ScreenComponent,
  ): pc.Vec3 => {
    const screenPos = camera.worldToScreen(worldPosition);

    // take pixel ratio into account
    const pixelRatio = app.graphicsDevice.maxPixelRatio;
    screenPos.x *= pixelRatio;
    screenPos.y *= pixelRatio;

    // account for screen scaling
    // @ts-ignore engine-tsd
    const scale = screen.scale;

    // invert the y position
    screenPos.y = screen.resolution.y - screenPos.y;

    // put that into a Vec3
    return new pc.Vec3(screenPos.x / scale, screenPos.y / scale, screenPos.z / scale);
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

  const createPhongMaterial = (name: string, color: pc.Color) => {
    const material = new pc.PhongMaterial();
    material.name = name;
    material.diffuse = color;
    material.update();

    return material;
  };

  return {
    assetLoader,
    scriptLoader,
    worldToScreenSpace,
    createPrimitiveEntity,
    createAssetEntity,
    createTextureEntity,
    createTextEntity,
    createStandardMaterial,
    createPhongMaterial,
  };
}
