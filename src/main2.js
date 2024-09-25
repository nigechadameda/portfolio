import '../style.css'

import * as THREE from '/libs/three.module.min.js';
//import { OrbitControls } from '/libs/three.module.min.js/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xff6347 } );
const torus = new THREE.Mesh( geometry, material );
const pointLight = new THREE.PointLight(0xffffff, 100);
const ambientLight = new THREE.AmbientLight(0xffffff);
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
//const controls = new OrbitControls(camera, renderer.domElement);
const underwaterTexture = new THREE.TextureLoader().load('./underwater.jpeg')
const color1 = new THREE.Color( 0x002e56 );

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(50);
scene.background = underwaterTexture;
scene.backgroundIntensity = 0.5;
pointLight.position.set(20, 0, 0);

scene.add( 
    lightHelper, 
    gridHelper, 
    pointLight, 
    ambientLight,
    torus
);

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update the camera's aspect ratio and projection matrix
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Resize the renderer to match the new window size
    renderer.setSize(width, height);
});

function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    //controls.update();

    renderer.render( scene, camera );
}

animate();
