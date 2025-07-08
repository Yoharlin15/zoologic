export interface IDepartamento {
    DepartamentoId: number,
    Nombre: string
}

export interface ICurrentDepartamento {
    DepartamentoId: number,
    Nombre: string,
}

export interface ICreateDepartamento {
    Nombre: string
}

export interface IUpdateDepartamento {
    DepartamentoId: number,
    Nombre: string
}