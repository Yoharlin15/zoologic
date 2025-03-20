import millify from "millify";
import { ITotals } from "#interfaces";
import { Image } from "primereact/image";
import { Skeleton } from "primereact/skeleton";

type CardItem = {
  label: string;
  value: string;
  img: string;
};

const images: Record<string, string> = {
  Especies: "",
  Empleados: "",
  Visitantes: "",
  Habitats: "",
};

interface IStatsCardsProps {
  totales?: ITotals;
  isPending: boolean;
}

const defaultTotals: ITotals = {
  Especies: 0,
  Empleados: 0,
  Visitantes: 0,
  Habitats: 0,
};

const StatsCards = ({
  isPending,
  totales = defaultTotals,
}: IStatsCardsProps) => {
  const items: CardItem[] = Object.keys(totales).map((key) => ({
    label: key,
    img: images[key],
    value: millify(totales[key as keyof ITotals]),
  }));

  if (isPending) return <StatsCardsSkeleton />;

  return (
    <div className="col-12">
      <div className="grid">
        {items.map((item) => (
          <div key={item.label} className="col-12 md:col-6 xl:col-3">
            <div className="border-1 border-300 border-round surface-card p-3">
              <div className="flex align-items-center justify-content-between">
                <div>
                  <span className="text-2xl text-900 font-bold">
                    {item.value}
                  </span>
                  <p className="mt-1 mb-0 text-600">{item.label}</p>
                </div>
                <div>
                  <Image
                    height="64"
                    src={item.img}
                    alt={`${item.label} image`}
                  />
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
            <div className="border-1 border-300 border-round surface-card p-3">
              <div className="flex align-items-center justify-content-between gap-2">
                <div className="w-full">
                  <Skeleton width="2rem" height="2rem" className="mb-2" />
                  <Skeleton width="100%" height="1rem" />
                </div>
                <div>
                  <Skeleton size="64px" />
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
