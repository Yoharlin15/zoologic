import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { UsuarioApi } from "ClientApp/api";

export const useFetchRoles = () => {
  return useQuery({
    queryKey: [Tags.ROLES],
    queryFn: UsuarioApi.GetAllRoles,
  });
};