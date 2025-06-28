import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { ZonaApi } from "ClientApp/api";

export const useFetchZonas = () => {
  return useQuery({
    queryKey: [Tags.ZONAS],
    queryFn: ZonaApi.getAll,
  });
};

export const useFetchOneZona = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.ZONAS, id],
    queryFn: () => ZonaApi.getById?.(id),
  });
};