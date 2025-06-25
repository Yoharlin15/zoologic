export interface IInventario {
    InventarioId: number;
    AlimentoId: number;
    Nombre: string;
    Cantidad: number;
}

export interface IInventarioCreate {
    AlimentoId: number;
    Cantidad: number;
}

export interface IDieta {
    DietaId: number;
    Nombre: string;
    Descripcion: string;
}

export interface IDietaCreate {
    Nombre: string;
    Descripcion: string;
    AlimentoId: number[];
    Cantidad: number;
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
    Alias: string;
    DietaId: number;
    Nombre: string;
    Alimentos: IAlimento[];
    FechaAplicacion: Date | null;
}

export interface IDietaAplicadaCreate {
    AnimalId: number;
    DietaId: number;
    FechaAplicacion: Date | null;
}