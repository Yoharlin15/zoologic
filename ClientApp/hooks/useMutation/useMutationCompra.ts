import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import CompraApi from "ClientApp/api/compra-api";

export const useCreateCompra = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: CompraApi.create,
        mutationKey: [Tags.COMPRAS, Tags.MUTATION_CREATE],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Tags.COMPRAS] });
        },
    });
};