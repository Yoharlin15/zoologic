import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";

import { EspecieApi } from "../../api";

export const useFetchEspecies = () => {
  return useQuery({
    queryKey: [Tags.ESPECIES],
    queryFn: EspecieApi.getAll,
  });
};

export const useFetchEspeciesCreateGet = () => {
  return useQuery({
    queryFn: EspecieApi.createGet,
    queryKey: [Tags.ESPECIES, Tags.CREATE_GET],
  });
};

export const useFetchEspeciesUpdateGet = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryFn: () => EspecieApi.updateGet(id),
    queryKey: [Tags.ESPECIES, Tags.UPDATE_GET],
  });
};
