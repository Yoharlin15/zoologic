export interface IPermiso {
    PermisoId: number;
    Modulo: string[];
    Accion: string[];
    Descripcion: string;
}

export interface IPermisoCurrent {
    PermisoId: number;
    Modulo: string[];
    Accion: string[];
    Descripcion: string;
}

export interface IPermisoCreate {
    Modulo: string;
    Accion: string;
    Descripcion: string;
}

export interface IPermisoUpdate {
    PermisoId: number;
    Modulo: string;
    Accion: string;
    Descripcion: string;
}

export interface IRolesPermisos {
    RolId: number;
    Permisos: IPermiso[];
    Nombre: string;  
}

export interface IRolesPermisosCurrent {
    RolId: number;
    Permisos: IPermisoCurrent[];
}

export interface IRolesPermisosCreate {
    RolId: number;
    Permisos: IPermisoCreate[];
}

export interface IRolesPermisosUpdate {
    RolId: number;
    Permisos: IPermisoUpdate[];
}