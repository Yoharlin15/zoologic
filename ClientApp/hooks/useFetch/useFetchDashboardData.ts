import { Tags } from "#core";
import { useQuery } from "@tanstack/react-query";

import { DashboardApi } from "../../api";

export const useFetchDashboardData = () => {
  return useQuery({
    refetchInterval: 3000,
    queryKey: [Tags.DASHBOARD],
    queryFn: DashboardApi.getDashboardData,
  });
};
