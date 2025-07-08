import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import DepartamentoApi from "ClientApp/api/departamento-api";

export const useFetchDepartamentos = () => {
  return useQuery({
    queryKey: [Tags.DEPARTAMENTOS],
    queryFn: DepartamentoApi.getAll,
  });
};

export const useFetchOneDepartamento = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.DEPARTAMENTOS, id],
    queryFn: () => DepartamentoApi.getById?.(id),
  });
};