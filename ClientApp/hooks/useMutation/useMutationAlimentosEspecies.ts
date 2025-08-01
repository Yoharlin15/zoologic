import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import AlimentoEspecieApi from "ClientApp/api/alimentoEspecie-api";

export const useCreateAlimentosEspecies = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AlimentoEspecieApi.create,
    mutationKey: [Tags.ALIMENTOSESPECIES, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ALIMENTOSESPECIES] });
    },
  });
};