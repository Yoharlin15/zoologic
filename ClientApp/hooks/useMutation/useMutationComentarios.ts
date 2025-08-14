import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import ComentarioApi from "ClientApp/api/comentario-api";

export const useCreateComentarios = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ComentarioApi.create,
        mutationKey: [Tags.COMENTARIOS, Tags.MUTATION_CREATE],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Tags.COMENTARIOS] });
        },
    });
};