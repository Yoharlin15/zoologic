import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";

import { EspecieApi } from "../../api";

export const useFetchEspecies = () => {
  return useQuery({
    queryKey: [Tags.ESPECIES],
    queryFn: EspecieApi.getAll,
  });
};

export const useFetchOneEspecie = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.ESPECIES, id],
    queryFn: () => EspecieApi.getById?.(id),
  });
};