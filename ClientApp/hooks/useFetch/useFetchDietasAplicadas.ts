import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import DietaAplicadaApi from "ClientApp/api/dietaAplicada-api";

export const useFetchDietasAplicadas = () => {
  return useQuery({
    queryKey: [Tags.DIETASAPLICADAS],
    queryFn: DietaAplicadaApi.getAll,
  });
};

export const useFetchDietasAplicadasByAnimalId = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.DIETASAPLICADAS, id],
    queryFn: () => DietaAplicadaApi.getDietaByAnimalId?.(id),
  });
};
