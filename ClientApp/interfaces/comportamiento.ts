export interface IComportamiento {
    ComportamientoId: number;
    AnimalId: number;
    Alias: string;
    UsuarioId: number;
    NombreUsuario: string;
    Fecha: Date | string | null;
    HabitatId: number;
    Nombre: string
    DetalleComportamientoId: string;
    DetallesComportamiento: string;
}

export interface IComportamientoCreate {
    AnimalId: number;
    UsuarioId: number;
    Fecha: Date | null;
    HabitatId: number;
    DetalleComportamientoId: string;
}

export interface IDetalleComportamiento {
    DetalleComportamientoId: string;
    DetallesComportamiento: string;
}

export interface IDetalleComportamientoCreate {
    DetallesComportamiento: string;
}