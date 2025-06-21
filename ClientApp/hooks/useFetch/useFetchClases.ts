import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import ClaseApi from "ClientApp/api/clase-api";

export const useFetchClases = () => {
  return useQuery({
    queryKey: [Tags.CLASES],
    queryFn: ClaseApi.getAll,
  });
};