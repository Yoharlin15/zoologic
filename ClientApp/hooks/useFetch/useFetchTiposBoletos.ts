import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import TipoBoletoApi from "ClientApp/api/tipoBoleto-api";

export const useFetchTiposBoletos = () => {
  return useQuery({
    queryKey: [Tags.TIPOSBOLETOS],
    queryFn: TipoBoletoApi.getAll,
  });
};