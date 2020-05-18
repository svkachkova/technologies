import * as THREE from 'three';
import { resizeRendererToDisplaySize } from './resizeRendererToDisplaySize';

export function renderTargets(scene, camera, renderer) {
    camera.far = 5;
    camera.position.z = 3;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const renderTarget = new THREE.WebGLRenderTarget(512, 512, {
        depthBuffer: false,
        stencilBuffer: false,
    });

    const rtCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 2);
    rtCamera.position.z = 2;

    const rtScene = new THREE.Scene();
    rtScene.background = new THREE.Color('red');

    const rtLight = new THREE.DirectionalLight(0xffffff, 1);
    rtLight.position.set(-1, 2, 4);
    rtScene.add(rtLight);
    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    
    const rtCubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2)
    ];

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});
        const cube = new THREE.Mesh(geometry, material);
    
        rtScene.add(cube);
        cube.position.x = x;
    
        return cube;
    }

    const material = new THREE.MeshPhongMaterial({
        map: renderTarget.texture,
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    function animate(time) {
        time *= 0.001;
    
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderTarget.setSize(canvas.width, canvas.height);
        rtCamera.aspect = camera.aspect;
        rtCamera.updateProjectionMatrix();
    
        rtCubes.forEach((cube, index) => {
            const rot = time * (1 + 0.1 * index);;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });
    
        renderer.setRenderTarget(renderTarget);
        renderer.render(rtScene, rtCamera);
        renderer.setRenderTarget(null);

        cube.rotation.x = time;
        cube.rotation.y = time * 1.1;

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}
