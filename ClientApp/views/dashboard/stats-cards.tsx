import millify from "millify";
import { ITotals } from "#interfaces";
import { Skeleton } from "primereact/skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faUsers,
  faUserTie,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";

type CardItem = {
  label: string;
  value: string;
  icon: JSX.Element;
  color: string;
};

interface IStatsCardsProps {
  totales?: ITotals;
  isPending: boolean;
}

const defaultTotals: ITotals = {
  Especies: 0,
  Empleados: 0,
  Visitantes: 0,
  Zonas: 0,
};

const StatsCards = ({
  isPending,
  totales = defaultTotals,
}: IStatsCardsProps) => {
  const items: CardItem[] = [
    {
      label: "Especies",
      value: millify(totales.Especies),
      icon: <FontAwesomeIcon icon={faPaw} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Empleados",
      value: millify(totales.Empleados),
      icon: <FontAwesomeIcon icon={faUserTie} />,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Visitantes",
      value: millify(totales.Visitantes),
      icon: <FontAwesomeIcon icon={faUsers} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Zonas",
      value: millify(totales.Zonas),
      icon: <FontAwesomeIcon icon={faMapMarkedAlt} />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  if (isPending) return <StatsCardsSkeleton />;

  return (
    <div className="col-12">
      <div className="grid">
        {items.map((item) => (
          <div key={item.label} className="col-12 md:col-6 xl:col-3">
            <div className="border-1 border-300 border-round surface-card p-4 hover:shadow-2 transition-all transition-duration-300">
              <div className="flex align-items-center justify-content-between">
                <div>
                  <span className="text-2xl text-900 font-bold block mb-1">
                    {item.value}
                  </span>
                  <p className="mt-0 mb-0 text-600">{item.label}</p>
                </div>
                <div
                  className={`flex align-items-center justify-content-center border-circle ${item.color}`}
                  style={{ width: "64px", height: "64px" }}
                >
                  <span className="text-3xl">{item.icon}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatsCardsSkeleton = () => {
  const skeletonItems = [1, 2, 3, 4];

  return (
    <div className="col-12">
      <div className="grid">
        {skeletonItems.map((_, index) => (
          <div key={index} className="col-12 md:col-6 xl:col-3">
            <div className="border-1 border-300 border-round surface-card p-4">
              <div className="flex align-items-center justify-content-between gap-2">
                <div className="w-full">
                  <Skeleton width="3rem" height="2rem" className="mb-2" />
                  <Skeleton width="100%" height="1rem" />
                </div>
                <div>
                  <Skeleton shape="circle" size="64px" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;