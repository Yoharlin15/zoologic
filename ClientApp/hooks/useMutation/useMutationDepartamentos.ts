import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import DepartamentoApi from "ClientApp/api/departamento-api";

export const useCreateDepartamentos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DepartamentoApi.create,
    mutationKey: [Tags.DEPARTAMENTOS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.DEPARTAMENTOS] });
    },
  });
};

export const useUpdateDepartamentos= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DepartamentoApi.update,
    mutationKey: [Tags.DEPARTAMENTOS, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.DEPARTAMENTOS] });
    },
  });
};