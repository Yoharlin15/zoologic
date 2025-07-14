export interface IInventario {
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
    UnidadMedidaId: number;
}

export interface IAlimento {
    AlimentoId: number;
    Nombre: string;
    Descripcion: string;
}

export interface IAlimentoCreate {
    Nombre: string;
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