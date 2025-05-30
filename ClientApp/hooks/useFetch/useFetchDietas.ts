import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import DietaApi from "ClientApp/api/dieta-api";

export const useFetchDietas = () => {
  return useQuery({
    queryKey: [Tags.DIETAS],
    queryFn: DietaApi.getAll,
  });
};

export const useFetchOneDieta = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.DIETAS, id],
    queryFn: () => DietaApi.getById?.(id),
  });
};