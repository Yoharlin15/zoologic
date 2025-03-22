import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";

import { EmpleadoApi } from "../../api";

export const useFetchEmpleados = () => {
  return useQuery({
    queryKey: [Tags.EMPLEADOS],
    queryFn: EmpleadoApi.getAll,
  });
};