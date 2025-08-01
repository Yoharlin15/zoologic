import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tags } from "../../core";
import { AnimalApi } from "../../api";

export const useCreateAnimal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AnimalApi.create,
    mutationKey: [Tags.ANIMALES, Tags.MUTATION_CREATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ANIMALES] });
    },
  });
};

export const useUpdateAnimal= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AnimalApi.update,
    mutationKey: [Tags.ANIMALES, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ANIMALES] });
    },
  });
};

export const useUpdateAnimalEstado= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AnimalApi.updateEstado,
    mutationKey: [Tags.ANIMALES, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ANIMALES] });
    },
  });
};

export const useUpdateAnimalHabitat= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AnimalApi.asignarHabitat,
    mutationKey: [Tags.ANIMALES, Tags.MUTATION_UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ANIMALES] });
    },
  });
};

export const useDeleteAnimal= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AnimalApi.delete,
    mutationKey: [Tags.ANIMALES, Tags.MUTATION_DELETE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Tags.ANIMALES] });
    },
  });
};
