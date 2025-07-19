export interface RegistroDatos {
  Nombre: string;
  Email: string;
  Password: string;
  RolId: number;
  EmpleadoId: number | null;
}
// Datos para iniciar sesión
export interface LoginDatos {
  Correo: string;
  Password: string;
}

// Respuesta genérica del servidor (puedes ajustar según tu backend)
export interface RespuestaServidor {
  mensaje: string;
  exito: boolean;
  TokenJwt?: string; 
  NombreUsuario?: string;
  RolId: number;
}

// Confirmación de correo con token en URL
export type ConfirmarCorreoParams = string;

export interface IUsuario {
  UsuarioId: number;
  NombreUsuario: string;
  Email: string;
  RolId: number;
  Nombre: string;
  EmpleadoId: number;
  Nombres: string;
  Verificado: number;
}

export interface IUsuarioCurrent {
  mensaje: string;
  UsuarioId: number;
  NombreUsuario: string;
  RolId: number;
  EmpleadoId: number;
}

export interface IUsuarioUpdate {
  UsuarioId: number;
  NombreUsuario: string;
  RolId: number;
  EmpleadoId: number;
}