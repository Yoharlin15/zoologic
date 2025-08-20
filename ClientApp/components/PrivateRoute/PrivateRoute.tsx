import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext";

interface PrivateRouteProps {
  requiredPermission: string;
  requiredModule: string;
  children?: React.ReactNode;
}

const PrivateRoute = ({ requiredPermission, requiredModule, children }: PrivateRouteProps) => {
  const { token, permisos, isReady } = useAuth();

  // No decidas nada hasta que el contexto esté listo
  if (!isReady) {
    return <div style={{ padding: 16 }}>Cargando…</div>;
  }

  // Si no hay token real → login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si aún no hay permisos cargados (null) muestra loader. Si usas siempre LS, normalmente ya habrá.
  if (!permisos) {
    return <div style={{ padding: 16 }}>Cargando permisos…</div>;
  }

  const modulePermissions = permisos.find((p: any) => p.ModuloNombre === requiredModule);
  const hasPermission = !!modulePermissions?.Acciones?.[requiredPermission];

  if (!hasPermission) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
