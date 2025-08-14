import React, { useMemo } from "react";
import { Carousel, CarouselProps } from "primereact/carousel";
import { Skeleton } from "primereact/skeleton";
import { Message } from "primereact/message";

import { IEspecie } from "#interfaces";
import { useFetchEspecies } from "ClientApp/hooks/useFetch";

const CarruselEspecies: React.FC = () => {
  const { data: especies, isLoading, isError } = useFetchEspecies();

  // Filtra solo las especies con imagen válida
  const especiesConImagen: IEspecie[] = useMemo(
    () => (especies ?? []).filter((e) => !!e.FotoUrl && e.FotoUrl.trim() !== ""),
    [especies]
  );

  const responsiveOptions: CarouselProps["responsiveOptions"] = [
    { breakpoint: "1199px", numVisible: 2, numScroll: 1 },
    { breakpoint: "991px",  numVisible: 1, numScroll: 1 },
    { breakpoint: "767px",  numVisible: 1, numScroll: 1 },
  ];

  const itemTemplate = (especie: IEspecie) => {
    if (!especie) return null;

    return (
      <div className="relative mx-auto w-full" style={{ maxWidth: 720 }}>
        <img
          src={especie.FotoUrl || "https://via.placeholder.com/700x400?text=Imagen+no+disponible"}
          alt={especie.NombreComun || "Especie"}
          loading="lazy"
          className="w-full h-[380px] object-cover rounded-xl shadow-sm"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/700x400?text=Imagen+no+disponible";
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white rounded-b-xl">
          <h3 className="text-lg font-semibold truncate">
            {especie.NombreComun ?? "Nombre no disponible"}
          </h3>
          {("NombreCientifico" in especie) && (
            // @ts-ignore — si tu IEspecie tiene NombreCientifico, lo mostramos
            <p className="text-sm opacity-90 italic truncate">{especie.NombreCientifico}</p>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[720px]">
          <Skeleton className="w-full h-[380px] mb-3" />
          <Skeleton width="60%" height="1rem" />
          <Skeleton width="40%" height="1rem" className="mt-2" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center">
        <Message severity="error" text="No se pudieron cargar las especies." />
      </div>
    );
  }

  if (!especiesConImagen.length) {
    return (
      <div className="w-full flex justify-center">
        <Message severity="info" text="No hay especies disponibles para mostrar." />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Carousel
        value={especiesConImagen}
        itemTemplate={itemTemplate}
        circular
        showIndicators
        showNavigators
        numVisible={3}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        className="w-full"
        contentClassName="px-2"
      />
    </div>
  );
};

export default CarruselEspecies;
