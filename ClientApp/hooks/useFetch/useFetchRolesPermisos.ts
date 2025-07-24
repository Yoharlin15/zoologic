import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import RolesPermisosApi from "ClientApp/api/rolesPermisos-api";

export const useFetchPermisosByRolId = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.ROLES_PERMISOS, id],
    queryFn: () => RolesPermisosApi.getById?.(id),
  });
};