import React, { useState, useMemo } from "react";
import { TabView, TabPanel, TabViewTabChangeEvent } from "primereact/tabview";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import dayjs from "dayjs";
import DietasList from "../alimentacion/dietas/dieta-list";
import TratamientosList from "../salud/tratamientos/tratamiento-list";
import { useFetchOneDieta } from "ClientApp/hooks/useFetch/useFetchDietas";

// Definimos el tipo para las columnas
type TableColumn = {
  filter: boolean;
  sortable: boolean;
  header: string;
  field: keyof IAnimal;
  style: React.CSSProperties;
  body?: (rowData: IAnimal | null) => React.ReactNode;
};

export interface IAnimal {
  AnimalId: number;
  Alias: string;
  EspecieId: number;
  NombreCientifico: string;
  Sexo: string;
  FechaNacimiento: Date | string | null;
  Observaciones: string;
  ZonaId: number;
  NombreZona: string;
}

type AnimalDetailProps = {
  animal: IAnimal;
  loading?: boolean;
  onEdit?: (animal: IAnimal) => void;
};

const AnimalDetail: React.FC<AnimalDetailProps> = ({ animal, loading = false, onEdit }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: dieta, isLoading: loadingDieta } = useFetchOneDieta(animal.AnimalId);

  // Definición optimizada de columnas con useMemo
  const columns = useMemo<TableColumn[]>(() => [
    {
      filter: true,
      sortable: true,
      header: "Alias",
      field: "Alias",
      style: { minWidth: "12rem" }
    },
    {
      filter: true,
      sortable: true,
      header: "Especie",
      field: "NombreCientifico",
      style: { minWidth: "12rem" }
    },
    {
      filter: true,
      sortable: true,
      header: "Sexo",
      field: "Sexo",
      style: { minWidth: "10rem" },
      body: (rowData) => (
        <Tag
          value={rowData?.Sexo}
          severity={rowData?.Sexo.toLowerCase() === 'macho' ? 'info' : 'danger'}
        />
      )
    },
    {
      filter: true,
      sortable: true,
      header: "Fecha Nacimiento",
      field: "FechaNacimiento",
      style: { minWidth: "12rem" },
      body: (rowData) =>
        rowData?.FechaNacimiento
          ? dayjs(rowData.FechaNacimiento).format("DD/MM/YYYY")
          : "Desconocida"
    },
    {
      filter: true,
      sortable: true,
      header: "Zona",
      field: "NombreZona",
      style: { minWidth: "15rem" }
    }
  ], []);

  const handleTabChange = (e: TabViewTabChangeEvent) => {
    setActiveIndex(e.index);
  };

  return (
    <div className="">
      {/* Información del Animal */}
      <Card
        title={`Detalles de ${animal.Alias}`}
        className="shadow-5"
      >
        {/* Podrías usar las columnas definidas para renderizar la información */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column.field as string} className="space-y-4">
              <div>
                <strong className="block text-sm text-600">{column.header}</strong>
                {column.body ? (
                  column.body(animal)
                ) : (
                  <span className="text-lg">
                    {animal[column.field]?.toString() || 'N/A'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Observaciones */}
        {animal.Observaciones && (
          <div className="mt-4 border-t border-gray-200 pt-2">
            <strong className="block text-sm text-600 mb-1">Observaciones</strong>
            <p className="text-base text-gray-700 m-0">{animal.Observaciones}</p>
          </div>
        )}
      </Card>

      {/* Resto del componente permanece igual */}
      <Card className="shadow-4 mt-1">
        <TabView
          activeIndex={activeIndex}
          onTabChange={handleTabChange}
          renderActiveOnly={true}
          panelContainerClassName="p-3"
        >
          <TabPanel header="Dietas" leftIcon="pi pi-apple mr-2">
            <DietasList  />
          </TabPanel>

          <TabPanel header="Tratamientos" leftIcon="pi pi-heart mr-2">
            <TratamientosList />
          </TabPanel>

          <TabPanel header="Zona" leftIcon="pi pi-map-marker mr-2">
          </TabPanel>
        </TabView>
      </Card>
    </div>
  );
};

export default AnimalDetail;