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
const DIETA_APLICADA_BASE = "Alimentacion/GetDietasAplicadas";
const HABITATS_BASE = "Habitat";
const COMPORTAMIENTO_BASE = "Comportamiento";
const DETALLECOMPORTAMIENTO_BASE = "DetalleComportamiento";
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

//Get Roles
export const ROLES_GET = `${USUARIOS_BASE}/get-roles`
export const ROLES_GETBYID = `${USUARIOS_BASE}/GetRolById`
export const ROLES_CREATE = `${USUARIOS_BASE}/create-rol`
export const ROLES_UPDATE = `${USUARIOS_BASE}/UpdateRol`

//Get Empleado
export const EMPLEADOS_GET = `${EMPLEADOS_BASE}/${GET}`;
export const EMPLEADOS_CREATE = `${EMPLEADOS_BASE}/${CREATE}`;

//Get Cargo
export const CARGOS_GET = `${EMPLEADOS_BASE}/GetCargos`;
export const CARGOS_CREATE = `${EMPLEADOS_BASE}/CreateCargo`;

//CRUD Animal
export const ANIMALES_GET = `${ANIMALES_BASE}`;
export const ANIMALES_CREATE = `${ANIMALES_BASE}/${CREATE}`;

//CRUD Padre
export const PADRES_GET = `${ANIMALES_BASE}/Animales-padres`;
export const PADRES_CREATE = `${ANIMALES_BASE}/Create-padre`;

//CRUD Especies
export const ESPECIES_GET = `${ESPECIES_BASE}/${GET}`;
export const ESPECIES_CREATE = `${ESPECIES_BASE}/CreateEspecie`;
export const ESPECIES_CREATE_GET = `${ESPECIES_BASE}/${CREATE}`;
export const ESPECIES_UPDATE = `${ESPECIES_BASE}/${UPDATE}`;

//CRUD Familias
export const FAMILIAS_GET = `${ESPECIES_BASE}/GetFamilias`;
export const FAMILIAS_GETBYID = `${ESPECIES_BASE}/GetFamiliaById`;
export const FAMILIAS_CREATE = `${ESPECIES_BASE}/CreateFamilia`;
export const FAMILIAS_UPDATE = `${ESPECIES_BASE}/UpdateFamilia`;

//CRUD Clases
export const CLASES_GET = `${ESPECIES_BASE}/GetClases`;
export const CLASES_GETBYID = `${ESPECIES_BASE}/GetClaseById`;
export const CLASES_CREATE = `${ESPECIES_BASE}/CreateClase`;
export const CLASES_UPDATE = `${ESPECIES_BASE}/UpdateClase`;

//CRUD Procedencias
export const PROCEDENCIAS_GET = `${ESPECIES_BASE}/GetProcedencias`;
export const PROCEDENCIAS_GETBYID = `${ESPECIES_BASE}/GetProcedenciaById`;
export const PROCEDENCIAS_CREATE = `${ESPECIES_BASE}/CreateProcedencia`;
export const PROCEDENCIAS_UPDATE = `${ESPECIES_BASE}/UpdateProcedencia`;

//CRUD Alimentos
export const ALIMENTO_GET = `${ALIMENTO_BASE}`

//CRUD Inventario
export const INVENTARIO_GET = `${INVENTARIO_BASE}`;

//CRUD Dieta
export const DIETA_GET = `${DIETA_BASE}`;

//CRUD DietasAplicadas
export const dietaAPLICADA_GET = `${DIETA_APLICADA_BASE}`

//CRUD Habitats
export const HABITATS_GET = `${HABITATS_BASE}`;

//CRUD Comportamiento
export const COMPORTAMIENTO_GET = `${COMPORTAMIENTO_BASE}/Get`;
export const COMPORTAMIENTO_CREATE = `${COMPORTAMIENTO_BASE}/CreateComportamiento`;

//CRUD DetalleComportamiento
export const DETALLECOMPORTAMIENTO_GET = `${DETALLECOMPORTAMIENTO_BASE}/Get`;
export const DETALLECOMPORTAMIENTO_CREATE = `${DETALLECOMPORTAMIENTO_BASE}/CreateDetalleComportamiento`;

//Get Tratamiento
export const TRATAMIENTOS_GET = `${TRATAMIENTOS_BASE}/GetTratamientos`;

//CRUD TratamientoAplicado
export const TRATAMIENTOSAPLICADOS_GET = `${TRATAMIENTOS_BASE}/GetTratamientosAplicados`;
export const TRATAMIENTOSAPLICADOS_CREATE = `${TRATAMIENTOS_BASE}/CreateTratamientoAplicado`;

//Get Necropsias
export const NECROPSIAS_GET = `${NECROPSIAS_BASE}/GetNecropsia`;

//Get Zonas 
export const ZONAS_GET = `${ZONAS_BASE}/${GET}`;

//Get Usuarios 
export const USUARIOS_GET = `${USUARIOS_BASE}/${GET}`;


//Account Endpoints
export const USUARIOS_SIGNUP = `${USUARIOS_BASE}/${REGISTER}/signup`;
export const USUARIOS_LOGIN = `${USUARIOS_BASE}/${LOGIN}/login`;
export const USUARIOS_LOGOUT = `${USUARIOS_BASE}/${LOGOUT}/logout`;
export const USUARIOS_CONFIRMAR_CORREO = `${USUARIOS_BASE}/${CONFIRMAR_CORREO}/confirmar-correo`;




