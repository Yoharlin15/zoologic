import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { ComportamientoApi } from "ClientApp/api";

export const useCreateComportamientos = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ComportamientoApi.create,
        mutationKey: [Tags.COMPORTAMIENTOS, Tags.MUTATION_CREATE],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Tags.COMPORTAMIENTOS] });
        },
    });
};