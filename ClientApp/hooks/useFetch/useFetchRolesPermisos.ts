import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { RolApi, UsuarioApi } from "ClientApp/api";
import RolesPermisosApi from "ClientApp/api/rolesPermisos-api";

export const useFetchRolesPermisos = () => {
  return useQuery({
    queryKey: [Tags.ROLES_PERMISOS],
    queryFn: RolesPermisosApi.getAll,
  });
};

export const useFetchOneRolPermiso = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.ESTADOS, id],
    queryFn: () => RolesPermisosApi.getById?.(id),
  });
};