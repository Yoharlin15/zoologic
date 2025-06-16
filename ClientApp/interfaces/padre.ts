export interface IPadre {
    AnimalPadreId: number,
    PadreAlias: string,
    MadreAlias: string,
    EspecieId: number,
    NombreComun: string,
    FechaNacimientoCrias: Date | string | null;
    NumeroCrias: string
}

export interface IPadreCreate {
    AnimalPadreId: number;
    PadreAlias: string;
    MadreAlias: string;
    EspecieId: number;
    FechaNacimientoCrias: Date | null;
    NumeroCrias: number;
}