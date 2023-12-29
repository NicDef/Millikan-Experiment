import * as THREE from 'three';
import * as variables from './variables';

class Particle extends THREE.Object3D {
	constructor() {
		super();
		this.object;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.v = 0;
		this.q = Math.round(THREE.MathUtils.randFloatSpread(8)) * variables.e;
		this.density = variables.density_oil;
		this.r = Math.random() * 8.0e-7 + 1.0e-7;
		this.volume = (4 / 3) * Math.PI * Math.pow(this.r, 3);
		this.m = variables.density_oil * this.volume;
		this.a = 0;
		this.color;
	}

	init() {
		const particleGeometry = new THREE.SphereGeometry(this.r * 2.5e5);

		if (variables.colorMap) this.color = new THREE.Color(`hsl(${360 / (this.q / variables.e + 4)}, 100%, 50%)`);
		else this.color = 0xedc540;

		const particleMaterial = new THREE.MeshBasicMaterial({ color: this.color });

		this.object = new THREE.Mesh(particleGeometry, particleMaterial);

		this.x = THREE.MathUtils.randFloatSpread(4);
		this.y = THREE.MathUtils.randFloatSpread(4);
		this.z = THREE.MathUtils.randFloatSpread(4);

		this.object.translateX(this.x);
		this.object.translateY(this.y);
		this.object.translateZ(this.z);
	}

	updateParticle(dt) {
		// Color
		if (variables.colorMap) this.color = new THREE.Color(`hsl(${360 / (this.q / variables.e + 4)}, 100%, 50%)`);
		else this.color = new THREE.Color(0xedc540);
		this.object.material.color = this.color;

		this.a = 0;

		const f_g = -this.m * variables.g; // Weight Force = m * g
		const f_el = (this.q * variables.u) / variables.d; // Electric force = (q * U) / d
		const f_fr = 0.5 * variables.C_d * Math.PI * Math.pow(this.r, 2) * variables.density_air * Math.pow(this.v, 2); // Friction = 0.5 * C_d * A * density_air * velocity^2
		const f_b = variables.density_air * this.volume * variables.g; // Buoyancy = density_air * V_Oil * g

		this.a = (f_g + f_el + f_b - f_fr) / this.m;

		this.v += this.a * dt * 0.001; // Scale dt to prevent unrealistic velocities

		this.object.translateY(this.v * dt * variables.opticValue); // Werte zu klein um in Visualisierung darzustellen ==> Skalierung mit einem "OptikWert"
	}
}

export default Particle;
