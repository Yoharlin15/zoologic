const GET = "Get";
const CREATE = "Create";
const UPDATE = "Update";
const DASHBOARD_BASE = "Dashboard";
const ESPECIES_BASE = "Especie";
const ANIMALES_BASE = "Animal";
const EMPLEADOS_BASE = "Empleado";
const TRATAMIENTOS_BASE = "Tratamiento";
const NECROPSIAS_BASE = "Necropsia";
const ZONAS_BASE = "Zona";
const USUARIOS_BASE = "Usuario"

//Get Dashboard
export const DASHBOARD_GET = `${DASHBOARD_BASE}/${GET}`;

//Get Especies
export const ESPECIES_GET = `${ESPECIES_BASE}/${GET}`;

//Create Especie
export const ESPECIES_CREATE = `${ESPECIES_BASE}/${CREATE}`;
export const ESPECIES_CREATE_GET = `${ESPECIES_BASE}/${CREATE}`;

//Update Especie
export const ESPECIES_UPDATE = `${ESPECIES_BASE}/${UPDATE}`;

//Get Animal
export const ANIMALES_GET = `${ANIMALES_BASE}/${GET}`;

//Get Empleado
export const EMPLEADOS_GET = `${EMPLEADOS_BASE}/${GET}`;

//Get Tratamiento
export const TRATAMIENTOS_GET = `${TRATAMIENTOS_BASE}/${GET}`;

//Get Necropsias
export const NECROPSIAS_GET = `${NECROPSIAS_BASE}/${GET}`;

//Get Zonas 
export const ZONAS_GET = `${ZONAS_BASE}/${GET}`;

//Get Usuarios 
export const USUARIOS_GET = `${USUARIOS_BASE}/${GET}`;


