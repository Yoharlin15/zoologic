import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import ExamenApi from "ClientApp/api/examen-api";

export const useFetchExamenes = () => {
  return useQuery({
    queryKey: [Tags.EXAMENES],
    queryFn: ExamenApi.getAll,
  });
};

export const useFetchOneExamen = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.EXAMENES, id],
    queryFn: () => ExamenApi.getById?.(id),
  });
};