import { useFetchAnimales } from "ClientApp/hooks/useFetch/useFetchAnimales";
import { useFetchHabitats } from "ClientApp/hooks/useFetch/useFetchHabitats";
import { useFetchEmpleados } from "ClientApp/hooks/useFetch/useFetchEmpleados"; // Suponiendo que tienes este hook
import { Pie } from "react-chartjs-2";
import { Skeleton } from "primereact/skeleton";
import {
  Legend,
  Tooltip,
  ChartData,
  ArcElement,
  ChartOptions,
  Chart as ChartJS,
  ChartTypeRegistry,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartProps<TType extends keyof ChartTypeRegistry> = {
  data: ChartData<"pie", number[], string>;
  options?: ChartOptions<TType>;
  title: string;
};

interface IChartsProps {
  isPending?: boolean;
}

const Charts = ({ isPending }: IChartsProps) => {
  // Trae los datos
  const { data: animales, isLoading: isLoadingAnimales } = useFetchAnimales();
  const { data: habitats, isLoading: isLoadingHabitats } = useFetchHabitats();
  const { data: empleados, isLoading: isLoadingEmpleados } = useFetchEmpleados(); // Nuevo hook

  // ---- ANIMALES POR ESTADO ----
  const animalesEstados = (animales ?? []).map(
    (a: any) => a?.NombreEstado ?? "Sin estado"
  );

  const animalesCount = animalesEstados.reduce(
    (acc: Record<string, number>, estado: string) => {
      acc[estado] = (acc[estado] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const animalesData: ChartData<"pie", number[], string> = {
    labels: Object.keys(animalesCount),
    datasets: [
      {
        data: Object.values(animalesCount), // <-- number[]
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#F44336"],
        hoverBackgroundColor: ["#388E3C", "#FB8C00", "#1976D2", "#D32F2F"],
      },
    ],
  };

  // ---- HÁBITATS POR ESTADO ----
  const habitatsEstados = (habitats ?? []).map(
    (h: any) => h?.NombreEstado ?? "Sin estado"
  );

  const habitatsCount = habitatsEstados.reduce(
    (acc: Record<string, number>, estado: string) => {
      acc[estado] = (acc[estado] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const habitatsData: ChartData<"pie", number[], string> = {
    labels: Object.keys(habitatsCount),
    datasets: [
      {
        data: Object.values(habitatsCount), // <-- number[]
        backgroundColor: ["#9C27B0", "#03A9F4", "#8BC34A", "#FFC107"],
        hoverBackgroundColor: ["#7B1FA2", "#0288D1", "#388E3C", "#FFA000"],
      },
    ],
  };

  // ---- EMPLEADOS POR ESTADO ----
  const empleadosEstados = (empleados ?? []).map(
    (e: any) => e?.NombreEstado ?? "Sin estado"
  );

  const empleadosCount = empleadosEstados.reduce(
    (acc: Record<string, number>, estado: string) => {
      acc[estado] = (acc[estado] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const empleadosData: ChartData<"pie", number[], string> = {
    labels: Object.keys(empleadosCount),
    datasets: [
      {
        data: Object.values(empleadosCount), // <-- number[]
        backgroundColor: ["#FF5722", "#00BCD4", "#673AB7", "#8BC34A"],
        hoverBackgroundColor: ["#D32F2F", "#00ACC1", "#512DA8", "#388E3C"],
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        position: "bottom",
        labels: { usePointStyle: true, pointStyle: "circle" },
      },
    },
  };

  const loading = isPending || isLoadingAnimales || isLoadingHabitats || isLoadingEmpleados;

  if (loading)
    return (
      <>
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
      </>
    );

  return (
    <>
      <PieChart
        options={options}
        data={animalesData}
        title="Animales por estado"
      />
      <PieChart
        options={options}
        data={habitatsData}
        title="Hábitats por estado"
      />
      <PieChart
        options={options}
        data={empleadosData}
        title="Empleados por estado"
      />
    </>
  );
};

const PieChart = ({ data, title, options }: PieChartProps<"pie">) => {
  return (
    <div className="col-12 md:col-4">
      <div className="surface-card border-1 border-300 border-round p-4 text-center">
        <span className="text-700 text-lg font-bold">{title}</span>
        <div className="card flex justify-content-center w-full mt-2">
          <Pie data={data} options={options} style={{ maxWidth: 320, width: "100%" }} />
        </div>
      </div>
    </div>
  );
};

const ChartSkeleton = () => {
  return (
    <div className="col-12 md:col-4">
      <div className="surface-card border-1 border-300 border-round p-4">
        <div className="card flex justify-content-center w-full">
          <Skeleton width="100%" height="250px" />
        </div>
      </div>
    </div>
  );
};

export default Charts;
