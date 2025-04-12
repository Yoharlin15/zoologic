export interface INecropsia {
    NecropsiaId: number,
    EspecieId: number,
    NombreComun: string;
    FechaMuerte: Date | string | null;
    Procedencia: string;
    FechaNecropsia: Date | string | null;
    Historia: string
    ExamenId: number
    Examen: string
    UsuarioId: number
    NombreUsuario: string;
}