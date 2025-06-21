import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import FamiliaApi from "ClientApp/api/familia-api";

export const useCreateFamilias = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: FamiliaApi.create,
    mutationKey: [Tags.FAMILIAS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.FAMILIAS] });
    },
  });
};

export const useUpdateFamilias= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: FamiliaApi.update,
    mutationKey: [Tags.ESTADOS, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ESTADOS] });
    },
  });
};