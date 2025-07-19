export interface INecropsia {
    NecropsiaId: number
    IdentificadorUnico: string;
    FechaMuerte: Date | string | null
    FechaNecropsia: Date | string | null
    CausaMuerte: string
    UsuarioId: number
    NombreUsuario: string
}

export interface INecropsiaCurrent {
    NecropsiaId: number
    AnimalId: number
    FechaMuerte: Date | null
    FechaNecropsia: Date | null
    CausaMuerte: string
    ExamenId: number
    UsuarioId: number
}

export interface INecropsiaCreate {
    AnimalId: number
    FechaMuerte: Date | null
    FechaNecropsia: Date | null
    CausaMuerte: string
    ExamenId: string
    UsuarioId: number
}

export interface INecropsiaUpdate {
    NecropsiaId: number
    AnimalId: number
    FechaMuerte: Date | null
    FechaNecropsia: Date | null
    CausaMuerte: string
    ExamenId: string
    UsuarioId: number
}