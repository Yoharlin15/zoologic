import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import CargoApi from "ClientApp/api/cargos-api";

export const useCreateCargos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CargoApi.create,
    mutationKey: [Tags.CARGOS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.CARGOS] });
    },
  });
};

  export const useUpdateCargos= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CargoApi.update,
    mutationKey: [Tags.ROLES, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ROLES] });
    },
  });
};