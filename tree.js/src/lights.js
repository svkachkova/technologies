import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';

import { resizeRendererToDisplaySize } from './resizeRendererToDisplaySize';

export function lights(scene, camera, renderer) {

    camera.fov = 45;
    camera.far = 100;
    camera.position.set(0, 10, 20);

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
    // const planeMaterial = new THREE.MeshPhongMaterial({
    //     map: texture,
    //     side: THREE.DoubleSide
    // });
    const planeMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide
    });

    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = Math.PI * -0.5;
    scene.add(planeMesh);

    const cubeGeometry = new THREE.BoxBufferGeometry(4, 4, 4);
    // const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x88aacc });
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x88aacc });

    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cubeMesh.position.set(5, 2, 0);
    scene.add(cubeMesh);

    const sphereGeometry = new THREE.SphereBufferGeometry(3, 32, 16);
    // const sphereMaterial = new THREE.MeshPhongMaterial({ 
    //     color: 0xccaa88,
    //     // flatShading: true 
    // });
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xccaa88 });

    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(-2, 5, 0);
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

    function makeXYZGUI(gui, vector3, name, onChange) {
        const folder = gui.addFolder(name);

        folder.add(vector3, 'x', -10, 10).onChange(onChange);
        folder.add(vector3, 'y', 0, 10).onChange(onChange);
        folder.add(vector3, 'z', -10, 10).onChange(onChange);

        folder.open();
    }

    const gui = new GUI();

    // 1. AmbientLight умножает цвет материала на цвет света с учетом интенсивности, нет направления
    // const light = new THREE.AmbientLight(0xffffff, 1);
    // scene.add(light);

    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    // gui.add(light, 'intensity', 0, 2, 0.01);

    // 2. HemisphereLight принимает цвет неба и основной цвет, умножает цвет материала между этими двумя цветами
    // const light = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 1);
    // scene.add(light);

    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('skyColor');
    // gui.addColor(new ColorGUIHelper(light, 'groundColor'), 'value').name('groundColor');
    // gui.add(light, 'intensity', 0, 2, 0.01);

    // 3. DirectionalLight направленный свет (бесконечная плоскость, излучающая параллельные лучи света)
    // часто используется для воспроизведения солнца
    // const light = new THREE.DirectionalLight(0xffffff, 1);
    // light.position.set(0, 10, 0);
    // light.target.position.set(-5, 0, 0);

    // scene.add(light);
    // scene.add(light.target);

    // const helper = new THREE.DirectionalLightHelper(light);
    // scene.add(helper);

    // function updateLight() {
    //     light.target.updateMatrixWorld();
    //     helper.update();
    // }

    // updateLight();

    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    // gui.add(light, 'intensity', 0, 2, 0.01);

    // makeXYZGUI(gui, light.position, 'position', updateLight);
    // makeXYZGUI(gui, light.target.position, 'target', updateLight);

    // 4. PointLight излучает свет во всех направлениях от заданной точки
    // const light = new THREE.PointLight(0xffffff, 1);
    // light.position.set(0, 10, 0);
    // scene.add(light);

    // const helper = new THREE.PointLightHelper(light);
    // scene.add(helper);

    // function updateLight() {
    //     helper.update();
    // }

    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    // gui.add(light, 'intensity', 0, 2, 0.01);
    // gui.add(light, 'distance', 0, 40).onChange(updateLight);

    // makeXYZGUI(gui, light.position, 'position', updateLight);

    // 5. SpotLight направленный свет (точечный источник света, светящий 
    // const light = new THREE.SpotLight(0xffffff, 1);
    // scene.add(light);
    // scene.add(light.target);

    // const helper = new THREE.SpotLightHelper(light);
    // scene.add(helper);

    // function updateLight() {
    //     light.target.updateMatrixWorld();
    //     helper.update();
    // }

    // updateLight();

    // gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    // gui.add(light, 'intensity', 0, 2, 0.01);
    // gui.add(light, 'distance', 0, 40).onChange(updateLight);
    // gui.add(new DegRadHelper(light, 'angle'), 'value', 0, 90).name('angle').onChange(updateLight);
    // gui.add(light, 'penumbra', 0, 1, 0.01);

    // makeXYZGUI(gui, light.position, 'position', updateLight);
    // makeXYZGUI(gui, light.target.position, 'target', updateLight);

    // * physicallyCorrectLights - как свет падает в зависимости от расстояния до предмета
    // для PointLight и SpotLight
    // renderer.physicallyCorrectLights = true;

    // light.power = 800;          // сила света в люменах
    // light.decay = 2;            // распад (2 для реализма)
    // light.distance = Infinity;  // расстояние

    // gui.add(light, 'decay', 0, 4, 0.01);
    // gui.add(light, 'power', 0, 2000);

    // 6. RectAreaLight прямоугольную область света
    // работает только с MeshStandardMaterai и MeshPhysicalMaterial
    RectAreaLightUniformsLib.init();

    const light = new THREE.RectAreaLight(0xffffff, 5, 12, 4);
    light.position.set(0, 10, 0);
    light.rotation.x = THREE.MathUtils.degToRad(-90);

    scene.add(light);

    const helper = new RectAreaLightHelper(light);
    light.add(helper);

    function updateLight() {
        helper.update();
    }

    gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    gui.add(light, 'intensity', 0, 10, 0.01);
    gui.add(light, 'width', 0, 20).onChange(updateLight);
    gui.add(light, 'height', 0, 20).onChange(updateLight);

    gui.add(new DegRadHelper(light.rotation, 'x'), 'value', -180, 180).name('x rotation').onChange(updateLight);
    gui.add(new DegRadHelper(light.rotation, 'y'), 'value', -180, 180).name('y rotation').onChange(updateLight);
    gui.add(new DegRadHelper(light.rotation, 'z'), 'value', -180, 180).name('z rotation').onChange(updateLight);

    makeXYZGUI(gui, light.position, 'position', updateLight);

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
