export interface IEmpleado {
    EmpleadoId: number;
    Nombres: string;
    Apellidos: string;
    Cedula: string;
    FechaNacimiento: Date | string | null;
    Sexo: string;
    Telefono: string;
    Nacionalidad: string;
    Direccion: string;
    CargoId: number;
    CargoNombre: string,
    FechaContratacion: Date | string | null;
    DepartamentoId: number;
    NombreDepartamento: string;
    EstadoId: number;
    NombreEstado: string;
}

export interface IEmpleadoCurrent {
    mensaje: string;
    EmpleadoId: number;
    Nombres: string;
    Apellidos: string;
    Cedula: string;
    FechaNacimiento: Date | string | null;
    Sexo: string;
    Telefono: string;
    Nacionalidad: string;
    Direccion: string;
    CargoId: number;
    CargoNombre: string,
    FechaContratacion: Date | string | null;
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

export interface IEmpleadoUpdate {
    EmpleadoId: number;
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