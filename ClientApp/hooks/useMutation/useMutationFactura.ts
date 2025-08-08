import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import FacturaApi from "ClientApp/api/factura-api";

export const useCreateFactura = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: FacturaApi.create,
        mutationKey: [Tags.FACTURAS, Tags.MUTATION_CREATE],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Tags.FACTURAS] });
        },
    });
};