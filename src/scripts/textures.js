import * as THREE from "three";

export const loadTextures = () => {
    const textureLoader = new THREE.TextureLoader();
    const matcapTextures = {
      greenCartoon: textureLoader.load("/textures/matcaps/7.png"),
      shinyYellow: textureLoader.load("/textures/matcaps/10.png"),
      heatMap: textureLoader.load("/textures/matcaps/heatMap.png"),
    };
    return matcapTextures;
}