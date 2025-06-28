export interface ITratamiento {
    TratamientoId: number;
    NombreTratamiento: string;
}

export interface ITratamientoCurrent {
    TratamientoId: number;
    NombreTratamiento: string;
}

export interface ITratamientoCreate {
    NombreTratamiento: string;
}

export interface ITratamientoUpdate {
    TratamientoId: number;
    NombreTratamiento: string;
}

export interface ITratamientoAplicado {
    TratamientoAplicadoId: number;
    TratamientoId: number;
    NombreTratamiento: string;
    AnimalId: number;
    Alias: string
    HabitatId: number;
    Nombre: string;
    FechaEntrada: Date | string;
    FechaSalida: Date | string;
    UsuarioId: number;
    NombreUsuario: string;
    Razon: string;
}

export interface ITratamientoAplicadoCreate {
    TratamientoId: number;
    AnimalId: number;
    HabitatId: number;
    FechaEntrada: Date | null;
    FechaSalida: Date | null;
    UsuarioId: number;
    Razon: string;
}

