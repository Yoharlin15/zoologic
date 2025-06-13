import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import CargoApi from "ClientApp/api/cargos-api";

export const useFetchCargos = () => {
  return useQuery({
    queryKey: [Tags.CARGOS],
    queryFn: CargoApi.getAll,
  });
};