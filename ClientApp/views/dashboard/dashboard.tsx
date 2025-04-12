import React from "react";
import { AppQueryHooks } from "#hooks";
import StatsCards from "./stats-cards";
import EmpleadosList from "../empleados/empleado-list";
import MapaInteractivo from "../zonas/zona";

const Dashboard = () => {
  const { data, isPending } = AppQueryHooks.useFetchDashboardData();
  return (
    <DashboardContainer>
      <StatsCards isPending={isPending} totales={data?.Totales} />
      <EmpleadosList/>
      <MapaInteractivo/>
    </DashboardContainer>
  );
};

const DashboardContainer = ({ children }: React.PropsWithChildren) => (
  <div className="flex flex-column flex-auto p-4">
    <div className="grid">{children}</div>
  </div>
);

export default Dashboard;
