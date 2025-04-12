export interface IAnimal {
    AnimalId: number;
    EspecieId: number;
    Sexo: string;
    FechaNacimiento: Date | string | null;
    Observaciones: string;
    ZonaId: number;
    CreadoPor: number;
} 