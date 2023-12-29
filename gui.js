import GUI from 'lil-gui';
import { generateParticles } from './main';
import * as variables from './variables';

const gui = new GUI();

// Particle
const particleFolder = gui.addFolder('Particle');
var toggleColorMap;
var changeYPosScale;

var particle = {
	colorMap: false,
	maxAmmount: 5,
	generateParticles: () => {
		generateParticles(particle.maxAmmount);
	},
	scaleYPos: 1,
};

toggleColorMap = particleFolder.add(particle, 'colorMap');
toggleColorMap.onChange(() => {
	variables.toggleColorMap();
});

particleFolder.add(particle, 'maxAmmount', 1, 10, 1);
particleFolder.add(particle, 'generateParticles');

changeYPosScale = particleFolder.add(particle, 'scaleYPos', 0.1, 2);
changeYPosScale.onChange((value) => {
	variables.changeOpticValue(value);
});

// Voltage
const voltageFolder = gui.addFolder('Voltage');
var toggleVoltage;
var voltageSlider;
var reverseVoltageButton;

var voltage = {
	on: true,
	value: 250,
	reversePolarity: () => {
		if (voltageSlider._max > 0) {
			voltageSlider.min(-500);
			voltageSlider.max(0);
		} else {
			voltageSlider.min(0);
			voltageSlider.max(500);
		}

		voltageSlider.setValue(-voltage.value);

		variables.changeVoltage(voltage.value);
	},
};

toggleVoltage = voltageFolder.add(voltage, 'on');
toggleVoltage.onChange((value) => {
	if (value) variables.changeVoltage(voltage.value);
	else variables.changeVoltage(0);

	voltageFolder.controllers[1].disable(!value);
	voltageFolder.controllers[2].disable(!value);
});

voltageSlider = voltageFolder.add(voltage, 'value', 0, 500, 1);
voltageSlider.onChange((value) => {
	variables.changeVoltage(value);
});

reverseVoltageButton = voltageFolder.add(voltage, 'reversePolarity');

// Events
document.addEventListener('scroll', (e) => {
	if (document.documentElement.scrollTop >= window.innerHeight / 2) {
		document.getElementsByClassName('lil-gui')[0].style.display = 'none';
		console.log('j');
	} else {
		document.getElementsByClassName('lil-gui')[0].style.display = 'initial';
	}
});
console.log(document.getElementsByClassName('lil-gui')[0]);
