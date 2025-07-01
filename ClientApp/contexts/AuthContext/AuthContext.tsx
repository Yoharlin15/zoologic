import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthData {
    nombreUsuario: string;
    rolId: number;
    token: string;
}

interface AuthContextType {
    nombreUsuario: string | null;
    rolId: number | null;
    token: string | null;
    setAuthData: (data: AuthData) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
    const [rolId, setRolId] = useState<number | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const setAuthData = ({ nombreUsuario, rolId, token }: AuthData) => {
        if (nombreUsuario && token) {
            localStorage.setItem("nombreUsuario", nombreUsuario);
            if (rolId !== null) {
                localStorage.setItem("rolId", rolId.toString());
            }
            localStorage.setItem("token", token);

            setNombreUsuario(nombreUsuario);
            setRolId(rolId);
            setToken(token);
        }
    };

    useEffect(() => {
        const nombre = localStorage.getItem("nombreUsuario");
        const rol = localStorage.getItem("rolId");
        const tokenGuardado = localStorage.getItem("token");

        if (nombre && rol && tokenGuardado) {
            setNombreUsuario(nombre);
            setRolId(Number(rol));
            setToken(tokenGuardado);
        }
    }, []);


    const logout = () => {
        localStorage.clear();
        setNombreUsuario(null);
        setRolId(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ nombreUsuario, rolId, token, setAuthData, logout }}>
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
