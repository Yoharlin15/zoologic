import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { AlimentoApi } from "../../api";

export const useCreateAlimentos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AlimentoApi.create,
    mutationKey: [Tags.ALIMENTOS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ALIMENTOS] });
    },
  });
};