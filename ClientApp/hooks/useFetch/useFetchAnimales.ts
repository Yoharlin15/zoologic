import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";

import { AnimalApi } from "../../api";

export const useFetchAnimales = () => {
  return useQuery({
    queryKey: [Tags.ANIMALES],
    queryFn: AnimalApi.getAll,
  });
};

export const useFetchOneAnimal = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.ANIMALES, id],
    queryFn: () => AnimalApi.getById?.(id),
  });
};