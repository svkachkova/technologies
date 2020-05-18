import * as THREE from 'three';
import { resizeRendererToDisplaySize } from './resizeRendererToDisplaySize';

export function customBufferGeometry(scene, camera, renderer) {
    camera.far = 100;
    camera.position.z = 5;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const vertices = [
        // front
        { pos: [-1,-1, 1], norm: [0, 0, 1], uv: [0, 1], },  // 0
        { pos: [ 1,-1, 1], norm: [0, 0, 1], uv: [1, 1], },  // 1
        { pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 0], },  // 2
        { pos: [ 1, 1, 1], norm: [0, 0, 1], uv: [1, 0], },  // 3

        // right
        { pos: [ 1,-1, 1], norm: [1, 0, 0], uv: [0, 1], },  // 4
        { pos: [ 1,-1,-1], norm: [1, 0, 0], uv: [1, 1], },  // 5
        { pos: [ 1, 1, 1], norm: [1, 0, 0], uv: [0, 0], },  // 6
        { pos: [ 1, 1,-1], norm: [1, 0, 0], uv: [1, 0], },  // 7

        // back
        { pos: [ 1,-1,-1], norm: [0, 0, -1], uv: [0, 1], }, // 8
        { pos: [-1,-1,-1], norm: [0, 0, -1], uv: [1, 1], }, // 9
        { pos: [ 1, 1,-1], norm: [0, 0, -1], uv: [0, 0], }, // 10
        { pos: [-1, 1,-1], norm: [0, 0, -1], uv: [1, 0], }, // 11

        // left
        { pos: [-1,-1,-1], norm: [-1, 0, 0], uv: [0, 1], }, // 12
        { pos: [-1,-1, 1], norm: [-1, 0, 0], uv: [1, 1], }, // 13
        { pos: [-1, 1,-1], norm: [-1, 0, 0], uv: [0, 0], }, // 14
        { pos: [-1, 1, 1], norm: [-1, 0, 0], uv: [1, 0], }, // 15

        // top
        { pos: [ 1, 1,-1], norm: [0, 1, 0], uv: [0, 1], },  // 16
        { pos: [-1, 1,-1], norm: [0, 1, 0], uv: [1, 1], },  // 17
        { pos: [ 1, 1, 1], norm: [0, 1, 0], uv: [0, 0], },  // 18
        { pos: [-1, 1, 1], norm: [0, 1, 0], uv: [1, 0], },  // 19

        // bottom
        { pos: [ 1,-1, 1], norm: [0, -1, 0], uv: [0, 1], }, // 20
        { pos: [-1,-1, 1], norm: [0, -1, 0], uv: [1, 1], }, // 21
        { pos: [ 1,-1,-1], norm: [0, -1, 0], uv: [0, 0], }, // 22
        { pos: [-1,-1,-1], norm: [0, -1, 0], uv: [1, 0], }, // 23
    ];

    const positions = new Float32Array(vertices.length * 3);
    const normals = new Float32Array(vertices.length * 3);
    const uvs = new Float32Array(vertices.length * 2);

    let [posIndex, normIndex, uvIndex] = [0, 0, 0];

    for (const vertex of vertices) {
        positions.set(vertex.pos, posIndex);
        normals.set(vertex.norm, normIndex);
        uvs.set(vertex.uv, uvIndex);

        posIndex += 3;
        normIndex += 3;
        uvIndex += 2;
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    geometry.setIndex([
         0,  1,  2,   2,  1,  3,  // front
         4,  5,  6,   6,  5,  7,  // right
         8,  9, 10,  10,  9, 11,  // back
        12, 13, 14,  14, 13, 15,  // left
        16, 17, 18,  18, 17, 19,  // top
        20, 21, 22,  22, 21, 23,  // bottom
    ]);

    const loader = new THREE.TextureLoader();
    const texture = loader.load('./star.png');
    
    const cubes = [
        makeInstance(geometry, 0x44ff44, 0),
        makeInstance(geometry, 0x4444ff, -4),
        makeInstance(geometry, 0xff4444, 4)
    ];

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color, map: texture });
        const cube = new THREE.Mesh(geometry, material);
    
        scene.add(cube);
        cube.position.x = x;
    
        return cube;
    }
    
    function animate(time) {
        time *= 0.001;
    
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
    
        cubes.forEach((cube, index) => {
            const rot = time * (1 + 0.1 * index);;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });
    
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}
