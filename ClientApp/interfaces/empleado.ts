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
    Cargo: string,
    FechaContratacion: Date;
    UsuarioId: number;
    NombreUsuario: string;
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
    UsuarioId: number;
    EstadoId: number;
}