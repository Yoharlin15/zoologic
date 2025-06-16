//Roles
export interface IRoles {
  RolId: number;
  Nombre: string;
}

//Estados
export interface IEstados {
    EstadoId: number;
    NombreEstado: string; 
}

export interface ICreateEstados {
  NombreEstado: string;
}

export interface IUpdateEstados {
  EstadoId: number;
  NombreEstado: string;
}

export interface IEstadoCurrent {
  EstadoId: number;
  NombreEstado: string;
}