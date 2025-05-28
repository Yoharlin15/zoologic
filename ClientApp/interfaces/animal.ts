export interface IAnimal {
    AnimalId: number;
    Alias : string;
    EspecieId: number;
    NombreCientifico: string;
    Sexo: string;
    FechaNacimiento: Date | string | null;
    Observaciones: string;
    ZonaId: number;
    NombreZona: string;
}

export interface IAnimalCreate {
    Alias: string;
    EspecieId: number;
    Sexo: string;
    FechaNacimiento: Date | null; // Solo Date o null
    Observaciones: string;
    ZonaId: number;
}