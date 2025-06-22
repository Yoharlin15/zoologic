import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { ComportamientoApi } from "ClientApp/api";

export const useFetchComportamientos = () => {
  return useQuery({
    queryKey: [Tags.COMPORTAMIENTOS],
    queryFn: ComportamientoApi.getAll,
  });
};
