import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Tags } from "../../core";
import { EspecieApi } from "../../api";

export const useCreateEspecie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EspecieApi.create,
    mutationKey: [Tags.ESPECIES, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ESPECIES] });
    },
  });
};

export const useUpdateEspecie= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EspecieApi.update,
    mutationKey: [Tags.ESPECIES, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ESPECIES] });
    },
  });
};
