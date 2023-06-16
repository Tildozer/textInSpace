import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { loadFont } from "./fontLoader";
import { loadObjects } from "./objects";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTextures = {
  greenCartoon: textureLoader.load("/textures/matcaps/7.png"),
  shinyYellow: textureLoader.load("/textures/matcaps/10.png"),
  foamGreen: textureLoader.load("/textures/matcaps/11.png"),
};

/**
 * Fonts
 */

const text = await loadFont({ gui, scene, matcapTextures });

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

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  console.log(sizes.width);
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 4;
scene.add(camera);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

scene.add(ambientLight, pointLight)


// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

// window.addEventListener("mouseover", () => {
  
// });
console.log(text)
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const amplitude = 0.5;

  // Update controls
  controls.update();
  text.position.y = Math.sin(elapsedTime * 0.5) * amplitude;
  text.rotation.y = elapsedTime * 0.10;


  // Calculate camera position
  const distance = 5; // Adjust the distance between the camera and the text
  const cameraAngle = elapsedTime * 0.1; // Adjust the camera rotation speed
  const cameraX = Math.sin(cameraAngle) * distance;
  const cameraZ = Math.cos(cameraAngle) * distance;
  camera.position.set(cameraX, 0, cameraZ);

  // Set camera target
  camera.lookAt(text.position);


  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
