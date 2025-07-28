import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";

import { EmpleadoApi } from "../../api";

export const useFetchEmpleados = () => {
  return useQuery({
    queryKey: [Tags.EMPLEADOS],
    queryFn: EmpleadoApi.getAll,
  });
};

export const useFetchOneEmpleado = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.EMPLEADOS, id],
    queryFn: () => EmpleadoApi.getById?.(id),
  });
};

export const useFetchEmpleadoByEstadoId = (id: number) => {
  return useQuery({
    enabled: !!id,
    queryKey: [Tags.EMPLEADOS, id],
    queryFn: () => EmpleadoApi.getEmpleadoByEstadoId?.(id),
  });
};

export const useFetchEmpleadoReportes = (filtros: any) => {
  return useQuery({
    enabled: false, // No se ejecuta al montar
    queryKey: [Tags.EMPLEADOS, filtros],
    queryFn: () => EmpleadoApi.getEmpleadoReportes?.(filtros),
  });
};
