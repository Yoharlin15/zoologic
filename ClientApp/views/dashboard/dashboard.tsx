import React from "react";
import { AppQueryHooks } from "#hooks";

import StatsCards from "./stats-cards";

const Dashboard = () => {
  const { data, isPending } = AppQueryHooks.useFetchDashboardData();
  return (
    <DashboardContainer>
      <StatsCards isPending={isPending} totales={data?.Totales} />
    </DashboardContainer>
  );
};

const DashboardContainer = ({ children }: React.PropsWithChildren) => (
  <div className="flex flex-column flex-auto p-4">
    <div className="grid">{children}</div>
  </div>
);

export default Dashboard;
