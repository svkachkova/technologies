import * as THREE from 'three';
import { resizeRendererToDisplaySize } from './resizeRendererToDisplaySize';

export function primitives(scene, camera, renderer) {
    scene.background = new THREE.Color(0xcccccc);

    camera.fov = 40;
    camera.position.z = 120;
    
    {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }
    
    {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, -2, -4);
        scene.add(light);
    }

    const objects = [];
    const spread = 15;

    addSolidGeometry(-2, 2, new THREE.BoxBufferGeometry(8, 8, 8));          // куб
    addSolidGeometry(-1, 2, new THREE.CircleBufferGeometry(7, 24));         // круг
    addSolidGeometry(0, 2, new THREE.ConeBufferGeometry(6, 8, 16));         // конус 
    addSolidGeometry(1, 2, new THREE.CylinderBufferGeometry(4, 4, 8, 12));  // цилиндр
    addSolidGeometry(2, 2, new THREE.DodecahedronBufferGeometry(7));        // 12 граней

    addSolidGeometry(-2, 1, new THREE.IcosahedronBufferGeometry(7));        // 20 граней
    addSolidGeometry(-1, 1, new THREE.OctahedronBufferGeometry(7));         // 8 граней
    {
        // форма, созданная вращением линии
        const points = [];
        for (let i = 0; i < 10; ++i) {
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
        }
        addSolidGeometry(0, 1, new THREE.LatheBufferGeometry(points));
    }
      {
        // выдавленная 2d фигура с скругленными краями
        const shape = new THREE.Shape();
        const x = -2.5;
        const y = -5;
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    
        const extrudeSettings = {
            steps: 2,
            depth: 2,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 2,
        };
    
        addSolidGeometry(1, 1, new THREE.ExtrudeBufferGeometry(shape, extrudeSettings));
    }
    {
        // функция берет 2d точку из сетки и возвращает соответствующую 3d точку
        function klein(v, u, target) {
            u *= Math.PI;
            v *= 2 * Math.PI;
            u = u * 2;
      
            let x;
            let z;
      
            if (u < Math.PI) {
                x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
                z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
            } else {
                x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
                z = -8 * Math.sin(u);
            }
      
            const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);
      
            target.set(x, y, z).multiplyScalar(0.75);
        }
        addSolidGeometry(2, 1, new THREE.ParametricBufferGeometry(klein, 25, 25));
    }

    addSolidGeometry(-2, 0, new THREE.SphereBufferGeometry(7, 8, 6));   // сфера
    addSolidGeometry(-1, 0, new THREE.PlaneBufferGeometry(9, 9, 2, 2)); // 2d плоскость
    addSolidGeometry(0, 0, new THREE.RingBufferGeometry(2, 7, 12));     // 2d диск с отверстием в центре
    {
        // 2d контур, который строится из треугольников
        const shape = new THREE.Shape();
        const x = -2.5;
        const y = -5;
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

        addSolidGeometry(1, 0, new THREE.ShapeBufferGeometry(shape));
    }
    {
        // берет набор треугольников с центром вокруг точки и проецирует их на сферу
        const verticesOfCube = [
            -1, -1, -1,    1, -1, -1,    1,  1, -1,    -1,  1, -1,
            -1, -1,  1,    1, -1,  1,    1,  1,  1,    -1,  1,  1,
        ];
        const indicesOfFaces = [
            2, 1, 0,    0, 3, 2,
            0, 4, 7,    7, 3, 0,
            0, 1, 5,    5, 4, 0,
            1, 2, 6,    6, 5, 1,
            2, 3, 7,    7, 6, 2,
            4, 5, 6,    6, 7, 4,
        ];
        addSolidGeometry(2, 0, new THREE.PolyhedronBufferGeometry(verticesOfCube, indicesOfFaces, 7, 2));
    }

    addSolidGeometry(-2, -1, new THREE.TetrahedronBufferGeometry(7));       // тераэдр 
    addSolidGeometry(-1, -1, new THREE.TorusBufferGeometry(5, 2, 8, 16));   // тор
    addSolidGeometry(0, -1, new THREE.TorusKnotBufferGeometry(3.5, 1.5, 64, 8, 2, 3));  // торический узел
    {
        // труба - круг проходящий путь
        class CustomSinCurve extends THREE.Curve {
            constructor(scale) {
                super();
                this.scale = scale;
            }
            getPoint(t) {
                const tx = t * 3 - 1.5;
                const ty = Math.sin(2 * Math.PI * t);
                const tz = 0;
                return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
            }
        }
    
        const path = new CustomSinCurve(4);
        addSolidGeometry(1, -1, new THREE.TubeBufferGeometry(path, 20, 1, 8, false));
    }
    {
        // 3d-текст, сгенерированный из 3d-шрифта и строки
        const loader = new THREE.FontLoader();
        function loadFont(url) {
            return new Promise((resolve, reject) => {
                loader.load(url, resolve, undefined, reject);
            });
        }
    
        async function doit() {
            const font = await loadFont('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json');  
            const geometry = new THREE.TextBufferGeometry('three.js', {
                font: font,
                size: 3.0,
                height: .2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.15,
                bevelSize: .3,
                bevelSegments: 5,
            });
            const mesh = new THREE.Mesh(geometry, createMaterial());
            geometry.computeBoundingBox();
            geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);
        
            const parent = new THREE.Object3D();
            parent.add(mesh);
        
            addObject(2, -1, parent);
        }
        doit();
    }
    
    // из принимаемой на вход геометрии генерирует ребра, если угол между гранями больше заданного
    addLineGeometry(-1, -2, new THREE.EdgesGeometry(new THREE.BoxBufferGeometry(8, 8, 8), 15));
    // создает геометрию, которая содержит один отрезок (2 точки) на ребро в заданной геометрии.
    addLineGeometry(1, -2, new THREE.WireframeGeometry(new THREE.BoxBufferGeometry(8, 8, 8)));

    function addSolidGeometry(x, y, geometry) {
        const mesh = new THREE.Mesh(geometry, createMaterial());
        addObject(x, y, mesh);
    }

    function addLineGeometry(x, y, geometry) {
        const material = new THREE.LineBasicMaterial({color: 0x000000});
        const mesh = new THREE.LineSegments(geometry, material);
        addObject(x, y, mesh);
    }

    function createMaterial() {
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide
        });

        const hue = Math.random();
        const saturation = 0.8;
        const lumianance = 0.7;

        material.color.setHSL(hue, saturation, lumianance);

        return material;
    }

    function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;

        scene.add(obj);
        objects.push(obj);
    }

    function animate(time) {
        time *= 0.001;
    
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        objects.forEach((object, index) => {
            const rot = time * (0.1 + 0.05 * index);;
            object.rotation.x = rot;
            object.rotation.y = rot;
        }); 
    
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}
