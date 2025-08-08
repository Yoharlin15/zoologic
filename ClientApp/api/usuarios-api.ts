import axios from 'axios';
import {
  RegistroDatos,
  LoginDatos,
  RespuestaServidor,
} from '../interfaces/account';

const api = axios.create({
  baseURL: 'https://zoologic-abdteghscscrbhc4.canadacentral-01.azurewebsites.net/', // Ajusta según tu entorno
  withCredentials: true,
});

// Interceptor para incluir el token en todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const registrarUsuario = (datos: RegistroDatos) =>
  api.post<RespuestaServidor>('/api/Usuario/Register', datos);

export const loginUsuario = async (credenciales: LoginDatos): Promise<RespuestaServidor> => {
  const response = await api.post<RespuestaServidor>('/api/Usuario/Login', credenciales);

  const { TokenJwt, UsuarioId, EmpleadoId, NombreUsuario, RolId, Permisos } = response.data;

  if (TokenJwt) {
    localStorage.setItem('token', TokenJwt);
    if (UsuarioId !== undefined) {
      localStorage.setItem('usuarioId', UsuarioId.toString());
    }
    if (EmpleadoId !== undefined && EmpleadoId !== null) {
      localStorage.setItem('empleadoId', EmpleadoId.toString());
    } 
    if (NombreUsuario) {
      localStorage.setItem('nombreUsuario', NombreUsuario);
    }
    if (RolId !== undefined) {
      localStorage.setItem('rolId', RolId.toString());
    }
    if (Permisos) {
         localStorage.setItem('permisos', JSON.stringify(Permisos));
    }
  } else {
    console.warn("⚠️ No se recibió un token del backend:", response.data);
  }

  return response.data;
};



export const confirmarCorreo = async (token: string) => {
  try {
    const tokenCodificado = encodeURIComponent(token);
    const response = await api.get(`/api/Usuario/ConfirmarCorreo?token=${tokenCodificado}`);

    console.log("✅ Respuesta exitosa del servidor:", response.data);
    return {
      exito: true,
      mensaje: response.data.mensaje || "Cuenta verificada correctamente"
    };

  } catch (error: any) {
    console.log("📋 Error capturado:", error);

    // Si el error tiene respuesta del servidor (400, 404, 500, etc.)
    if (error.response && error.response.data) {
      console.log("📊 Datos de respuesta de error:", error.response.data);
      console.log("🔢 Status code:", error.response.status);

      return {
        exito: false,
        mensaje: error.response.data.mensaje || error.response.data.Message || "Error al verificar la cuenta"
      };
    }

    // Si es un error de red u otro tipo
    console.error("❌ Error de red o conexión:", error.message);
    return {
      exito: false,
      mensaje: "Error de conexión. Verifica tu internet y vuelve a intentar."
    };
  }
};

export const GetAllUsuarios = async () => {
  try {
    const response = await api.get('/api/Usuario/Get');

    console.log("✅ Usuarios obtenidos exitosamente:", response.data);
    return response.data; // ✅ Devolver directamente los datos

  } catch (error: any) {
    console.log("📋 Error al obtener usuarios:", error);

    if (error.response && error.response.data) {
      console.log("📊 Datos de respuesta de error:", error.response.data);
      console.log("🔢 Status code:", error.response.status);

      throw new Error(error.response.data.mensaje || error.response.data.Message || "Error al obtener los usuarios");
    }

    throw new Error("Error de conexión al obtener usuarios");
  }
};

export const logoutUsuario = (): void => {
  localStorage.removeItem('token');
};
