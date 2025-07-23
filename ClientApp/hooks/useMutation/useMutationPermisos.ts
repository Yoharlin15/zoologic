import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import PermisoApi from "ClientApp/api/permiso-api";

export const useCreatePermisos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PermisoApi.create,
    mutationKey: [Tags.PERMISOS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.PERMISOS] });
    },
  });
};

export const useUpdatePermisos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PermisoApi.update,
    mutationKey: [Tags.PERMISOS, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.PERMISOS] });
    },
  });
};