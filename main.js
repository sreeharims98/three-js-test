import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

//lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight1.position.set(1, 0, 0);
// scene.add(directionalLight1);

// const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight2.position.set(-1, 0, 0);
// scene.add(directionalLight2);

//texture
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load(
//   "https://bruno-simon.com/prismic/matcaps/3.png"
// );

// Create a variable to hold the model
let model;

//3dmodel

const loader = new GLTFLoader();
loader.load(
  "/scene.gltf",
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error(error);
  }
);

//cube
// const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 22);
// const material = new THREE.MeshMatcapMaterial({ matcap: texture });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(2);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = true;

// Update model rotation on mouse move
document.addEventListener("mousemove", onDocumentMouseMove, false);

function onDocumentMouseMove(event) {
  event.preventDefault();
  // Calculate normalized device coordinates (-1 to +1)
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth - 0.5) * 10;
  mouse.y = (-(event.clientY / window.innerHeight) + 0.5) * 10;

  // Calculate the 3D position of the cursor in world coordinates
  const cursorPosition = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(
    camera
  );
  // Update the rotation of the model to look at the cursor position
  if (model && cursorPosition) {
    model.lookAt(cursorPosition);
  }
}

// Render the scene
function render() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

render();
