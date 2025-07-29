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
const ALIMENTO_BASE = "Alimentacion";
const INVENTARIO_BASE = "Alimentacion";
const DIETA_BASE = "Alimentacion";
const DIETA_APLICADA_BASE = "Alimentacion";
const HABITATS_BASE = "Habitat";
const COMPORTAMIENTO_BASE = "Comportamiento";
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
export const ESTADO_UPDATE = `${ESTADO_BASE}/${UPDATE}/{id}`;

//Get Roles
export const ROLES_GET = `${USUARIOS_BASE}/GetRoles`
export const ROLES_GETBYID = `${USUARIOS_BASE}/GetRolById`
export const ROLES_CREATE = `${USUARIOS_BASE}/CreateRol`
export const ROLES_UPDATE = `${USUARIOS_BASE}/UpdateRol/{id}`

//CRUD Permisos
export const PERMISOS_GET = `${USUARIOS_BASE}/GetPermisos`
export const PERMISOS_GETBYID = `${USUARIOS_BASE}/GetPermisoById`
export const PERMISOS_CREATE = `${USUARIOS_BASE}/CreatePermiso`
export const PERMISOS_UPDATE = `${USUARIOS_BASE}/UpdatePermiso/{id}`

//CRUD RolesPermisos
export const ROLES_PERMISOS_GET = `${USUARIOS_BASE}/GetRolesPermisos`
export const ROLES_PERMISOS_GETBYID = `${USUARIOS_BASE}/GetPermisoByRolId`
export const ROLES_PERMISOS_UPDATE = `${USUARIOS_BASE}/UpdateRolesPermisos/{id}/permisos`

//Get Zonas 
export const ZONAS_GET = `${ZONAS_BASE}/${GET}`;
export const ZONAS_GETBYID = `${ZONAS_BASE}/${GETBYID}`
export const ZONAS_CREATE =`${ZONAS_BASE}/${CREATE}`
export const ZONAS_UPDATE = `${ZONAS_BASE}/${UPDATE}` 

//Get Empleado
export const EMPLEADOS_GET = `${EMPLEADOS_BASE}/${GET}`;
export const EMPLEADOS_GETBYID = `${EMPLEADOS_BASE}/GetEmpleadoById`
export const EMPLEADOS_BY_ESTADOID = `${EMPLEADOS_BASE}/GetEmpleadoByEstadoId`
export const EMPLEADOS_REPORTES = `${EMPLEADOS_BASE}/GetReporteEmpleados`
export const EMPLEADOS_CREATE = `${EMPLEADOS_BASE}/${CREATE}`;
export const EMPLEADOS_UPDATE = `${EMPLEADOS_BASE}/UpdateEmpleado/{id}`
export const EMPLEADOS_ACTIVATE = `${EMPLEADOS_BASE}/ActivarEmpleado/{id}`
export const EMPLEADOS_DELETE = `${EMPLEADOS_BASE}/AnularEmpleado/{id}`

//CRUD Cargo
export const CARGOS_GET = `${EMPLEADOS_BASE}/GetCargos`;
export const CARGO_GETBYID = `${EMPLEADOS_BASE}/GetCargoById`
export const CARGOS_CREATE = `${EMPLEADOS_BASE}/CreateCargo`;
export const CARGOS_UPDATE = `${EMPLEADOS_BASE}/UpdateCargo/{id}`;

//CRUD Departamento
export const DEPARTAMENTOS_GET = `${EMPLEADOS_BASE}/GetDepartamentos`
export const DEPARTAMENTOS_GETBYID = `${EMPLEADOS_BASE}/GetDepartamentoById`
export const DEPARTAMENTOS_CREATE = `${EMPLEADOS_BASE}/CreateDepartamento`
export const DEPARTAMENTOS_UPDATE = `${EMPLEADOS_BASE}/UpdateDepartamento/{id}`

//CRUD Animal
export const ANIMALES_GET = `${ANIMALES_BASE}/${GET}`;
export const ANIMALES_GETBYID = `${ANIMALES_BASE}/${GETBYID}`
export const ANIMALES_BY_ESPECIEID = `${ANIMALES_BASE}/GetAnimalByEspecieId`
export const ANIMALES_BY_HABITATID = `${ANIMALES_BASE}/GetHabitatByAnimalId`
export const ANIMALES_REPORTES = `${ANIMALES_BASE}/GetReporteAnimales`
export const ANIMALES_CREATE = `${ANIMALES_BASE}/${CREATE}`;
export const ANIMLAES_UPDATE = `${ANIMALES_BASE}/${UPDATE}/{id}`
export const ANIMALES_HABITATS_UPDATE = `${ANIMALES_BASE}/UpdateAnimalHabitat/{id}`

//CRUD Especies
export const ESPECIES_GET = `${ESPECIES_BASE}/${GET}`;
export const ESPECIES_GET_CATEGORIAS = `${ESPECIES_BASE}/GetByCategorias`
export const ESPECIES_GETBYID = `${ESPECIES_BASE}/GetById`
export const ESPECIES_GET_FOTO = `${ESPECIES_BASE}/GetFotoByEspecieId`
export const ESPECIES_CREATE = `${ESPECIES_BASE}/CreateEspecie`;
export const ESPECIES_CREATE_GET = `${ESPECIES_BASE}/${CREATE}`;
export const ESPECIES_UPDATE = `${ESPECIES_BASE}/${UPDATE}/{id}`;

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
export const ALIMENTO_GET = `${ALIMENTO_BASE}/GetAlimentos`;
export const ALIMENTO_CREATE = `${ALIMENTO_BASE}/CreateAlimento`;

