import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import TratamientoEspecieApi from "ClientApp/api/tratamientoEspecie-api";

export const useFetchTratamientoEspecie = () => {
  return useQuery({
    queryKey: [Tags.TRATAMIENTOSESPECIES],
    queryFn: TratamientoEspecieApi.getAll,
  });
};

export const useFetchOneTratamientoEspecie = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.TRATAMIENTOSESPECIES, id],
    queryFn: () => TratamientoEspecieApi.getById?.(id),
  });
};