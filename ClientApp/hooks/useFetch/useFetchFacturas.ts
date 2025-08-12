import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import FacturaApi from "ClientApp/api/factura-api";

export const useFetchOneFactura = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.FACTURAS, id],
    queryFn: () => FacturaApi.getById?.(id)
  });
};

export const useFetchOneFacturaDetalle = (id: number, options?: any) => {
  return useQuery({
    enabled: !!id && (options?.enabled ?? true),
    queryKey: [Tags.FACTURAS, "detalle", id],
    queryFn: () => FacturaApi.getDetalleById?.(id),
    ...options,
  });
};
