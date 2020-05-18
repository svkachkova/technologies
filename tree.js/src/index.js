import * as THREE from 'three';

import { helloCube } from './hellowCube';
import { primitives } from './primitives';
import { solarSystem } from './solarSystem';
import { textures } from './textures';
import { lights } from './lights';
import { perspectiveCamera } from './perspectiveCamera';
import { orthographicCamera } from './orthographicCamera';
import { textureShadows } from './textureShadows';
import { mapShadows } from './mapShadows';
import { fog } from './fog';
import { renderTargets } from './renderTargets';
import { customGeometry } from './customGeometry';
import { customBufferGeometry } from './customBufferGeometry';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({canvas});

renderer.render(scene, camera);

// helloCube(scene, camera, renderer);
// primitives(scene, camera, renderer);
// solarSystem(scene, camera, renderer);
// textures(scene, camera, renderer);
// lights(scene, camera, renderer);
// perspectiveCamera(scene, camera, renderer);
// orthographicCamera(scene, camera, renderer);
// textureShadows(scene, camera, renderer);
// mapShadows(scene, camera, renderer);
// fog(scene, camera, renderer);
// renderTargets(scene, camera, renderer);
// customGeometry(scene, camera, renderer);
customBufferGeometry(scene, camera, renderer);
