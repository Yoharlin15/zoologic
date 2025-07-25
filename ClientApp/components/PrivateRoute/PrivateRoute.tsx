import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext"; // Usamos el contexto para obtener los permisos

interface PrivateRouteProps {
  requiredPermission: string;  // Permiso que estamos buscando (por ejemplo, 'Ver')
  requiredModule: string; // Módulo al que corresponde el permiso (por ejemplo, 'Dashboard')
  children?: React.ReactNode; // Children opcionales para el enrutador
}

const PrivateRoute = ({ requiredPermission, requiredModule, children }: PrivateRouteProps) => {
  const { permisos, token } = useAuth();  // Obtenemos los permisos desde el contexto de autenticación

  console.log("Permisos del usuario:", permisos);  // Debugging: Verifica los permisos del usuario
  console.log("Permiso requerido:", requiredPermission);  // Debugging: Verifica el permiso requerido
  console.log("Módulo requerido:", requiredModule);  // Debugging: Verifica el módulo requerido

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/login" replace />;
  }

  // Buscamos el módulo correspondiente en los permisos
  const modulePermissions = permisos.find((permiso) => permiso.ModuloNombre === requiredModule);

  console.log("Permisos para el módulo:", modulePermissions);  // Debugging: Verifica los permisos del módulo

  // Si no encontramos el módulo o el permiso específico no está habilitado, redirigimos
  const hasPermission = modulePermissions?.Acciones?.[requiredPermission];

  console.log("¿Usuario tiene permiso?", hasPermission);  // Debugging: Verifica si el usuario tiene el permiso

  if (!hasPermission) {
    // Si el usuario no tiene el permiso requerido, redirige a una página de acceso denegado o home
    return <Navigate to="/acceso-denegado" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
