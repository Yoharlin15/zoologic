import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { ComportamientoApi } from "ClientApp/api";

export const useCreateComportamiento = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ComportamientoApi.create,
        mutationKey: [Tags.COMPORTAMIENTOS, Tags.MUTATION_CREATE],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Tags.COMPORTAMIENTOS] });
        },
    });
};

export const useUpdateComportamiento = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ComportamientoApi.update,
        mutationKey: [Tags.COMPORTAMIENTOS, Tags.MUTATION_UPDATE],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Tags.COMPORTAMIENTOS] });
        },
    });
};