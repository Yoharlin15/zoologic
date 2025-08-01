import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import UnidadMedidaApi from "ClientApp/api/unidadMedida-api";

export const useFetchUnidadesMedidas = () => {
  return useQuery({
    queryKey: [Tags.UNIDADES],
    queryFn: UnidadMedidaApi.getAll,
  });
};
