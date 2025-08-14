export interface IComentario {
    ComentarioId: number;
    Tipo: string;
    Comentario: string;
    Nombre: string;
    Correo: string;
    Telefono: string;
    FechaCreacion: string;
}

export interface ICreateComentario {
    Tipo: string;
    Comentario: string;
    Nombre: string;
    Correo: string;
    Telefono: string;
}