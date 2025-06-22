import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { ComportamientoApi } from "ClientApp/api";

export const useFetchDetalleComportamiento = () => {
  return useQuery({
    queryKey: [Tags.DETALLECOMPORTAMIENTOS],
    queryFn: ComportamientoApi.getAll,
  });
};