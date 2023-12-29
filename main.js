import * as THREE from 'three';
import Particle from './particle';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2f2f2);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Events
document.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);

// Capacitor plates
const geometry = new THREE.CylinderGeometry(5, 5, 0.5, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x454545 });
var upperCapacitorPlate = new THREE.Mesh(geometry, material);
var lowerCapacitorPlate = new THREE.Mesh(geometry, material);
upperCapacitorPlate.translateY(5);
lowerCapacitorPlate.translateY(-5);
scene.add(upperCapacitorPlate);
scene.add(lowerCapacitorPlate);

// Glass
const geometry2 = new THREE.CylinderGeometry(5, 5, 9.5, 32, undefined, true);
var material2 = new THREE.MeshBasicMaterial({ color: 0x9ed2ff });
material2.transparent = true;
material2.opacity = 0.5;
var glass = new THREE.Mesh(geometry2, material2);
scene.add(glass);

// Animation loop
var stop = false;
var t = 0;
var tm_new;
var dt;

let particles = [];

function animate(tm_old) {
	tm_new = new Date().getTime();
	dt = (tm_new - tm_old) / 1000;
	t = t + dt;

	if (stop) {
		return;
	}

	for (let i = 0; i < particles.length; i++) {
		if (particles[i].object.position.y > 4.7 || particles[i].object.position.y < -4.7) {
			scene.remove(particles[i].object);
			particles.splice(i, 1);
			continue;
		}

		particles[i].updateParticle(dt);
	}

	requestAnimationFrame(() => {
		animate(tm_new);
	});

	controls.update();

	renderer.render(scene, camera);
}

animate(new Date().getTime());

export function generateParticles(n) {
	console.clear();
	for (let i = 0; i < n; i++) {
		let particle = new Particle();

		particle.init();

		scene.add(particle.object);
		particles.push(particle);
	}
}

let textMaterial = new THREE.MeshBasicMaterial({ color: 0x0f0f0f });

let text = 'Millikan-Experiment';

function loadFont() {
	const loader = new FontLoader();
	loader.load('fonts/helvetiker_regular.typeface.json', (response) => {
		let font = response;
		createText(font);
	});
}

function createText(font) {
	let textGeo = new TextGeometry(text, {
		font: font,

		size: 1,
		height: 0.2,
		curveSegments: 2,
	});

	textGeo.computeBoundingBox();

	const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

	let textMesh = new THREE.Mesh(textGeo, textMaterial);

	textMesh.position.x = centerOffset;
	textMesh.position.y = 0;
	textMesh.position.z = -20;

	textMesh.rotation.x = 0;
	textMesh.rotation.y = Math.PI * 2;

	scene.add(textMesh);
}

loadFont();
