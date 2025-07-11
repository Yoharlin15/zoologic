import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { EmpleadoApi } from "../../api";

export const useCreateEmpleado = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EmpleadoApi.create,
    mutationKey: [Tags.EMPLEADOS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.EMPLEADOS] });
    },
  });
};

export const useUpdateEmpleado= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EmpleadoApi.update,
    mutationKey: [Tags.EMPLEADOS, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.EMPLEADOS] });
    },
  });
};
