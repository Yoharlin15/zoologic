import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";

import { AlimentoApi } from "../../api";

export const useFetchAlimentos = () => {
  return useQuery({
    queryKey: [Tags.ALIMENTOS],
    queryFn: AlimentoApi.getAll,
  });
};