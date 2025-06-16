import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { RolApi } from "../../api";

export const useCreateRoles = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: RolApi.create,
    mutationKey: [Tags.ROLES, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ROLES] });
    },
  });
};

export const useUpdateRoles= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: RolApi.update,
    mutationKey: [Tags.ROLES, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ROLES] });
    },
  });
};
