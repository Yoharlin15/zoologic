export interface IComportamiento {
    ComportamientoId: number;
    AnimalId: number;
    IdentificadorUnico: string;
    Entrenamiento: string;
    Conducta: string;
    Observaciones: string;
    CreadoPor: number;
    NombreUsuario: string;
    FechaCreacion: Date | string | null;
}

export interface IComportamientoCurrent {
    ComportamientoId: number;
    AnimalId: number;
    IdentificadorUnico: string;
    Entrenamiento: string;
    Conducta: string;
    Observaciones: string;
    CreadoPor: number;
    NombreUsuario: string;
    FechaCreacion: Date | string | null;
}

export interface IComportamientoCreate {
    AnimalId: number;
    Entrenamiento: string;
    Conducta: string;
    Observaciones: string;
    CreadoPor: number | null;
}

export interface IComportamientoUpdate {
    ComportamientoId: number;
    AnimalId: number;
    IdentificadorUnico: string;
    Entrenamiento: string;
    Conducta: string;
    Observaciones: string;
}