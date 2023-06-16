import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

export const loadFont = async ({ gui, scene, matcapTextures }) => {
  const fontLoader = new FontLoader();

  const font = await new Promise((resolve, reject) => {
    fontLoader.load(
      "/fonts/Cascadia Code_Regular.json",
      resolve,
      undefined,
      reject
    );
  });
  console.log("fontLoaded");
  let fontSize
  let width = window.innerWidth;
  if(width < 553) {
    fontSize = 0.2;
  } else if( width < 600) {
    fontSize = 0.3;
  } else if(width < 950) {
    fontSize = 0.4;
  } else {
    fontSize = 0.5;
  }
  const textGeometry = new TextGeometry(
    "Embrace the journey,\nnot just the destination.",
    {
      font,
      size: fontSize,
      height: 0.2,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    }
  );
  textGeometry.computeBoundingBox();
  textGeometry.center();
  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTextures.greenCartoon,
  });
  const text = new THREE.Mesh(textGeometry, textMaterial);

  gui.add(text.position, "x").name("text Position").min(-10).max(10).step(0.01);

  scene.add(text);

  return text;
};
