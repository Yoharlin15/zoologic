import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { RolApi, UsuarioApi } from "ClientApp/api";
import PermisoApi from "ClientApp/api/permiso-api";

export const useFetchPermisos = () => {
  return useQuery({
    queryKey: [Tags.PERMISOS],
    queryFn: PermisoApi.getAll,
  });
};

export const useFetchOnePermiso = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.PERMISOS, id],
    queryFn: () => PermisoApi.getById?.(id),
  });
};