import * as THREE from 'three';
import { resizeRendererToDisplaySize } from './resizeRendererToDisplaySize';

export function textures(scene, camera, renderer) {

    camera.far = 5;
    camera.position.z = 2;

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const cubes = [];
    const loader = new THREE.TextureLoader();

    const texture = loader.load('./img.png');

    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter ;

    // повтор
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    texture.repeat.set(2, 2);

    // смещение
    texture.offset.set(0.5, 0.25);

    // вращение
    texture.center.set(0.5, 0.5);
    texture.rotation = THREE.MathUtils.degToRad(45);
    
    const material = new THREE.MeshBasicMaterial({ map: texture });
    // const materials = [
    //     new THREE.MeshBasicMaterial({ map: texture }),
    //     new THREE.MeshBasicMaterial({ map: texture }),
    //     new THREE.MeshBasicMaterial({ map: texture }),
    //     new THREE.MeshBasicMaterial({ map: texture }),
    //     new THREE.MeshBasicMaterial({ map: texture }),
    //     new THREE.MeshBasicMaterial({ map: texture }),
    // ];

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cubes.push(cube);

    function animate(time) {
        time *= 0.001;
    
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, index) => {
            const rot = time * (0.2 + index * 0.1);
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        }); 
    
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}
