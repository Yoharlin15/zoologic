//Roles
export interface IRoles {
  RolId: number;
  Nombre: string;
  FechaCreacion: string;
}

export interface IRolCurrent {
  RolId: number;
  Nombre: string;
}

//RolesPermisos
export interface IRolesPermisos {
  RolId: number;
  ModuloId: number;
  ModuloNombre: string;
  Acciones: {
    Ver?: boolean;
    Crear?: boolean;
    Editar?: boolean;
    Eliminar?: boolean;
    [key: string]: boolean | undefined; // permite claves adicionales si hiciera falta
  };
}

export interface IUpdateRolesPermisos {
  RolId: number;
  ModuloId: number;
  AccionId: number;
}

//Estados
export interface IEstados {
  EstadoId: number;
  NombreEstado: string; 
  FechaCreacion: string;
}

export interface ICreateEstados {
  NombreEstado: string;
}

export interface IUpdateEstados {
  EstadoId: number;
  NombreEstado: string;
}

export interface IEstadoCurrent {
  EstadoId: number;
  NombreEstado: string;
}