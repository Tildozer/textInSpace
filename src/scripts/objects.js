import * as THREE from "three";

class CustomSinCurve extends THREE.Curve {
  constructor(scale = 1) {
    super();
    this.scale = scale;
  }

  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const tx = t * 3 - 1.5;
    const ty = Math.sin(2 * Math.PI * t);
    const tz = 0;

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
  }
}

const makeDonuts = ({ scene, matcapTextures }) => {
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  const donutMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTextures.shinyYellow,
  });
  makeMultipleItems({
    geometry: donutGeometry,
    material: donutMaterial,
    scene,
    amount: 50,
  });
};

const makeCones = ({ scene }) => {
  const conesGeometry = new THREE.ConeGeometry(0.3, 0.6, 20, 6);
  const conesMaterial = new THREE.MeshNormalMaterial();
  makeMultipleItems({
    geometry: conesGeometry,
    material: conesMaterial,
    scene,
    amount: 35,
  });
};

const makeTubes = ({ scene, matcapTextures }) => {
  const path = new CustomSinCurve(10);
  console.log(path);
  const tubesGeometry = new THREE.TubeGeometry(path, 30, 1.26, 12, false);
  const tubesMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTextures.heatMap,
  });
  makeMultipleItems({
    geometry: tubesGeometry,
    material: tubesMaterial,
    scene,
    amount: 80,
    tube: true,
  });
};

const makeMultipleItems = ({ geometry, material, scene, amount, tube }) => {
  for (let i = 0; i < amount; i++) {
    const shape = new THREE.Mesh(geometry, material);

    shape.position.x = (Math.random() - 0.5) * 10;
    shape.position.y = (Math.random() - 0.5) * 10;
    shape.position.z = (Math.random() - 0.5) * 10;

    shape.rotation.x = Math.random() * Math.PI;
    shape.rotation.y = Math.random() * Math.PI;

    let scale = Math.random();
    if (tube) {
      scale = scale * 0.02;
    }
    shape.scale.set(scale, scale, scale);
    scene.add(shape);
  }
};

export const loadObjects = ({ scene, matcapTextures }) => {
  makeCones({ scene });
  makeTubes({ scene, matcapTextures });
  makeDonuts({ scene, matcapTextures });
};
