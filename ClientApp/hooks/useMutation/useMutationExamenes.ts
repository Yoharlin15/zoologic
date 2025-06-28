import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import ExamenApi from "ClientApp/api/examen-api";

export const useCreateExamenes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ExamenApi.create,
    mutationKey: [Tags.EXAMENES, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.EXAMENES] });
    },
  });
};

export const useUpdateExamenes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ExamenApi.update,
    mutationKey: [Tags.EXAMENES, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.EXAMENES] });
    },
  });
};