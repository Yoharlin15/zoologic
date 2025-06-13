import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { AnimalApi, EmpleadoApi } from "../../api";

export const useCreateEmpleado = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EmpleadoApi.create,
    mutationKey: [Tags.ANIMALES, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.EMPLEADOS] });
    },
  });
};