//CRUD Inventario
export const INVENTARIO_GET = `${INVENTARIO_BASE}/GetInventario`;
export const INVENTARIO_CREATE = `${INVENTARIO_BASE}/CreateInventario`;

//CRUD Dieta
export const DIETA_GET = `${DIETA_BASE}/GetDietas`;
export const DIETA_CREATE = `${DIETA_BASE}/CreateDieta`;

//CRUD DietasAplicadas
export const dietaAPLICADA_GET = `${DIETA_APLICADA_BASE}/GetDietasAplicadas`;
export const DIETA_APLICADA_CREATE = `${DIETA_APLICADA_BASE}/CreateDietasAplicadas`;

//CRUD Habitats
export const HABITATS_GET = `${HABITATS_BASE}/${GET}`;
export const HABITATS_GETBYID = `${HABITATS_BASE}/GetHabitatById`
export const HABITATS_BY_ESPECIEID = `${HABITATS_BASE}/GetHabitatByEspecieId`
export const HABITATS_REPORTES = `${HABITATS_BASE}/GetReporteHabitats`;
export const HABITATS_CREATE = `${HABITATS_BASE}/CreateHabitat`;
export const HABITATS_UPDATE = `${HABITATS_BASE}/Update/{id}`

//CRUD Comportamiento
export const COMPORTAMIENTO_GET = `${COMPORTAMIENTO_BASE}/${GET}`;
export const COMPORTAMIENTO_CREATE = `${COMPORTAMIENTO_BASE}/CreateComportamiento`;

//CRUD DetalleComportamiento
export const DETALLECOMPORTAMIENTO_GET = `${COMPORTAMIENTO_BASE}/GetDetallesComportamiento`;
export const DETALLECOMPORTAMIENTO_GETBYID = `${COMPORTAMIENTO_BASE}GetById`
export const DETALLECOMPORTAMIENTO_CREATE = `${COMPORTAMIENTO_BASE}/CreateDetalleComportamiento`;
export const DETALLECOMPORTAMIENTO_UPDATE = `${COMPORTAMIENTO_BASE}/Update`;

//Get Tratamiento
export const TRATAMIENTOS_GET = `${TRATAMIENTOS_BASE}/GetTratamientos`;
export const TRATAMIENTO_GETBYID = `${TRATAMIENTOS_BASE}/GetTratamientoById`
export const TRATAMIENTO_CREATE = `${TRATAMIENTOS_BASE}/CreateTratamiento`
export const TRATAMIENTO_UPDATE = `${TRATAMIENTOS_BASE}/UpdateTratamiento`

//Get Tratamiento
export const TRATAMIENTOESPECIES_GET = `${TRATAMIENTOS_BASE}/GetTratamientoEspecie`;
export const TRATAMIENTOESPECIES_GETBYID = `${TRATAMIENTOS_BASE}/GetTratamientoEspecieById`
export const TRATAMIENTOESPECIES_CREATE = `${TRATAMIENTOS_BASE}/CreateTratamientoEspecie`
export const TRATAMIENTOESPECIES_UPDATE = `${TRATAMIENTOS_BASE}/UpdateTratamientoEspecie`

//CRUD TratamientoAplicado
export const TRATAMIENTOSAPLICADOS_GET = `${TRATAMIENTOS_BASE}/GetTratamientosAplicados`;
export const TRATAMIENTOSAPLICADOS_CREATE = `${TRATAMIENTOS_BASE}/CreateTratamientoAplicado`;
export const TRATAMIENTOSAPLICADOS_BY_ANIMALID = `${TRATAMIENTOS_BASE}/GetTratamientoByAnimalId`

//Get Necropsias
export const NECROPSIAS_GET = `${NECROPSIAS_BASE}/GetNecropsia`;
export const NECROPSIAS_CREATE = `${NECROPSIAS_BASE}/CreateNecropsia`;
export const NECROPSIAS_GETBYID = `${NECROPSIAS_BASE}/GetById`
export const NECROPSIAS_UPDATE = `${NECROPSIAS_BASE}/Update/{id}`;

//CRUD Usuarios
export const USUARIOS_GET = `${USUARIOS_BASE}/${GET}`;
export const USUARIOS_CHECKEMAIL = `${USUARIOS_BASE}/CheckEmailExistence`;
export const USUARIOS_GETBYID = `${USUARIOS_BASE}/GetUsuarioById`
export const USUARIOS_UPDATE = `${USUARIOS_BASE}/UpdateUsuario/{id}
`

//Account Endpoints
export const USUARIOS_SIGNUP = `${USUARIOS_BASE}/${REGISTER}/signup`;
export const USUARIOS_LOGIN = `${USUARIOS_BASE}/${LOGIN}/login`;
export const USUARIOS_LOGOUT = `${USUARIOS_BASE}/${LOGOUT}/logout`;
export const USUARIOS_CONFIRMAR_CORREO = `${USUARIOS_BASE}/${CONFIRMAR_CORREO}/confirmar-correo`;




