import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";

import { InventarioApi } from "../../api";

export const useFetchInventario = () => {
  return useQuery({
    queryKey: [Tags.INVENTARIOS],
    queryFn: InventarioApi.getAll,
  });
};