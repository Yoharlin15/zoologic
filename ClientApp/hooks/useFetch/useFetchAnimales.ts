import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";

import { AnimalApi } from "../../api";

export const useFetchAnimales = () => {
  return useQuery({
    queryKey: [Tags.ANIMALES],
    queryFn: AnimalApi.getAll,
  });
};