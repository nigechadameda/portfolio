import { GLTFLoader } from './three/addons/loaders/GLTFLoader.js';
import * as THREE from './three';
import { EXRLoader } from './three/examples/jsm/loaders/EXRLoader.js';  // Ensure EXRLoader is correctly imported

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Set the renderer with alpha = true for transparency
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Set renderer tone mapping for better handling of high dynamic range (HDR) images like EXR
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// Load EXR environment map
const exrLoader = new EXRLoader();
exrLoader.load('/forest.exr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;  // Use EXR for environment lighting on objects

    // Keep the background transparent by setting scene.background to null
    scene.background = null;  // Background will be transparent
}, undefined, function (error) {
    console.error('Error loading EXR:', error);
});

// Load GLTF model
const loader = new GLTFLoader();
loader.load('untitled.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});

// Animation loop
function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

camera.position.z = 10;
camera.position.y = 3;
