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

export const useCheckEmailExistence = (email: string) => {
  return useQuery({
    queryKey: ["checkEmailExistence", email], // La clave única para esta query es el email
    queryFn: () => RolApi.checkEmailExistence?.(email),
    enabled: !!email, // Solo se ejecuta si el email no está vacío
  });
};
