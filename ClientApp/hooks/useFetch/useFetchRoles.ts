import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { RolApi, UsuarioApi } from "ClientApp/api";

export const useFetchRoles = () => {
  return useQuery({
    queryKey: [Tags.ROLES],
    queryFn: RolApi.getAll,
  });
};

export const useFetchOneRol = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.ESTADOS, id],
    queryFn: () => RolApi.getById?.(id),
  });
};