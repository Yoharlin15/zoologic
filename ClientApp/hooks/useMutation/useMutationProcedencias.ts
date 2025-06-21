import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import ProcedenciaApi from "ClientApp/api/procedencia-api";

export const useCreateProcedencias = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ProcedenciaApi.create,
    mutationKey: [Tags.PROCEDENCIAS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.PROCEDENCIAS] });
    },
  });
};

export const useUpdateProcedencias= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ProcedenciaApi.update,
    mutationKey: [Tags.PROCEDENCIAS, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.PROCEDENCIAS] });
    },
  });
};