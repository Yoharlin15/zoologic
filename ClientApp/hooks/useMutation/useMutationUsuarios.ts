import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { RolApi } from "../../api";

export const useUpdateUsuarios= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: RolApi.updateUsuario,
    mutationKey: [Tags.USUARIOS, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.USUARIOS] });
    },
  });
};
