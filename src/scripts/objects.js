import * as THREE from "three";

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

}

const makeMultipleItems = ({ geometry, material, scene, amount }) => {
  for (let i = 0; i < amount; i++) {
    const shape = new THREE.Mesh(geometry, material);

    shape.position.x = (Math.random() - 0.5) * 10;
    shape.position.y = (Math.random() - 0.5) * 10;
    shape.position.z = (Math.random() - 0.5) * 10;

    shape.rotation.x = Math.random() * Math.PI;
    shape.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    shape.scale.set(scale, scale, scale);
    scene.add(shape);
  }
};

export const loadObjects = ({ scene, matcapTextures }) => {
  makeDonuts({ scene, matcapTextures });
};
