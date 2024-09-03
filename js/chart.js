import * as THREE from 'three';

const wickmat = new THREE.MeshStandardMaterial({ color: 'black', roughness: 0.8 });

function makebar(x, y, z, sx, sy, sz, c) {
    const barmat = new THREE.MeshStandardMaterial({ color: c, roughness: 0.8 });
    const geometry = new THREE.BoxGeometry(sx, sy, sz);
    const cube = new THREE.Mesh(geometry, barmat);
    cube.position.set(x, y, z);
    cube.castShadow = true;
    return cube;
}

function makewick(x, y, z, sx, sy, sz) {
    const geometry = new THREE.BoxGeometry(sx, sy, sz);
    const cube = new THREE.Mesh(geometry, wickmat);
    cube.position.set(x, y, z);
    cube.castShadow = false;
    return cube;
}

function makecandlechart(scene, data) {
    console.log("makecandlechart: Received data", data);

    if (!data || !Array.isArray(data.daily)) {
        console.error("Invalid data format", data);
        return;
    }

    const chartdata = data.daily;
    console.log("makecandlechart: Processed chart data", chartdata);

    const totalbars = chartdata.length;
    const bars = [];
    const wicks = [];
    let count = 0;

    // Determine the scaling factors
    const maxHigh = Math.max(...chartdata.map(d => d.high));
    const minLow = Math.min(...chartdata.map(d => d.low));
    const chartHeight = 10; // Define the height of the chart in units
    const scaleY = chartHeight / (maxHigh - minLow);

    const barWidth = 0.5; // Width of each candle
    const barDepth = 0.3; // Depth of each candle
    const spacing = 0.7; // Spacing between candles

    for (let x = 0; x < totalbars; x++) {
        const dataPoint = chartdata[x];
        const barsize = Math.abs(dataPoint.close - dataPoint.open) * scaleY;
        const wicksize = (dataPoint.high - dataPoint.low) * scaleY;
        const barColor = dataPoint.close > dataPoint.open ? 'green' : 'red';

        const barY = ((dataPoint.open + dataPoint.close) / 2 - minLow) * scaleY;
        const wickY = ((dataPoint.high + dataPoint.low) / 2 - minLow) * scaleY;

        const bar = makebar(count * spacing, barY, 0, barWidth, barsize, barDepth, barColor);
        scene.add(bar);
        bars.push(bar);
        console.log(`makecandlechart: Added bar at x=${count * spacing}, barY=${barY}, barsize=${barsize}`);

        const wick = makewick(count * spacing, wickY, 0, barWidth * 0.1, wicksize, barDepth * 0.1);
        scene.add(wick);
        wicks.push(wick);
        console.log(`makecandlechart: Added wick at x=${count * spacing}, wickY=${wickY}, wicksize=${wicksize}`);

        count++;
    }
}

export { makecandlechart };
