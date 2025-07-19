import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import NecropsiaApi from "ClientApp/api/necropsia-api";

export const useFetchNecropsias = () => {
  return useQuery({
    queryKey: [Tags.NECROPSIAS],
    queryFn: NecropsiaApi.getAll,
  });
};

export const useFetchOneNecropsia = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.NECROPSIAS, id],
    queryFn: () => NecropsiaApi.getById?.(id),
  });
};