import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import { resizeRendererToDisplaySize } from './resizeRendererToDisplaySize';

export function mapShadows(scene, camera, renderer) {

    scene.background = new THREE.Color('black');

    camera.fov = 45;
    camera.far = 100;
    camera.position.set(0, 10, 20);

    renderer.shadowMap.enabled = true;

    const canvas = document.querySelector('#canvas');

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const loader = new THREE.TextureLoader();
    const texture = loader.load('./checker.png');

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.repeat.set(20, 20);

    const planeGeometry = new THREE.PlaneBufferGeometry(40, 40);
    const planeMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide
    });

    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = Math.PI * -0.5;
    planeMesh.receiveShadow = true;

    scene.add(planeMesh);

    const cubeGeometry = new THREE.BoxBufferGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x88aacc });

    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cubeMesh.position.set(5, 2, 0);
    cubeMesh.castShadow = true;
    cubeMesh.receiveShadow = true;

    scene.add(cubeMesh);

    const sphereGeometry = new THREE.SphereBufferGeometry(3, 32, 16);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xccaa88 });

    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(-2, 5, 0);
    sphereMesh.castShadow = true;
    sphereMesh.receiveShadow = true;

    scene.add(sphereMesh);

    class ColorGUIHelper {
        constructor(object, prop) {
            this.object = object;
            this.prop = prop;
        }

        get value() {
            return `#${this.object[this.prop].getHexString()}`;
        }

        set value(hexString) {
            this.object[this.prop].set(hexString);
        }
    }

    class DegRadHelper {
        constructor(object, prop) {
            this.object = object;
            this.prop = prop;
        }
        get value() {
            return THREE.MathUtils.radToDeg(this.object[this.prop]);
        }
        set value(v) {
            this.object[this.prop] = THREE.MathUtils.degToRad(v);
        }
    }

    class DimensionGUIHelper {
        constructor(object, minProp, maxProp) {
            this.object = object;
            this.minProp = minProp;
            this.maxProp = maxProp;
        }

        get value() {
            return this.object[this.maxProp] * 2;
        }

        set value(v) {
            this.object[this.maxProp] = v / 2;
            this.object[this.minProp] = v / -2;
        }
    }

    class MinMaxGUIHelper {
        constructor(object, minProp, maxProp, minDif) {
            this.object = object;
            this.minProp = minProp;
            this.maxProp = maxProp;
            this.minDif = minDif;
        }

        get min() {
            return this.object[this.minProp];
        }

        set min(v) {
            this.object[this.minProp] = v;
            this.object[this.maxProp] = Math.max(this.object[this.maxProp], v + this.minDif);
        }

        get max() {
            return this.object[this.maxProp];
        }

        set max(v) {
            this.object[this.maxProp] = v;
            this.min = this.min;
        }
    }

    function makeXYZGUI(gui, vector3, name, onChange) {
        const folder = gui.addFolder(name);

        folder.add(vector3, 'x', -10, 10).onChange(onChange);
        folder.add(vector3, 'y', 0, 10).onChange(onChange);
        folder.add(vector3, 'z', -10, 10).onChange(onChange);

        folder.open();
    }

    const gui = new GUI();

    // 1. DirectionalLight
    // const light = new THREE.DirectionalLight(0xffffff, 1);
    // light.castShadow = true;
    // light.position.set(0, 10, 0);
    // light.target.position.set(-5, 0, 0);

    // scene.add(light);
    // scene.add(light.target);

    // const helper = new THREE.DirectionalLightHelper(light);
    // scene.add(helper);

    // function onChange() {
    //     light.target.updateMatrixWorld();
    //     helper.update();
    // }

    // onChange();

    // const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
    // scene.add(cameraHelper);

    // function updateCamera() {
    //     light.target.updateMatrixWorld();
    //     helper.update();

    //     light.shadow.camera.updateProjectionMatrix();
    //     cameraHelper.update();
    // }

    // updateCamera();

    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    // gui.add(light, 'intensity', 0, 2, 0.01);

    // const folder = gui.addFolder('Shadow Camera');
    // folder.open();

    // folder 
    //     .add(new DimensionGUIHelper(light.shadow.camera, 'left', 'right'), 'value', 1, 100)
    //     .name('width')
    //     .onChange(updateCamera);

    // folder 
    //     .add(new DimensionGUIHelper(light.shadow.camera, 'bottom', 'top'), 'value', 1, 100)
    //     .name('height')
    //     .onChange(updateCamera);

    // const minMaxGUIHelper = new MinMaxGUIHelper(light.shadow.camera, 'near', 'far', 0.1);
    // folder.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
    // folder.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);
    // folder.add(light.shadow.camera, 'zoom', 0.01, 1.5, 0.01).onChange(updateCamera);

    // makeXYZGUI(gui, light.position, 'position', updateCamera);
    // makeXYZGUI(gui, light.target.position, 'target', updateCamera);

    // 2. SpotLight
    // const light = new THREE.SpotLight(0xffffff, 1);
    // light.castShadow = true;
    // light.position.set(0, 10, 0);
    // light.target.position.set(-4, 0, -4);

    // scene.add(light);
    // scene.add(light.target);

    // const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
    // scene.add(cameraHelper);

    // function updateCamera() {
    //     light.target.updateMatrixWorld();
    //     light.shadow.camera.updateProjectionMatrix();
    //     cameraHelper.update();
    // }

    // updateCamera();
    // setTimeout(updateCamera);

    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    // gui.add(light, 'intensity', 0, 2, 0.01);
    // gui.add(light, 'distance', 0, 40).onChange(updateCamera);
    // gui.add(new DegRadHelper(light, 'angle'), 'value', 0, 90).name('angle').onChange(updateCamera);
    // gui.add(light, 'penumbra', 0, 1, 0.01);

    // const folder = gui.addFolder('Shadow Camera');
    // folder.open();

    // const minMaxGUIHelper = new MinMaxGUIHelper(light.shadow.camera, 'near', 'far', 0.1);
    // folder.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
    // folder.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);

    // makeXYZGUI(gui, light.position, 'position', updateCamera);
    // makeXYZGUI(gui, light.target.position, 'target', updateCamera);

    // 3. PointLight
    const light = new THREE.PointLight(0xffffff, 1);
    light.castShadow = true;
    light.position.set(0, 10, 0);
    scene.add(light);

    const helper = new THREE.PointLightHelper(light);
    scene.add(helper);

    function updateCamera() {}

    const boxGeomerty = new THREE.BoxBufferGeometry(30, 30, 30);
    const boxMaterial = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        side: THREE.BackSide,
    });

    const boxMesh = new THREE.Mesh(boxGeomerty, boxMaterial);
    boxMesh.receiveShadow = true;
    boxMesh.position.set(0, 14.9, 0);
    scene.add(boxMesh);

    gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    gui.add(light, 'intensity', 0, 2, 0.01);
    gui.add(light, 'distance', 0, 40).onChange(updateCamera);

    const folder = gui.addFolder('Shadow Camera');
    folder.open();

    const minMaxGUIHelper = new MinMaxGUIHelper(light.shadow.camera, 'near', 'far', 0.1);
    folder.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
    folder.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);

    makeXYZGUI(gui, light.position, 'position', updateCamera);

    function animate() {

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
    
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}
