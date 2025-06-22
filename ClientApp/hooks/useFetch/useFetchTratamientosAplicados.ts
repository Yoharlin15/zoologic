import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import TratamientoAplicadoApi from "ClientApp/api/tratamientoAplicado-api";

export const useFetchTratamientosAplicados = () => {
  return useQuery({
    queryKey: [Tags.TRATAMIENTOSAPLICADOS],
    queryFn: TratamientoAplicadoApi.getAll,
  });
};