import * as THREE from 'three';
import { scene, camera, renderer, controls, createCubeWithCanvasTexture, arrangeCubesInLine } from './sceneSetup.js';
import { makecandlechart } from './chart.js';

const symbols = ["DOGE", "BTC", "LTC", "ETH"];

const cubes = symbols.map(symbol => createCubeWithCanvasTexture(symbol));
arrangeCubesInLine(cubes);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject.userData.symbol) {
            const symbol = intersectedObject.userData.symbol;
            console.log('Cube clicked:', symbol);

            $.get('get_data.php', { symbol: symbol }, function(data) {
                if (data.error) {
                    console.error('Error:', data.error);
                    return;
                }
                console.log("Fetched data for symbol", symbol, data);
                makecandlechart(scene, data);
            });
        }
    }
}

window.addEventListener('click', onMouseClick, false);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

export { createCubeWithCanvasTexture, arrangeCubesInLine };
