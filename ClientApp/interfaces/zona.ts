export interface IZona {
    ZonaId: number,
    NombreZona: string
    FechaCreacion: string
}

export interface IZonaCurrent{
    ZonaId: number;
    NombreZona: string
}

export interface IZonaCreate {
    NombreZona: string
}

export interface IZonaUpdate {
    ZonaId: number,
    NombreZona: string
}