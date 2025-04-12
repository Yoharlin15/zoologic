export interface ITratamiento {
    TratamientoId: number;
    NombreTratamiento: string;
    EspecieId: number;
    NombreComun: string;
    HabitatId: number;
    NombreHabitat: string;
    FechaEntrada: Date | string | null;
    FechaSalida: Date | string | null;
    UsuarioId: number;
    NombreUsuario: string;
    Razon: string;
    Procedencia: string;
}

