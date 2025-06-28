import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import NecropsiaApi from "ClientApp/api/necropsia-api";

export const useCreateNecropsias = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: NecropsiaApi.create,
    mutationKey: [Tags.NECROPSIAS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.NECROPSIAS] });
    },
  });
};
