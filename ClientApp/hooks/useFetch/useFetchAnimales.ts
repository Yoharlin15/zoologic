import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";

import { AnimalApi } from "../../api";
import { IHabitaByAnimal } from "#interfaces";

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

export const useFetchAnimalByEspecieId = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.ANIMALES, id],
    queryFn: () => AnimalApi.getAnimalByEspecieId?.(id),
  });
};

export const useFetchHabitatByAnimalId = (id: number) => {
  return useQuery<IHabitaByAnimal[]>({
    enabled: !!id,
    queryKey: [Tags.ANIMALES, id],
    queryFn: () => AnimalApi.getHabitatByAnimalId(id),
  });
};


