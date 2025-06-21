import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import FamiliaApi from "ClientApp/api/familia-api";

export const useFetchFamilias = () => {
  return useQuery({
    queryKey: [Tags.FAMILIAS],
    queryFn: FamiliaApi.getAll,
  });
};