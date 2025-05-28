export interface RegistroDatos {
  Nombre: string;
  Email: string;
  Password: string;
  RolId: number; // Agrega RolId si es requerido
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
}

// Confirmación de correo con token en URL
export type ConfirmarCorreoParams = string;
