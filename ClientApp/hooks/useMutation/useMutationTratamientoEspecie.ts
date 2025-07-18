import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import TratamientoEspecieApi from "ClientApp/api/tratamientoEspecie-api";

export const useCreateTratamientoEspecie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TratamientoEspecieApi.create,
    mutationKey: [Tags.TRATAMIENTOSESPECIES, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.TRATAMIENTOSESPECIES] });
    },
  });
};

export const useUpdateTratamientoEspecie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TratamientoEspecieApi.update,
    mutationKey: [Tags.TRATAMIENTOSESPECIES, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.TRATAMIENTOSESPECIES] });
    },
  });
};