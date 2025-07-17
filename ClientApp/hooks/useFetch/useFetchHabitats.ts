import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import HabitatApi from "ClientApp/api/habitat-api";

export const useFetchHabitats = () => {
  return useQuery({
    queryKey: [Tags.HABITATS],
    queryFn: HabitatApi.getAll,
  });
};

export const useFetchOneHabitat = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.HABITATS, id],
    queryFn: () => HabitatApi.getById?.(id),
  });
};

export const useFetchHabitatByEspecieId = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.HABITATS, id],
    queryFn: () => HabitatApi.getHabitatByEspecieId?.(id),
  });
};