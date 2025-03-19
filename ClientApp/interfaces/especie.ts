export interface IEspecie {
    EspecieId: number;
    NombreCientifico : string;
    NombreComun: string;
    Familia: string;
    Clase: string;
    Sexo: string;
    Peso: string;
    FechaLlegada: Date | string | null;
    Procedencia: string;
    Observaciones: string;
}

export interface IEspecieCreate {
    EspecieId: number;
    NombreCientifico : string;
    NombreComun: string;
    Familia: string;
    Clase: string;
    Sexo: string;
    Peso: string;
    FechaLlegada: Date | null;
    Procedencia: string;
    Observaciones: string;
}

export interface IEspecieCurrent {
    EspecieId: number;
    NombreCientifico : string;
    NombreComun: string;
    Familia: string;
    Clase: string;
    Sexo: string;
    Peso: string;
    FechaLlegada: Date | string | null;
    Procedencia: string;
    Observaciones: string;
}