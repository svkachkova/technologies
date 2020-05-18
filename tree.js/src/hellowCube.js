import * as THREE from 'three';
import { resizeRendererToDisplaySize } from './resizeRendererToDisplaySize';

export function helloCube(scene, camera, renderer) {
    camera.far = 5;
    camera.position.z = 3;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 2, 4);
    scene.add(light);
    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    
    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2)
    ];

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});
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
