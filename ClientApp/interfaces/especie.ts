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
    FotoUrl: string;
}

export interface IEspecieCreate {
    EspecieId: number;
    NombreCientifico : string;
    NombreComun: string;
    FamiliaId: number;
    ClaseId: number;
    ProcedenciaId: number;
    FotoUrl: string;
}

export interface IEspecieUpdate {
    EspecieId: number;
    NombreCientifico : string;
    NombreComun: string;
    FamiliaId: number;
    ClaseId: number;
    ProcedenciaId: number;
    FotoUrl: string;
}

export interface IEspecieCurrent {
    EspecieId: number;
    NombreCientifico : string;
    NombreComun: string;
    FamiliaId: number;
    FamiliaNombre: string;
    ProcedenciaId: number;
    ProcedenciaNombre: string;
    ClaseId: number;
    ClaseNombre: string;
}

export interface IEspecieFoto {
    EspecieId: number;
    FotoUrl: string;
}

export interface IFamilia {
    FamiliaId: number;
    FamiliaNombre: string;
}

export interface IFamiliaCurrent {
    FamiliaId: number;
    FamiliaNombre: string;
}

export interface IFamiliaCreate {
    FamiliaNombre: string;
}

export interface IClase {
    ClaseId: number;
    ClaseNombre: string;
}

export interface IClaseCurrent {
    ClaseId: number;
    ClaseNombre: string;
}

export interface IClaseCreate {
    ClaseNombre: string;
}

export interface IProcedencia {
    ProcedenciaId: number;
    ProcedenciaNombre: string;
}

export interface IProcedenciaCurrent {
    ProcedenciaId: number;
    ProcedenciaNombre: string;
}

export interface IProcedenciaCreate {
    ProcedenciaNombre: string;
}

export interface ICategoriasData {
  Familias: IFamilia[];
  Clases: IClase[];
  Procedencias: IProcedencia[];
}