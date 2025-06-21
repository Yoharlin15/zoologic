import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import ProcedenciaApi from "ClientApp/api/procedencia-api";

export const useFetchProcedencias = () => {
  return useQuery({
    queryKey: [Tags.PROCEDENCIAS],
    queryFn: ProcedenciaApi.getAll,
  });
};