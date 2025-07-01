import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import DetalleComportamientoAPi from "ClientApp/api/detalleComportamiento-api";

export const useCreateDetalleComportamientos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DetalleComportamientoAPi.create,
    mutationKey: [Tags.DETALLECOMPORTAMIENTOS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.DETALLECOMPORTAMIENTOS] });
    },
  });
};

export const useUpdateDetalleComportamientos= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DetalleComportamientoAPi.update,
    mutationKey: [Tags.DETALLECOMPORTAMIENTOS, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.DETALLECOMPORTAMIENTOS] });
    },
  });
};