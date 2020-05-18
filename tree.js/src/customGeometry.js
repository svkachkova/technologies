import * as THREE from 'three';
import { resizeRendererToDisplaySize } from './resizeRendererToDisplaySize';

export function customGeometry(scene, camera, renderer) {
    camera.far = 100;
    camera.position.z = 5;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 2, 4);
    scene.add(light);
    
    const geometry = new THREE.Geometry();

    /*
       6----7
      /|   /|
     2----3 |
     | |  | |
     | 4--|-5
     |/   |/
     0----1/
    */

    // вершины куба
    geometry.vertices.push(
        new THREE.Vector3(-1,-1, 1),   // 0
        new THREE.Vector3( 1,-1, 1),   // 1
        new THREE.Vector3(-1, 1, 1),   // 2
        new THREE.Vector3( 1, 1, 1),   // 3
        new THREE.Vector3(-1,-1,-1),   // 4
        new THREE.Vector3( 1,-1,-1),   // 5
        new THREE.Vector3(-1, 1,-1),   // 6
        new THREE.Vector3( 1, 1,-1),   // 7
    );

    // по 2 треугольника для каждой стороны
    geometry.faces.push(
        new THREE.Face3(0, 3, 2),  // front
        new THREE.Face3(0, 1, 3),
        new THREE.Face3(1, 7, 3),  // right
        new THREE.Face3(1, 5, 7),
        new THREE.Face3(5, 6, 7),  // back
        new THREE.Face3(5, 4, 6),
        new THREE.Face3(4, 2, 6),  // left
        new THREE.Face3(4, 0, 2),
        new THREE.Face3(2, 7, 6),  // top
        new THREE.Face3(2, 3, 7),
        new THREE.Face3(4, 1, 0),  // bottom
        new THREE.Face3(4, 5, 1),
    );

    // свой цвет для каждой грани
    // geometry.faces[0].color = geometry.faces[1].color = new THREE.Color('red');
    // geometry.faces[2].color = geometry.faces[3].color = new THREE.Color('yellow');
    // geometry.faces[4].color = geometry.faces[5].color = new THREE.Color('green');
    // geometry.faces[6].color = geometry.faces[7].color = new THREE.Color('cyan');
    // geometry.faces[8].color = geometry.faces[9].color = new THREE.Color('blue');
    // geometry.faces[10].color = geometry.faces[11].color = new THREE.Color('magenta');
    
    // свой цвет у каждой вершины
    // geometry.faces.forEach((face, index) => {
    //     face.vertexColors = [
    //         (new THREE.Color()).setHSL(index / 12, 1, 0.5),
    //         (new THREE.Color()).setHSL(index / 12 + 0.1, 0.8, 0.7),
    //         (new THREE.Color()).setHSL(index / 12 + 0.2, 0.8, 0.7),
    //     ];
    // });

    // координаты для текстуры
    geometry.faceVertexUvs[0].push(
        // front
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
        // right
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
        // back
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
        // left
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
        // top
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
        // bottom
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1) ],
        [ new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1) ],
    ); 

    geometry.computeFaceNormals();

    const loader = new THREE.TextureLoader();
    const texture = loader.load('./star.png');

    const cubes = [
        makeInstance(geometry, 0x44ff44, 0),
        makeInstance(geometry, 0x4444ff, -4),
        makeInstance(geometry, 0xff4444, 4)
    ];

    function makeInstance(geometry, color, x) {
        // const material = new THREE.MeshPhongMaterial({ color });
        // const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
        // const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
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
