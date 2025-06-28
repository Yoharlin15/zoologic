import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import TratamientoApi from "ClientApp/api/tratamiento-api";

export const useFetchTratamientos = () => {
  return useQuery({
    queryKey: [Tags.TRATAMIENTOS],
    queryFn: TratamientoApi.getAll,
  });
};

export const useFetchOneTratamiento = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.ESTADOS, id],
    queryFn: () => TratamientoApi.getById?.(id),
  });
};