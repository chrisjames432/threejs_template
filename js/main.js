import { createCubeWithCanvasTexture, arrangeCubesInLine } from './scene.js';

$(document).ready(function() {
    $('.symbol-list a').click(function() {
        var symbol = $(this).data('symbol');
        console.log('Symbol clicked:', symbol);
        
        // Create a cube for the clicked symbol and arrange it in the scene
        const cube = createCubeWithCanvasTexture(symbol);
        arrangeCubesInLine([cube]);
    });
});
