
export const RANGOS_FIJOS = [
  "300kg", "500kg", "1T", "3T", "5T", "10T", "20T", "30T",
];

export const DEFAULT_COSTOS_ROW = {
  "300kg": 15.0,
  "500kg": 15.0,
  "1T": 15.0,
  "3T": 10.0,
  "5T": 8.0,
  "10T": 7.0,
  "20T": 5.0,
  "30T": 4.8,
};

export const MAX_EMPTY_ROWS = 11;

export const menuItems = [
  "Precios Base", "Waste", "Costos indirectos", "Tipo de Cliente",
  "Comisiones", "Tipos de cambio", "Tasa financiera anual", "Logística",
];


export const getInitialFormState = () => ({
  nombre: "",
  costos: RANGOS_FIJOS.reduce((acc, rango) => ({ ...acc, [rango]: 0.0 }), {}),
});