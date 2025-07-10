export interface IEmpleado {
    EmpleadoId: number;
    Nombres: string;
    Apellidos: string;
    Cedula: string;
    FechaNacimiento: Date;
    Sexo: string;
    Telefono: string;
    Nacionalidad: string;
    Direccion: string;
    CargoId: number;
    CargoNombre: string,
    FechaContratacion: Date;
    DepartamentoId: number;
    NombreDepartamento: string;
    EstadoId: number;
    NombreEstado: string;
}

export interface IEmpleadoCreate {
    Nombres: string;
    Apellidos: string;
    Cedula: string;
    FechaNacimiento: Date | null;
    Sexo: string;
    Telefono: string;
    Nacionalidad: string;
    Direccion: string;
    CargoId: Number;
    FechaContratacion: Date | null;
    DepartamentoId: number;
    EstadoId: number;
}