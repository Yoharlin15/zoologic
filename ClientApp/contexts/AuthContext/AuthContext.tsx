import React, { createContext, useContext, useState } from "react";

interface AuthData {
  usuarioId: number;
  empleadoId: number;
  nombreUsuario: string;
  rolId: number;
  token: string;
  permisos: any[];
}

interface AuthContextType {
  usuarioId: number | null;
  empleadoId: number | null;
  nombreUsuario: string | null;
  rolId: number | null;
  token: string | null;
  permisos: any[] | null;           // <- null = aún no cargado
  isReady: boolean;                 // <- bandera de hidratación lista
  setAuthData: (data: AuthData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readNumber = (k: string): number | null => {
  const v = localStorage.getItem(k);
  return v !== null && v !== "" && !Number.isNaN(Number(v)) ? Number(v) : null;
};

const readJSON = <T,>(k: string): T | null => {
  const raw = localStorage.getItem(k);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  // Hidratación SINCRÓNICA (lazy initializer)
  const [usuarioId, setUsuarioId]   = useState<number | null>(() => readNumber("usuarioId"));
  const [empleadoId, setEmpleadoId] = useState<number | null>(() => readNumber("empleadoId"));
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(() => localStorage.getItem("nombreUsuario"));
  const [rolId, setRolId]           = useState<number | null>(() => readNumber("rolId"));
  const [token, setToken]           = useState<string | null>(() => localStorage.getItem("token"));
  const [permisos, setPermisos]     = useState<any[] | null>(() => readJSON<any[]>("permisos"));

  // Como ya leímos todo sincrónicamente, el contexto está listo en el primer render
  const isReady = true;

  const setAuthData = ({ usuarioId, nombreUsuario, empleadoId, rolId, token, permisos }: AuthData) => {
    // Persistir
    localStorage.setItem("usuarioId", String(usuarioId));
    localStorage.setItem("nombreUsuario", nombreUsuario);
    localStorage.setItem("rolId", String(rolId));
    localStorage.setItem("token", token);
    localStorage.setItem("empleadoId", String(empleadoId ?? ""));
    localStorage.setItem("permisos", JSON.stringify(permisos));

    // Estado
    setUsuarioId(usuarioId);
    setNombreUsuario(nombreUsuario);
    setEmpleadoId(empleadoId ?? null);
    setRolId(rolId);
    setToken(token);
    setPermisos(permisos);
  };

  const logout = () => {
    // Borra solo lo tuyo, no todo el LS
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("rolId");
    localStorage.removeItem("token");
    localStorage.removeItem("empleadoId");
    localStorage.removeItem("permisos");

    setUsuarioId(null);
    setNombreUsuario(null);
    setEmpleadoId(null);
    setRolId(null);
    setToken(null);
    setPermisos([]);
  };

  return (
    <AuthContext.Provider
      value={{ usuarioId, empleadoId, nombreUsuario, rolId, token, permisos, isReady, setAuthData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return ctx;
};
