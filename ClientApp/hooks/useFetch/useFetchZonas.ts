import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { ZonaApi } from "ClientApp/api";

export const useFetchZonas = () => {
  return useQuery({
    queryKey: [Tags.ZONAS],
    queryFn: ZonaApi.getAll,
  });
};