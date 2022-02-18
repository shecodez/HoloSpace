interface IWall {
  name: string;
  type: string;
  position: pc.Vec3;
  rotation: pc.Vec3;
  scale: pc.Vec3;
  material?: pc.Material;
}

const walls = [
  {
    name: 'Ground',
    type: 'box',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 60, y: 1, z: 60 },
    //material,
  },
  {
    name: 'N_Wall',
    type: 'box',
    position: { x: 0, y: 10, z: -30 },
    rotation: { x: 90, y: 0, z: 0 },
    scale: { x: 60, y: 1, z: 20 },
  },
  {
    name: 'S_Wall',
    type: 'box',
    position: { x: 0, y: 10, z: 30 },
    rotation: { x: 270, y: 0, z: 0 },
    scale: { x: 60, y: 1, z: 20 },
  },
  {
    name: 'W_Wall',
    type: 'box',
    position: { x: -30, y: 10, z: 0 },
    rotation: { x: 270, y: 270, z: 0 },
    scale: { x: 60, y: 1, z: 20 },
  },
  {
    name: 'E_Wall',
    type: 'box',
    position: { x: 30, y: 10, z: 0 },
    rotation: { x: 270, y: 90, z: 0 },
    scale: { x: 60, y: 1, z: 20 },
  },
  {
    name: 'Ceiling',
    type: 'box',
    position: { x: 0, y: 20, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 60, y: 1, z: 60 },
  },
] as IWall[];

// walls.map(border => {
//   const entity = createBorderEntity(border);
//   app.root.addChild(entity)
// })

const createBoundryEntity = (wall: IWall) => {
  const { name, type, position, rotation, scale, material } = wall;

  const entity = new pc.Entity(name);
  entity.addComponent('render', {
    type,
    material,
  });
  entity.setPosition(position.x, position.y, position.z);
  entity.setEulerAngles(rotation.x, rotation.y, rotation.z);
  entity.setLocalScale(scale.x, scale.y, scale.z);

  // add collision
  entity.addComponent('collision', {
    type,
    halfExtents: new pc.Vec3(scale.x / 2, scale.y + 0.3, scale.z / 2),
  });

  // add rigidbody
  entity.addComponent('rigidbody', {
    type: pc.BODYTYPE_STATIC,
    friction: 0.5,
    restitution: 0.5,
  });

  return entity;
};
