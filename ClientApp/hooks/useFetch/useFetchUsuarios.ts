import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { UsuarioApi } from "ClientApp/api";

export const useFetchUsuarios = () => {
  return useQuery({
    queryKey: [Tags.USUARIOS],
    queryFn: UsuarioApi.getAll,
  });
};