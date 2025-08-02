export interface IComportamiento {
    ComportamientoId: number;
    AnimalId: number;
    IdentificadorUnico: string;
    CreadoPor: number;
    NombreUsuario: string;
    FechaCreacion: Date | string | null;
    HabitatId: number;
    Nombre: string
    AlimentoEspecieId: number;
    Entrenamiento: string;
    Conducta: string;
    ObservacionFisica: string;
    ObservacionGeneral: string;
}

export interface IComportamientoCurrent {
    ComportamientoId: number;
    AnimalId: number;
    Alias: string;
    UsuarioId: number;
    NombreUsuario: string;
    Fecha: Date | string | null;
    HabitatId: number;
    Nombre: string
    DetalleComportamientoId: number;
    DetallesComportamiento: string;
}

export interface IComportamientoCreate {
    AnimalId: number;
    UsuarioId: number;
    Fecha: Date | null;
    HabitatId: number;
    DetalleComportamientoId: string;
}