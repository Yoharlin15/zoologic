import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import RolesPermisosApi from "ClientApp/api/rolesPermisos-api";

export const useUpdateRolesPermisos= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: RolesPermisosApi.update,
    mutationKey: [Tags.ROLES_PERMISOS, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ROLES_PERMISOS] });
    },
  });
};