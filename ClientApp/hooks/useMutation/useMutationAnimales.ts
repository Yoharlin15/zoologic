import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { AnimalApi } from "../../api";

export const useCreateAnimal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AnimalApi.create,
    mutationKey: [Tags.ANIMALES, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ANIMALES] });
    },
  });
};