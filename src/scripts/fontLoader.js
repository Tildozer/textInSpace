import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

export const loadFont = async ({ gui, scene, matcapTextures }) => {
  const fontLoader = new FontLoader();
  
  const font = await new Promise((resolve, reject) => {
    fontLoader.load("/fonts/Cascadia Code_Regular.json", resolve, undefined, reject);
  });

  console.log("fontLoaded");
  const textGeometry = new TextGeometry("Anthony Thibodeaux, \nThis is a test.", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.computeBoundingBox();
  textGeometry.center();

  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTextures.stained,
  });
  const text = new THREE.Mesh(textGeometry, textMaterial);

  gui
    .add(text.position, "x")
    .name("text Position")
    .min(-10)
    .max(10)
    .step(0.01);

  scene.add(text);

  return text;
};