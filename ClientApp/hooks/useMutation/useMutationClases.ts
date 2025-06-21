import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import ClaseApi from "ClientApp/api/clase-api";

export const useCreateClases = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ClaseApi.create,
        mutationKey: [Tags.CLASES, Tags.MUTATION_CREATE],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Tags.CLASES] });
        },
    });
};

export const useUpdateClases = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ClaseApi.update,
        mutationKey: [Tags.ESTADOS, Tags.MUTATION_UPDATE],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Tags.CLASES] });
        },
    });
};