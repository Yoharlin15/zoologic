import React from "react";
import { AppQueryHooks } from "#hooks";
import StatsCards from "./stats-cards";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";
import { useFetchAnimales, useFetchHabitats } from "ClientApp/hooks/useFetch";

const DashboardContainer = ({ children }: React.PropsWithChildren) => (
  <div className="flex flex-col flex-auto p-4">
    <div className="grid">{children}</div>
  </div>
);

const Dashboard = () => {
  const { data, isPending } = AppQueryHooks.useFetchDashboardData();
  const { data: animales } = useFetchAnimales();
  const { data: habitats } = useFetchHabitats();

  // Prepara los datos para el gráfico de animales
  const estados = animales?.map((animal: any) => animal.NombreEstado) || [];
  const estadosCount = estados.reduce((acc: any, estado: string) => {
    acc[estado] = (acc[estado] || 0) + 1;
    return acc;
  }, {});
  const chartDataAnimales = {
    labels: Object.keys(estadosCount),
    datasets: [
      {
        data: Object.values(estadosCount),
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#F44336"], // Colores personalizados
        hoverBackgroundColor: ["#388E3C", "#FB8C00", "#1976D2", "#D32F2F"],
      }
    ]
  };

  // Prepara los datos para el gráfico de hábitats
  const estadosHabitats = habitats?.map((habitat: any) => habitat.NombreEstado) || [];
  const estadosHabitatsCount = estadosHabitats.reduce((acc: any, estado: string) => {
    acc[estado] = (acc[estado] || 0) + 1;
    return acc;
  }, {});
  const chartDataHabitats = {
    labels: Object.keys(estadosHabitatsCount),
    datasets: [
      {
        label: "Cantidad de Hábitats",
        data: Object.values(estadosHabitatsCount),
        backgroundColor: ["#9C27B0", "#03A9F4", "#8BC34A"],
        borderColor: ["#7B1FA2", "#0288D1", "#388E3C"],
        borderWidth: 1,
      }
    ]
  };

  // Opciones del gráfico Pie
  const chartOptions = {
    plugins: {
      legend: {
        position: 'left',  // Cambiar la posición de la leyenda
        labels: {
          boxWidth: 10,  // Tamaño del cuadro de la leyenda
          padding: 10,   // Espaciado entre la leyenda y las etiquetas
        }
      }
    }
  };

  return (
    <DashboardContainer>
      {/* Cards */}
      <StatsCards isPending={isPending} totales={data?.Totales} />
      <div className="flex justify-between gap-4">
        <Card
          title="Distribución por Estado de los Animales"
          className="ml-2 text-center"
          style={{ width: '40rem', minWidth: '34.5rem', maxWidth: '24rem' }}
        >
          <div className="flex justify-center items-center" style={{ height: '350px' }}> {/* Aumenté la altura aquí */}
            <Chart
              type="pie"
              data={chartDataAnimales}
              options={chartOptions}
              style={{ width: '100%', height: '100%', maxWidth: '350px', maxHeight: '350px' }}>
            </Chart>
          </div>
        </Card>


        <Card
          title="Distribución por Estado de los habitats"
          className="mr-2 text-center"
          style={{ width: '40rem', minWidth: '34.5rem', maxWidth: '24rem' }}
        >
          <div className="flex justify-center items-center" style={{ height: '300px' }}>
            <Chart
              type="bar"
              data={chartDataHabitats}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </Card>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
