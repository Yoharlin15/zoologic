import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { ZonaApi } from "../../api";

export const useCreateZonas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ZonaApi.create,
    mutationKey: [Tags.ZONAS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ZONAS] });
    },
  });
};

export const useUpdateZonas= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ZonaApi.update,
    mutationKey: [Tags.ZONAS, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ZONAS] });
    },
  });
};