export interface IAnimal {
    AnimalId: number;
    IdentificadorUnico: string;
    TipoIdentificador: string;
    Alias : string;
    EspecieId: number;
    NombreComun: string;
    Sexo: string;
    FechaNacimiento: Date | string | null;
    PadreId: number;
    Padre: string;
    MadreId: number;
    Madre: string;
    Color: string;
    Observaciones: string;
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
    PadreId: number;
    Padre: string;
    MadreId: number;
    Madre: string;
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
    PadreId: number;
    MadreId: number;
    Color: string
    Observaciones: string;
}

export interface IAnimalUpdate {
    AnimalId: number;
    IdentificadorUnico: string;
    TipoIdentificador: string;
    Alias: string;
    EspecieId: number;
    Sexo: string;
    FechaNacimiento: Date | null;
    PadreId: number;
    MadreId: number;
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