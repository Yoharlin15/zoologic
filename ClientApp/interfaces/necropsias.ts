export interface INecropsia {
    NecropsiaId: number
    AnimalId: number
    Alias: string
    FechaMuerte: Date | string | null
    FechaNecropsia: Date | string | null
    CausaMuerte: string
    ExamenId: number
    Examen: string
    UsuarioId: number
    NombreUsuario: string
}

export interface INecropsiaCreate {
    AnimalId: number
    FechaMuerte: Date | null
    FechaNecrosia: Date | null
    CausaMuerte: string
    ExamenId: string
    UsuarioId: number
}

export interface IExamen {
    ExamenId: number
    Examen: string
}

export interface IExamenCurrent {
    ExamentId: number
    Examen: string
}

export interface IExamenCreate {
    Examen: string
}

export interface IExamenUpdate {
    ExamenId: number
    Examen: string
}