export interface IHabitat 
{
    HabitatId: number;
    Nombre: string;
    CantidadAnimales: number;
    EstadoId: number;
    NombreEstado: string;
    Descripcion: string;
    EspecieId: number;
    NombreComun: string;
}

export interface IHabitatCurrent {
    HabitatId: number;
    Nombre: string;
    CantidadAnimales: number;
    EstadoId: number;
    NombreEstado: string;
    Descripcion: string;
    EspecieId: number;
    NombreComun: string;
}

export interface IHabitatCreate {
    Nombre: string;
    CantidadAnimales: number;
    EstadoId: number;
    Descripcion: string;
    EspecieId: number;
}

export interface IHabitatUpdate {
    HabitatId: number
    Nombre: string;
    CantidadAnimales: number;
    EstadoId: number;
    Descripcion: string;
    EspecieId: number
}