import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import DietaApi from "ClientApp/api/dieta-api";

export const useCreateDietas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DietaApi.create,
    mutationKey: [Tags.DIETAS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.DIETAS] });
    },
  });
};