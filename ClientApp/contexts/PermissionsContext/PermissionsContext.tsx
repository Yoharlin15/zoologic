
import React, { createContext, useContext, useState, useEffect } from 'react';

import { IRolesPermisos } from '#interfaces';
import { getPermissions } from 'ClientApp/utils/permissions';

interface PermissionsContextProps {
  permissions: IRolesPermisos[];
  setPermissions: (permisos: IRolesPermisos[]) => void;
}

const PermissionsContext = createContext<PermissionsContextProps | undefined>(undefined);

export const PermissionsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [permissions, setPermissionsState] = useState<IRolesPermisos[]>(getPermissions());

  // Actualizar permisos cuando cambian en el localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setPermissionsState(getPermissions());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <PermissionsContext.Provider value={{ permissions, setPermissions: setPermissionsState }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = (): PermissionsContextProps => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};
