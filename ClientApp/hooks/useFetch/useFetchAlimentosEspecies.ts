import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import AlimentoEspecieApi from "ClientApp/api/alimentoEspecie-api";

export const useFetchAlimentosEspecies = () => {
  return useQuery({
    queryKey: [Tags.ALIMENTOSESPECIES],
    queryFn: AlimentoEspecieApi.getAll,
  });
};