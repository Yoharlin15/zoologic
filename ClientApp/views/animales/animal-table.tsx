import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { debounce } from "radash";
import { IAnimal } from "#interfaces";
import { AppQueryHooks } from "#hooks";
import { Button } from "primereact/button";
import { ContextMenu } from "primereact/contextmenu";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { CardTable, ICardTableProps } from "../../components/card-table";
import dayjs from "dayjs";

import AnimalSidebarCreate from "./animal-sidebar-create";
import { Reducers } from "#core";

interface IAnimalTableProps {
  dispatch: React.Dispatch<any>;
}

const AnimalTable = ({ dispatch }: IAnimalTableProps) => {
  const animal = AppQueryHooks.useFetchAnimales();
  const [selectedAnimal, setSelectedAnimal] = useState<IAnimal>();

  const navigate = useNavigate();

  const cm = useRef<ContextMenu>(null);
  const menu = useRef<Menu>(null);

  const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
  const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
  const [selectedAnimalId, setSelectedAnimalId] = useState<number | null>(null);

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedAnimal) {
          setSelectedAnimalId(selectedAnimal.AnimalId);
          setSidebarUpdateVisible(true); // Abre el sidebar
        }
      },
    },
    {
      label: "Detalles",
      icon: "pi pi-objects-column",
      command: () => {
        if (selectedAnimal) {
          navigate(`/animales/${selectedAnimal.AnimalId}`);
        }
      },
    }
  ];

  const optionsMenuModel = [
    {
      label: "Especies",
      icon: "pi pi-info-circle",
      command: () => {
        console.log("Opción 1 Especies");
      },
    },
    {
      label: "Opción 2",
      icon: "pi pi-cog",
      command: () => {
        console.log("Opción 2 seleccionada");
      },
    },
    {
      label: "Opción 3",
      icon: "pi pi-external-link",
      command: () => {
        console.log("Opción 3 seleccionada");
      },
    },
  ];

  const [confirmState, confirmDispatch] = useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<DataTableFilterMeta>({});

  const columns = useMemo<ICardTableProps<IAnimal>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Alias",
        field: "Alias",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Especie",
        field: "NombreCientifico",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Sexo",
        field: "Sexo",
        style: { minWidth: "10rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Fecha de Llegada",
        field: "FechaNacimiento",
        style: { minWidth: "12rem" },
        body: (rowData: IAnimal | null) => {
          if (!rowData?.FechaNacimiento) return "";
          return dayjs(rowData.FechaNacimiento).format("DD/MM/YYYY");
        },
      },

      {
        filter: true,
        sortable: true,
        header: "Zona",
        field: "NombreZona",
        style: { minWidth: "15em" },
      },
    ],
    []
  );

  const filteredAnimales = useMemo(() => {
    if (!Array.isArray(animal.data)) return [];
    return animal.data.filter((t) =>
      t.Sexo?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [animal.data, searchText]);

  return (
    <div className="h-full">
      <ContextMenu
        ref={cm}
        model={menuModel}
        onHide={() => setSelectedAnimal(undefined)}
      />
      <Menu model={optionsMenuModel} popup ref={menu} />
      <CardTable<IAnimal>
        title="Lista de Animales"
        columns={columns}
        value={filteredAnimales}
        skeletonLoading={animal.isPending}
        onChangeSearch={debounce({ delay: 500 }, (e) =>
          setSearchText(e.target.value)
        )}
        renderHeadActions={[
          <Button
            key="btn_add"
            onClick={() => {
              setSelectedAnimalId(null);
              setSidebarCreateVisible(true);
            }}
            className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
            label="Nuevo Animal"
          />
          
        ]}
        tableProps={{
          rows: 8,
          size: "small",
          filters,
          dataKey: "AnimalId",
          loading: animal.isFetching,
          paginator: filteredAnimales.length > 8,
          contextMenuSelection: selectedAnimal,
          onContextMenu: (e) => cm.current?.show(e.originalEvent),
          onContextMenuSelectionChange: (
            e: DataTableSelectionSingleChangeEvent<IAnimal[]>
          ) => setSelectedAnimal(e.value),
        }}
      />
      <AnimalSidebarCreate
        visible={sidebarCreateVisible}
        onHide={() => setSidebarCreateVisible(false)}
        especieId={selectedAnimalId ?? undefined}
      />
    </div>
  );
};

export default AnimalTable;