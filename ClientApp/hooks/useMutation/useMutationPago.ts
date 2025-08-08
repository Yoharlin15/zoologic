import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import PagoApi from "ClientApp/api/pago-api";

export const useCreatePago = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PagoApi.create,
    mutationKey: [Tags.PAGOS, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.PAGOS]});
    },
  });
};