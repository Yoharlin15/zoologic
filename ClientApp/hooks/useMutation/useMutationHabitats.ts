import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { HabitatApi } from "ClientApp/api";

export const useCreateHabitats = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: HabitatApi.create,
    mutationKey: [Tags.HABITATS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.HABITATS] });
    },
  });
};

export const useUpdateHabitats= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: HabitatApi.update,
    mutationKey: [Tags.HABITATS, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.HABITATS] });
    },
  });
};