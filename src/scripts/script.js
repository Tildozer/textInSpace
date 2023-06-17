import * as THREE from "three";
import { loadFont } from "./fontLoader";
import { loadObjects } from "./objects";
import { loadTextures } from "./textures";
import GUI from "lil-gui";
/**
 * Base
 */
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
/**
 * Textures
 */
const matcapTextures = loadTextures();
/**
 * Fonts
 */
let textObj = await loadFont({ scene, matcapTextures });
/**
 * Object
 */
loadObjects({ scene, matcapTextures });
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", async () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 4;
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0x9fd300, 0.5);

const pointLight = new THREE.PointLight(0x9fd300, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
/**
 * Debug
 */
const gui = new GUI();

gui.add(textObj.text.rotation, "x").min(0).max(7).step(0.01);
gui.add(textObj.text.rotation, "y").min(0).max(7).step(0.01);
gui.add(textObj.text.rotation, "z").min(0).max(7).step(0.01);
gui.add(textObj.text.rotation, "x").min(0).max(7).step(0.01);

gui.hide();
/**
 * Animate
 */
const clock = new THREE.Clock();

scene.add(ambientLight, pointLight, camera);
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const amplitude = 0.5;
  // Update controls
  textObj.text.position.y = Math.sin(elapsedTime * 0.5) * amplitude;
  textObj.text.rotation.set(
    Math.cos(elapsedTime * 0.5) * 0.2,
    elapsedTime * 0.1,
    0
  );
  // Calculate camera position
  const distance = 5;
  const cameraAngle = elapsedTime * 0.1;
  const cameraX = Math.sin(cameraAngle) * distance;
  const cameraY = textObj.text.position.y;
  const cameraZ = Math.cos(cameraAngle) * distance;
  camera.position.set(cameraX, cameraY, cameraZ);
  // Set camera target
  const lookAtPos = new THREE.Vector3(0, textObj.text.position.y, 0);
  camera.lookAt(lookAtPos);
  // Render
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
