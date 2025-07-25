import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthData {
    nombreUsuario: string;
    rolId: number;
    token: string;
    permisos: any[];  // Agregado permisos
}

interface AuthContextType {
    nombreUsuario: string | null;
    rolId: number | null;
    token: string | null;
    permisos: any[];  // Agregado permisos
    setAuthData: (data: AuthData) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
    const [rolId, setRolId] = useState<number | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [permisos, setPermisos] = useState<any[]>([]);  // Agregado permisos

    const [forceRender, setForceRender] = useState(0);

    const setAuthData = ({ nombreUsuario, rolId, token, permisos }: AuthData) => {
        if (nombreUsuario && token) {
            localStorage.setItem("nombreUsuario", nombreUsuario);
            if (rolId !== null) {
                localStorage.setItem("rolId", rolId.toString());
            }
            localStorage.setItem("token", token);
            localStorage.setItem("permisos", JSON.stringify(permisos));  // Guardar permisos en localStorage

            setNombreUsuario(nombreUsuario);
            setRolId(rolId);
            setToken(token);
            setPermisos(permisos);  // Establecer permisos en el estado

            setForceRender((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const nombre = localStorage.getItem("nombreUsuario");
        const rol = localStorage.getItem("rolId");
        const tokenGuardado = localStorage.getItem("token");
        const permisosGuardados = localStorage.getItem("permisos");

        if (nombre && rol && tokenGuardado) {
            setNombreUsuario(nombre);
            setRolId(Number(rol));
            setToken(tokenGuardado);
            if (permisosGuardados) {
                setPermisos(JSON.parse(permisosGuardados));  // Cargar permisos desde localStorage
            }
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        setNombreUsuario(null);
        setRolId(null);
        setToken(null);
        setPermisos([]);  // Limpiar permisos al hacer logout
    };

    return (
        <AuthContext.Provider value={{ nombreUsuario, rolId, token, permisos, setAuthData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};
