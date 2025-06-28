import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { TratamientoApi } from "../../api";

export const useCreateTratamientos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TratamientoApi.create,
    mutationKey: [Tags.TRATAMIENTOS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.TRATAMIENTOS] });
    },
  });
};

export const useUpdateTratamientos= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TratamientoApi.update,
    mutationKey: [Tags.TRATAMIENTOS, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.TRATAMIENTOS] });
    },
  });
};