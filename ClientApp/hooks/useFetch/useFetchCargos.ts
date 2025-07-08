import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import CargoApi from "ClientApp/api/cargos-api";

export const useFetchCargos = () => {
  return useQuery({
    queryKey: [Tags.CARGOS],
    queryFn: CargoApi.getAll,
  });
};

export const useFetchOneCargo = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.CARGOS, id],
    queryFn: () => CargoApi.getById?.(id),
  });
};