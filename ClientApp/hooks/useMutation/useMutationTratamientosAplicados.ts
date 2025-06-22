import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import TratamientoAplicadoApi from "ClientApp/api/tratamientoAplicado-api";

export const useCreateTratamientosAplicados = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: TratamientoAplicadoApi.create,
        mutationKey: [Tags.TRATAMIENTOSAPLICADOS, Tags.MUTATION_CREATE],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Tags.TRATAMIENTOSAPLICADOS] });
        },
    });
};