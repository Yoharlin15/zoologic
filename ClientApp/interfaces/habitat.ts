export interface IHabitat 
{
    HabitatId: number;
    Nombre: string;
    CantidadAnimales: number;
    EstadoId: number;
    NombreEstado: string;
    Descripcion: string;
}

export interface IHabitatCreate {
    Nombre: string;
    CantidadAnimales: number;
    EstadoId: number;
    Descripcion: string;
}