// src/utils/permissions.ts

import { IRolesPermisos } from "#interfaces";

interface Permiso {
  ModuloId: number;
  ModuloNombre: string;
  Acciones: {
    Crear: boolean;
    Editar: boolean;
    Eliminar: boolean;
    Ver: boolean;
  };
}

export const getPermissions = (): IRolesPermisos[] => {
  const permisos = localStorage.getItem('permisos');
  return permisos ? JSON.parse(permisos) : [];
};

export const hasPermission = (moduloId: number, accion: keyof Permiso['Acciones']): boolean => {
  const permisos = getPermissions();
  const permisoModulo = permisos.find((p) => p.ModuloId === moduloId);

  // Si se encuentra el módulo, se verifica si tiene el permiso para la acción
  if (permisoModulo) {
    return permisoModulo.Acciones[accion] === true;
  }

  // Si no se encuentra el módulo o no tiene el permiso, retorna falso
  return false;
};

export const canViewModule = (moduloId: number): boolean => hasPermission(moduloId, 'Ver');
export const canCreateModule = (moduloId: number): boolean => hasPermission(moduloId, 'Crear');
export const canEditModule = (moduloId: number): boolean => hasPermission(moduloId, 'Editar');
export const canDeleteModule = (moduloId: number): boolean => hasPermission(moduloId, 'Eliminar');
