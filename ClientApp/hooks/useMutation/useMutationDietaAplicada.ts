import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import DietaAplicadaApi from "ClientApp/api/dietaAplicada-api";

export const useCreateDietasAplicadas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DietaAplicadaApi.create,
    mutationKey: [Tags.DIETASAPLICADAS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.DIETASAPLICADAS] });
    },
  });
};