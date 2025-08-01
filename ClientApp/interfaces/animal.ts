export interface IAnimal {
    AnimalId: number;
    IdentificadorUnico: string;
    TipoIdentificador: string;
    Alias : string;
    EspecieId: number;
    NombreComun: string;
    Sexo: string;
    FechaNacimiento: Date | string | null;
    Color: string;
    Observaciones: string;
    EstadoId: number;
    NombreEstado: string;
    CreadoPor : number;
    NombreUsuario: string;
    FechaCreacion: Date | string | null;
}

export interface IAnimalCurrent {
    AnimalId: number;
    IdentificadorUnico: string;
    TipoIdentificador: string;
    Alias : string;
    EspecieId: number;
    NombreComun: string;
    Sexo: string;
    FechaNacimiento: Date | string | null;
    Color: string;
    Observaciones: string;
}

export interface IAnimalCreate {
    IdentificadorUnico: string;
    TipoIdentificador: string;
    Alias: string;
    EspecieId: number;
    Sexo: string;
    FechaNacimiento: Date | null;
    Color: string
    Observaciones: string;
    CreadoPor: number | null;
}

export interface IAnimalUpdate {
    AnimalId: number;
    IdentificadorUnico: string;
    TipoIdentificador: string;
    Alias: string;
    EspecieId: number;
    Sexo: string;
    FechaNacimiento: Date | null;
    Color: string
    Observaciones: string;
}

export interface IAnimalHabitatUpdate {
    AnimalId: number;
    HabitatId: number;
}

export interface IHabitaByAnimal {
    AnimalId: number;
    HabitatId: number;
    Nombre: string;
}

export interface IAnimalEstado {
    AnimalId: number;
    EstadoId: number;
}

export interface IAnimalAnulate {
    AnimalId: number;
}