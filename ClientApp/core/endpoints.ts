const GET = "Get";
const CREATE = "Create";
const UPDATE = "Update";
const DASHBOARD_BASE = "Dashboard";
const ESPECIES_BASE = "Especie";
const EMPLEADOS_BASE = "Empleado";

//Get Dashboard
export const DASHBOARD_GET = `${DASHBOARD_BASE}/${GET}`;

//Get Especies
export const ESPECIES_GET = `${ESPECIES_BASE}/${GET}`;

//Create Especie
export const ESPECIES_CREATE = `${ESPECIES_BASE}/${CREATE}`;
export const ESPECIES_CREATE_GET = `${ESPECIES_BASE}/${CREATE}`;

//Update Especie
export const ESPECIES_UPDATE = `${ESPECIES_BASE}/${UPDATE}`;

//Get Empleado
export const EMPLEADOS_GET = `${EMPLEADOS_BASE}/${GET}`;



