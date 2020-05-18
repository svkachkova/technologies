import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import { resizeRendererToDisplaySize } from './resizeRendererToDisplaySize';

export function solarSystem(scene, camera, renderer) {

    camera.fov = 40;

    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0 ,0);

    const light = new THREE.PointLight(0xffffff, 3);
    scene.add(light);

    const gui = new GUI();

    const objects = [];

    const sphereGeometry  = new THREE.SphereBufferGeometry(1, 6, 6);

    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);

    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);

    earthOrbit.add(earthMesh);
    objects.push(earthMesh);

    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);
    objects.push(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x88888888, emissive: 0x22222222 });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.5, 0.5, 0.5);

    moonOrbit.add(moonMesh);
    objects.push(moonMesh);

    class AxisGridHelper {
        constructor(node, units = 10) {
            const axes = new THREE.AxesHelper();
            axes.material.depthTest = false;
            axes.renderOrder = 1;
            node.add(axes);

            const grid = new THREE.GridHelper(units, units);
            axes.material.depthTest = false;
            axes.renderOrder = 2;
            node.add(grid);

            this.grid = grid;
            this.axes = axes;
            this.visible = false;
        }
    
        get visible() {
            return this._visible;
        }
    
        set visible(v) {
            this._visible = v;
            this.grid.visible = v;
            this.axes.visible = v;
        }
    }

    function makeAxisGrid(node, label, units) {
        const helper = new AxisGridHelper(node, units);
        gui.add(helper, 'visible').name(label);
    }

    makeAxisGrid(solarSystem, 'solarSystem', 26);
    makeAxisGrid(sunMesh, 'sunMesh');
    makeAxisGrid(earthOrbit, 'earthOrbit');
    makeAxisGrid(earthMesh, 'earthMesh');
    makeAxisGrid(moonMesh, 'moonMesh');

    function animate(time) {
        time *= 0.001;
    
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        objects.forEach((object) => {
            object.rotation.y = time;
        }); 
    
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}
