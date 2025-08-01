export interface IInventario {
    InventarioId: number;
    AlimentoId: number;
    Nombre: string;
    Cantidad: number;
    UnidadMedidaId: number;
    UnidadMedida: string;
    CreadoPor: number;
    NombreUsuario: string;
    FechaCreacion: string;
}

export interface IInventarioCurrent {
    InventarioId: number;
    AlimentoId: number;
    Nombre: string;
    Cantidad: number;
    UnidadMedidaId: number;
    UnidadMedida: string;
}

export interface IInventarioCreate {
    AlimentoId: number;
    Cantidad: number;
    UnidadMedidaId?: number;
    CreadoPor: number | null;
}

export interface IAlimento {
    AlimentoId: number;
    Nombre: string;
    UnidadMedidaId: number;
    UnidadMedida: string;
    Descripcion: string;
    CreadoPor: number;
    NombreUsuario: string;
    FechaCreacion: Date | string | null 
}

export interface IAlimentoCurrent {
    AlimentoId: number;
    Nombre: string;
    UnidadMedidaId: number;
    UnidadMedida: string;
    Descripcion: string;
    CreadoPor: number | null;
    NombreUsuario: string;
    FechaCreacion: Date | string | null
}

export interface IAlimentoCreate {
    Nombre: string;
    UnidadMedidaId: number;
    Descripcion: string;
    CreadoPor: number | null;
}

export interface IAlimentoUpdate {
    AlimentoId: number;
    Nombre: string;
    UnidadMedidaId: number;
    Descripcion: string;
}

export interface IAlimentoDieta {
    AlimentoDietaId: number;
    DietaId: number;
    NombreDieta: string;
    AlimentoId: number;
    NombreAlimento: string;
}

export interface IDietaAplicada {
    DietaAplicadaId: number;
    AnimalId: number;
    IdentificadorUnico: string;
    AlimentoId: string;
    Nombre: string;
    Cantidad: number;
    UnidadMedidaId: number;
    UnidadMedida: string;
    FechaAplicacion: Date | null;
}

export interface IDietaAplicadaCreate {
    AnimalId: number;
    AlimentoId: number;
    Cantidad: number;
    UnidadMedidaId: number;
    FechaAplicacion: Date | null;
}

export interface IAlimentoEspecie {
    AliementoEspecieId: number;
    AlimentoId: number;
    AlimentoNombre: string;
    EspecieId: number;
    NombreComun: string;
}

export interface IAlimentoEspecieCreate {
    AlimentoId: number;
    EspecieId: number;
}

export interface IUnidadMedida {
    UnidadMedidaId: number;
    UnidadMedida: string;
}

export interface IUnidadMedidaByAlimentoId {
    AlimentoId: number;
    UnidadMedidaId: number;
    UnidadMedida: string;
}