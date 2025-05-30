export interface IEspecie {
    EspecieId: number;
    NombreCientifico : string;
    NombreComun: string;
    FamiliaId: number;
    FamiliaNombre: string;
    ProcedenciaId: number;
    ProcedenciaNombre: string;
    ClaseId: number;
    ClaseNombre: string;
    ZonaId: number;
    ZonaNombre: string;
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

export interface IEspecieUpdate {
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