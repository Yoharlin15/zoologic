import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import ComentarioApi from "ClientApp/api/comentario-api";

export const useFetchComentarios = () => {
  return useQuery({
    queryKey: [Tags.COMENTARIOS],
    queryFn: ComentarioApi.getAll,
  });
};
