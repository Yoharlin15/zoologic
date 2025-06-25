import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { InventarioApi } from "../../api";

export const useCreateInventario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: InventarioApi.create,
    mutationKey: [Tags.INVENTARIOS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.INVENTARIOS] });
    },
  });
};