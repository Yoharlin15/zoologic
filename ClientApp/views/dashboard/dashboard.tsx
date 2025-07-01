import React from "react";
import { AppQueryHooks } from "#hooks";
import StatsCards from "./stats-cards";
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext";

const DashboardContainer = ({ children }: React.PropsWithChildren) => (
  <div className="flex flex-col flex-auto p-4">
    <div className="grid">{children}</div>
  </div>
);

const Dashboard = () => {
  const { data, isPending } = AppQueryHooks.useFetchDashboardData();
  const { nombreUsuario } = useAuth();

  return (
    <DashboardContainer>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">¡Bienvenido de nuevo, {nombreUsuario || "usuario"}! 👋</h1>
        <p className="text-gray-600">Aquí tienes un resumen de todo lo que ocurre en tu sistema..</p>
      </div>
      <StatsCards isPending={isPending} totales={data?.Totales} />
    </DashboardContainer>
  );
};

export default Dashboard;
