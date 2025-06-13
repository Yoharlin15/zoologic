export interface IAnimal {
    AnimalId: number;
    Alias : string;
    EspecieId: number;
    NombreCientifico: string;
    Sexo: string;
    FechaNacimiento: Date | string | null;
    Observaciones: string;
    HabitatId: number;
    Nombre: string;
}

export interface IAnimalCreate {
    Alias: string;
    EspecieId: number;
    HabitatId: number;
    AnimalPadreId: number;
    Sexo: string;
    FechaNacimiento: Date | null; // Solo Date o null
    Color: string
    Observaciones: string;
}