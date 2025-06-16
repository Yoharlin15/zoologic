import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { PadreApi } from "../../api";

export const useCreatePadres = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PadreApi.create,
    mutationKey: [Tags.PADRES, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.PADRES] });
    },
  });
};
