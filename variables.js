export const d = 6.0e-3; // Distance of the capacitor plates in m
export const eta_air = 1.81e-5; // viscosity of air in N*s / m^2
export const density_air = 1.29; // Density of the air in kg / m^3
export const density_oil = 875.3; // Density of the oil in kg / m^3
export const delta_density = density_oil - density_air; // = 874.01 kg / m^3		// m
export const e = 1.602e-19; // elementary charge in  A*s
export const g = 9.81; // acceleration due to gravity in m / s^2
export const C_d = 0.47; // Coefficient of air resistance

export var u = 250; // Voltage of the capacitor plates in V
export const changeVoltage = (value) => {
	u = value;
};

export var colorMap = false;
export const toggleColorMap = () => {
	colorMap = !colorMap;
};

export var opticValue = 1; // Scale the calculated values to the visualization
export const changeOpticValue = (value) => {
	opticValue = value;
};
