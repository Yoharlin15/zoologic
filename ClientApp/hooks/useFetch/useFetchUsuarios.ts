import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { RolApi, UsuarioApi } from "ClientApp/api";

export const useFetchUsuarios = () => {
  return useQuery({
    queryKey: [Tags.USUARIOS],
    queryFn: UsuarioApi.GetAllUsuarios,
  });
};

export const useFetchOneUsuario = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.USUARIOS, id],
    queryFn: () => RolApi.getUsuarioById?.(id),
  });
};
