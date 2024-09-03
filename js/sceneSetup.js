import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Initialize scene, camera, renderer, and controls
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 2, 10);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.getElementById('scene-container').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Add light sources
const ambientLight = new THREE.AmbientLight(0xcccccc, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

const charcoalMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 1 });

function createCubeWithCanvasTexture(symbol) {
    const size = 1;
    const geometry = new THREE.BoxGeometry(size, size, size);

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'black';
    context.font = 'bold 60px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(symbol, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });

    const materials = [
        charcoalMaterial,
        charcoalMaterial,
        charcoalMaterial,
        charcoalMaterial,
        textureMaterial,
        charcoalMaterial
    ];

    const cube = new THREE.Mesh(geometry, materials);
    cube.userData = { symbol };
    return cube;
}

function arrangeCubesInLine(cubes, distance = 2) {
    cubes.forEach((cube, i) => {
        cube.position.set(i * distance - (cubes.length - 1) * distance / 2, 0, 0);
        scene.add(cube);
    });
}

function handleWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);

export { scene, camera, renderer, controls, createCubeWithCanvasTexture, arrangeCubesInLine };
