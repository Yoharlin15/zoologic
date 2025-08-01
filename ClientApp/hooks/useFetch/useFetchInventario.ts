import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import { InventarioApi } from "../../api";
import { IUnidadMedidaByAlimentoId } from "#interfaces";

export const useFetchInventario = () => {
  return useQuery({
    queryKey: [Tags.INVENTARIOS],
    queryFn: InventarioApi.getAll,
  });
};

export const useFetchOneInventario = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.INVENTARIOS, id],
    queryFn: () => InventarioApi.getById?.(id),
  });
};

export const useFetchUnidadMedidaByAlimentoId = (id: number) => {
  return useQuery<IUnidadMedidaByAlimentoId[]>({
    enabled: !!id,
    queryKey: [Tags.UNIDADES, id],
    queryFn: () => InventarioApi.getUnidadMedidaByAlimentoId(id),
  });
};