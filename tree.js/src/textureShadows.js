import * as THREE from 'three';
import { resizeRendererToDisplaySize } from './resizeRendererToDisplaySize';

export function textureShadows(scene, camera, renderer) {

    scene.background = new THREE.Color('white');

    camera.fov = 45;
    camera.far = 100;
    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);

    renderer.physicallyCorrectLights = true;

    {
        const light = new THREE.HemisphereLight(0xb1e1ff, 0xb97a20, 2);
        scene.add(light);
    }

    {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 10, 5);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
    }

    const loader = new THREE.TextureLoader();
    const texture = loader.load('./checker.png');

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.repeat.set(20, 20);

    const planeGeometry = new THREE.PlaneBufferGeometry(40, 40);
    const planeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });
    planeMaterial.color.setRGB(1.5, 1.5, 1.5);

    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = Math.PI * -0.5;
    scene.add(planeMesh);

    const sphereShadowBases =[];

    const shadowTexture = loader.load('./roundshadow.png');

    const shadowGeometry = new THREE.PlaneBufferGeometry(1, 1);
    const sphereGeometry = new THREE.SphereBufferGeometry(1, 32, 16);

    for (let i = 0; i < 15; i++) {
        const base = new THREE.Object3D();
        scene.add(base);

        const shadowMaterial = new THREE.MeshBasicMaterial({
            map: shadowTexture,
            transparent: true,
            depthWrite: false,
        });

        const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
        shadowMesh.position.y = 0.001;
        shadowMesh.rotation.x = Math.PI * -0.5;
        shadowMesh.scale.set(4, 4, 4);

        const sphereMaterial = new THREE.MeshPhongMaterial();
        sphereMaterial.color.setHSL(i / 15, 1, 0.75);

        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereMesh.position.set(0, 3, 0);

        base.add(shadowMesh);
        base.add(sphereMesh);

        sphereShadowBases.push({
            base,
            sphereMesh,
            shadowMesh,
            y: sphereMesh.position.y,
        });
    }

    function animate(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        sphereShadowBases.forEach((sphereShadowBase, index) => {
            const {base, sphereMesh, shadowMesh, y} = sphereShadowBase;
            const u = index / sphereShadowBases.length;

            const angle = (time * 0.2) + (u * Math.PI * 2 * (index % 1 ? 1 : -1));
            const radius = Math.sin(time * 0.2 - index) * 10;
            base.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

            const yOff = Math.abs(Math.sin(time * 2 + index));
            sphereMesh.position.y = y + THREE.MathUtils.lerp(-2, 2, yOff);
            shadowMesh.material.opacity = THREE.MathUtils.lerp(1, 0.25, yOff);
        });
    
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}
