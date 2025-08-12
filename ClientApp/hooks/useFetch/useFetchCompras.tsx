import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import CompraApi from "ClientApp/api/compra-api";

export const useFetchCompras = () => {
  return useQuery({
    queryKey: [Tags.COMPRAS],
    queryFn: CompraApi.getAll,
  });
};