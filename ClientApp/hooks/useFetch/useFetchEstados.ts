import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { EstadoApi } from "ClientApp/api";

export const useFetchEstados = () => {
  return useQuery({
    queryKey: [Tags.ESTADOS],
    queryFn: EstadoApi.getAll,
  });
};