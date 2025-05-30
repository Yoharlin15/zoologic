import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";

import HabitatApi from "ClientApp/api/habitat-api";

export const useFetchHabitats = () => {
  return useQuery({
    queryKey: [Tags.HABITATS],
    queryFn: HabitatApi.getAll,
  });
};