import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import { resizeRendererToDisplaySize } from './resizeRendererToDisplaySize';

export function fog(scene, camera, renderer) {

    camera.far = 5;
    camera.position.z = 2;

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

    class FogGUIHelper {
        constructor(fog, backgroundColor) {
            this.fog = fog;
            this.backgroundColor = backgroundColor;
        }

        get near() {
            return this.fog.near;
        }

        set near(v) {
            this.fog.near = v;
            this.fog.far = Math.max(this.fog.far, v);
        }

        get far() {
            return this.fog.far;
        }

        set far(v) {
            this.fog.far = v;
            this.fog.near = Math.min(this.fog.near, v);
        }

        get color() {
            return `#${this.fog.color.getHexString()}`;
        }

        set color(hexString) {
            this.fog.color.set(hexString);
            this.backgroundColor.set(hexString);
        }
    }

    const color = 'lightblue';

    // Fog
    const near = 1;
    const far = 3;
    scene.fog = new THREE.Fog(color, near, far);

    // FogExp2
    // scene.fog = new THREE.FogExp2(color, 0.1);

    scene.background = new THREE.Color(color);

    const gui = new GUI();

    const fogGUIHelper = new FogGUIHelper(scene.fog, scene.background);
    gui.add(fogGUIHelper, 'near', near, far).listen();
    gui.add(fogGUIHelper, 'far', near, far).listen();
    gui.addColor(fogGUIHelper, 'color');
    
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
