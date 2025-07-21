import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";

import { EspecieApi } from "../../api";
import { ICategoriasData } from "#interfaces";

export const useFetchEspecies = () => {
  return useQuery({
    queryKey: [Tags.ESPECIES],
    queryFn: EspecieApi.getAll,
  });
};

export const useFetchCategorias = () => {
  return useQuery<ICategoriasData>({
    queryKey: [Tags.CATEGORIAS],
    queryFn: EspecieApi.getCategorias,
  });
};

export const useFetchOneEspecie = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.ESPECIES, id],
    queryFn: () => EspecieApi.getById?.(id),
  });
};