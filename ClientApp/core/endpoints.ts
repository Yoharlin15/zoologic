const GET = "Get";
const GETBYID = "GetById";
const CREATE = "Create";
const UPDATE = "Update";
const ESTADO_BASE = "Estado"
const DASHBOARD_BASE = "Dashboard";
const ESPECIES_BASE = "Especie";
const ANIMALES_BASE = "Animal";
const EMPLEADOS_BASE = "Empleado";
const TRATAMIENTOS_BASE = "Tratamiento";
const NECROPSIAS_BASE = "Necropsia";
const ZONAS_BASE = "Zona";
const ALIMENTO_BASE = "Alimentacion/GetAlimentos";
const INVENTARIO_BASE = "Alimentacion/GetInventario";
const DIETA_BASE = "Alimentacion/GetDietas";
const DIETA_APLICADA_BASE = "Alimentacion/GetDietasAplicadas"
const HABITATS_BASE = "Habitat";
const USUARIOS_BASE = "Usuario";
const LOGIN = "Login";
const LOGOUT = "Logout";
const REGISTER = "Register";
const CONFIRMAR_CORREO = "ConfirmarCorreo";

//Get Dashboard
export const DASHBOARD_GET = `${DASHBOARD_BASE}/${GET}`;

//GET Estado
export const ESTADO_GET = `${ESTADO_BASE}/${GET}`;
export const ESTADO_GETBYID = `${ESTADO_BASE}/${GETBYID}`
export const ESTADO_CREATE = `${ESTADO_BASE}/${CREATE}`;
export const ESTADO_UPDATE = `${ESTADO_BASE}/${UPDATE}`

//CRUD Especies
export const ESPECIES_GET = `${ESPECIES_BASE}/${GET}`;
export const ESPECIES_CREATE = `${ESPECIES_BASE}/${CREATE}`;
export const ESPECIES_CREATE_GET = `${ESPECIES_BASE}/${CREATE}`;
export const ESPECIES_UPDATE = `${ESPECIES_BASE}/${UPDATE}`;

//CRUD Animal
export const ANIMALES_GET = `${ANIMALES_BASE}`;
export const ANIMALES_CREATE = `${ANIMALES_BASE}/${CREATE}`;

//CRUD Padre
export const PADRES_GET = `${ANIMALES_BASE}/Animales-padres`;
export const PADRES_CREATE = `${ANIMALES_BASE}/Create-padre`;

//CRUD Habitats
export const HABITATS_GET = `${HABITATS_BASE}`;

//CRUD Alimentos
export const ALIMENTO_GET = `${ALIMENTO_BASE}`

//CRUD Inventario
export const INVENTARIO_GET = `${INVENTARIO_BASE}`;

//CRUD Dieta
export const DIETA_GET = `${DIETA_BASE}`;

//CRUD DietasAplicadas
export const dietaAPLICADA_GET = `${DIETA_APLICADA_BASE}`

//Get Empleado
export const EMPLEADOS_GET = `${EMPLEADOS_BASE}/${GET}`;
export const EMPLEADOS_CREATE = `${EMPLEADOS_BASE}/${CREATE}`;

//Get Cargo
export const CARGOS_GET = `${EMPLEADOS_BASE}/GetCargos`;

//Get Tratamiento
export const TRATAMIENTOS_GET = `${TRATAMIENTOS_BASE}/${GET}`;

//Get Necropsias
export const NECROPSIAS_GET = `${NECROPSIAS_BASE}/${GET}`;

//Get Zonas 
export const ZONAS_GET = `${ZONAS_BASE}/${GET}`;

//Get Usuarios 
export const USUARIOS_GET = `${USUARIOS_BASE}/${GET}`;


//Account Endpoints
export const USUARIOS_SIGNUP = `${USUARIOS_BASE}/${REGISTER}/signup`;
export const USUARIOS_LOGIN = `${USUARIOS_BASE}/${LOGIN}/login`;
export const USUARIOS_LOGOUT = `${USUARIOS_BASE}/${LOGOUT}/logout`;
export const USUARIOS_CONFIRMAR_CORREO = `${USUARIOS_BASE}/${CONFIRMAR_CORREO}/confirmar-correo`;




