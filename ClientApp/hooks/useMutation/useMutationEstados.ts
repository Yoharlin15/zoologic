import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { EstadoApi } from "../../api";

export const useCreateEstados = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EstadoApi.create,
    mutationKey: [Tags.ESTADOS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ESTADOS] });
    },
  });
};

export const useUpdateEstados= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EstadoApi.update,
    mutationKey: [Tags.ESTADOS, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ESTADOS] });
    },
  });
};
