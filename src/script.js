import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./textures/matcaps/5.png");
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");
// mesh Normal material
// const material = new THREE.MeshNormalMaterial();
// material.side = THREE.DoubleSide;
// material.flatShading = true;

// matcap material
// const material = new THREE.MeshMatcapMaterial();

// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshPhongMaterial();
// material.side = THREE.DoubleSide;
// material.matcap = texture;
// material.specular = new THREE.Color("red");
// material.flatShading = true;

// const material = new THREE.MeshToonMaterial({ color: "pink" });
// material.side = THREE.DoubleSide;
// material.gradientMap = gradientTexture;
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.55;
material.side = THREE.DoubleSide;
material.metalness = 0.25;
// light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);
// mesh basic material
// const material = new THREE.MeshBasicMaterial({ map: texture });

// // material.wireframe = true;
// // material.opacity = 0.5;
// material.transparent = true;
// // material.alphaMap = texture;
// material.side = THREE.DoubleSide;
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 16, 16),
  material
);

sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), material);

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
  material
);
torus.position.x = 1.5;
scene.add(sphere, plane, torus);

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
camera.position.z = 2;
scene.add(camera);

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

const loop = () => {
  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.x = 0.2 * elapsedTime;
  plane.rotation.x = 0.2 * elapsedTime;
  torus.rotation.x = 0.2 * elapsedTime;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
