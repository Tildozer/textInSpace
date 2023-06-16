import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { loadFont } from "./fontLoader";
import { loadObjects } from "./objects";
import { loadTextures } from "./textures";

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
const findFontSize = () => {
  let width = window.innerWidth;
  if(width < 553) {
    return 0.2;
  } else if( width < 788) {
    return 0.3;
  } else if(width < 950) {
    return 0.4;
  } else {
    return 0.5;
  }
};

let textObj = await loadFont({ scene, matcapTextures, findFontSize,});
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
  console.log(sizes.width);
  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // Update Font
  let fontSize = findFontSize();
  if(fontSize !== textObj.textGeometry.parameters.options.size){
    textObj.textGeometry.dispose();
    scene.remove(textObj.text);
    textObj = await loadFont({ scene, matcapTextures, findFontSize, });
  }
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

// window.addEventListener("mousemove", (ev) => {
//   console.log(ev.clientY);
//   textObj.text.rotation.x = ev.clientY * 0.0005;
// });

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const amplitude = 0.5;

  // Update controls
  controls.update();
  textObj.text.position.y = Math.sin(elapsedTime * 0.5) * amplitude;
  textObj.text.rotation.y = elapsedTime * 0.10;


  // Calculate camera position
  const distance = 5; // Adjust the distance between the camera and the text
  const cameraAngle = elapsedTime * 0.1; // Adjust the camera rotation speed
  const cameraX = Math.sin(cameraAngle) * distance;
  const cameraZ = Math.cos(cameraAngle) * distance;
  camera.position.set(cameraX, 0, cameraZ);

  // Set camera target
  camera.lookAt(textObj.text.position);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
