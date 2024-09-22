import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/loaders/GLTFLoader.js';
import { EXRLoader } from 'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/loaders/EXRLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set the renderer with alpha = true for transparency
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set renderer tone mapping for HDR
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// Load EXR environment map
const exrLoader = new EXRLoader();
exrLoader.load('./forest.exr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = null;  // Keep background transparent
}, undefined, function (error) {
    console.error('Error loading EXR:', error);
});

// Load GLTF model
const loader = new GLTFLoader();
loader.load('./untitled.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});

// Animation loop
function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Camera positioning
camera.position.z = 10;
camera.position.y = 3;

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
