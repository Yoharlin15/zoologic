import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import TratamientoApi from "ClientApp/api/tratamiento-api";

export const useFetchTratamientos = () => {
  return useQuery({
    queryKey: [Tags.TRATAMIENTOS],
    queryFn: TratamientoApi.getAll,
  });
};