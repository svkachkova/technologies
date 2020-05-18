import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import { resizeRendererToDisplaySize } from './resizeRendererToDisplaySize';

export function orthographicCamera(scene, camera, renderer) {

    // проецирует box (прямоугольный паралелепипед), перспективы нет
    // чаще всего используется для рисования 2d-объектов

    camera = null;
    renderer = null;

    scene.background = new THREE.Color('black');

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);

    const split = document.createElement('div');
    split.classList.add('split');
    split.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
    `;

    for (let i = 1; i <= 2; i++) {
        const view = document.createElement('div');
        view.id = `view${i}`;
        view.setAttribute('tabidex', i);
        view.style.cssText = 'width: 100%; height: 100%;';
        split.appendChild(view);
    }

    document.body.appendChild(split);

    const canvas = document.querySelector('#canvas');

    const view1 = document.querySelector('#view1');
    const view2 = document.querySelector('#view2');

    renderer = new THREE.WebGLRenderer({canvas});

    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 5, 50);
    camera.zoom = 0.2;
    camera.position.set(0, 10, 20);

    const camera2 = new THREE.PerspectiveCamera(60, 2, 0.1, 500);
    camera2.position.set(15, 30, 40);
    camera2.lookAt(0, 5, 0);

    const cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);

    const controls = new OrbitControls(camera, view1);
    controls.target.set(0, 5, 0);
    controls.update();

    const controls2 = new OrbitControls(camera2, view2);
    controls2.target.set(0, 5, 0);
    controls2.update();

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
    scene.add(planeMesh);

    const cubeGeometry = new THREE.BoxBufferGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x88aacc });

    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cubeMesh.position.set(5, 2, 0);
    scene.add(cubeMesh);

    const sphereGeometry = new THREE.SphereBufferGeometry(3, 32, 16);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xccaa88 });

    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(-2, 5, 0);
    scene.add(sphereMesh);

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

    function setScissorForElement(element) {
        const canvasRect = canvas.getBoundingClientRect();
        const elemRect = element.getBoundingClientRect();
       
        const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
        const left = Math.max(0, elemRect.left - canvasRect.left);
        const bottom = Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
        const top = Math.max(0, elemRect.top - canvasRect.top);
       
        const width = Math.min(canvasRect.width, right - left);
        const height = Math.min(canvasRect.height, bottom - top);
       
        renderer.setScissor(left, top, width, height);
        renderer.setViewport(left, top, width, height);

        return width / height;
    }

    const gui = new GUI();
    gui.add(camera, 'zoom', 0.01, 1, 0.01).listen();

    const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
    gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near');
    gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far');

    function animate() {

        resizeRendererToDisplaySize(renderer);
        renderer.setScissorTest(true);

        {
            const aspect = setScissorForElement(view1);
            camera.left = -aspect;
            camera.right = aspect;

            camera.updateProjectionMatrix();
            cameraHelper.update();

            cameraHelper.visible = false;
            scene.background.set(0x000000);

            renderer.render(scene, camera);
        }

        {
            const aspect = setScissorForElement(view2);
            camera2.aspect = aspect;
            camera2.updateProjectionMatrix();

            cameraHelper.visible = true;
            scene.background.set(0x000040);
    
            renderer.render(scene, camera2);
        }
    
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}
