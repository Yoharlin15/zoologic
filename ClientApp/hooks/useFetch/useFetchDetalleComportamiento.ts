import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";
import DetalleComportamientoAPi from "ClientApp/api/detalleComportamiento-api";

export const useFetchDetalleComportamiento = () => {
  return useQuery({
    queryKey: [Tags.DETALLECOMPORTAMIENTOS],
    queryFn: DetalleComportamientoAPi.getAll,
  });
};

export const useFetchOneDetalleComportamiento = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.ESTADOS, id],
    queryFn: () => DetalleComportamientoAPi.getById?.(id),
  });
};