import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import DietaAplicadaApi from "ClientApp/api/dietaAplicada-api";

export const useFetchDietasAplicadas = () => {
  return useQuery({
    queryKey: [Tags.DIETASAPLICADAS],
    queryFn: DietaAplicadaApi.getAll,
  });
};