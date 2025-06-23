export interface ICargo {
    CargoId: number,
    Cargo: string
}

export interface ICurrentCargo {
    CargoId: number,
    Cargo: string,
}

export interface ICreateCargo {
    Cargo: string
}

export interface IUpdateCargo {
    CargoId: number,
    Cargo: string
}