import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { debounce } from "radash";
import { IHabitat } from "#interfaces";
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

// import HabitatSidebarCreate from "./Habitat-sidebar-create";
import { Reducers } from "#core";

interface IHabitatTableProps {
  dispatch: React.Dispatch<any>;
}

const HabitatTable = ({ dispatch }: IHabitatTableProps) => {
  const Habitat = AppQueryHooks.useFetchHabitats();
  const [selectedHabitat, setSelectedHabitat] = useState<IHabitat>();

  const navigate = useNavigate();

  const cm = useRef<ContextMenu>(null);
  const menu = useRef<Menu>(null);

  const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
  const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
  const [selectedHabitatId, setSelectedHabitatId] = useState<number | null>(null);

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedHabitat) {
          setSelectedHabitatId(selectedHabitat.HabitatId);
          setSidebarUpdateVisible(true); // Abre el sidebar
        }
      },
    },
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

  const columns = useMemo<ICardTableProps<IHabitat>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Habitat",
        field: "Nombre",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Cantidad maxima de Animales",
        field: "CantidadAnimales",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Estado",
        field: "NombreEstado",
        style: { minWidth: "10rem" },
      },
    ],
    []
  );

  const filteredHabitates = useMemo(() => {
    if (!Array.isArray(Habitat.data)) return [];
    return Habitat.data.filter((t) =>
      t.Nombre?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [Habitat.data, searchText]);

  return (
    <div className="h-full">
      <ContextMenu
        ref={cm}
        model={menuModel}
        onHide={() => setSelectedHabitat(undefined)}
      />
      <Menu model={optionsMenuModel} popup ref={menu} />
      <CardTable<IHabitat>
        title="Lista de Habitats"
        columns={columns}
        value={filteredHabitates}
        skeletonLoading={Habitat.isPending}
        onChangeSearch={debounce({ delay: 500 }, (e) =>
          setSearchText(e.target.value)
        )}
        renderHeadActions={[
          <Button
            key="btn_add"
            onClick={() => {
              setSelectedHabitatId(null);
              setSidebarCreateVisible(true);
            }}
          >
            <i className="pi pi-plus mr-2"></i>
            <span className="hidden md:flex">Nuevo Habitat</span>
          </Button>,

          <Button
            key="btn_menu"
            icon="pi pi-bars"
            className="ml-2"
            onClick={(e) => menu.current?.toggle(e)}
            aria-controls="popup_menu"
            aria-haspopup
          />,
        ]}
        tableProps={{
          rows: 8,
          size: "small",
          filters,
          dataKey: "HabitatId",
          loading: Habitat.isFetching,
          paginator: filteredHabitates.length > 8,
          contextMenuSelection: selectedHabitat,
          onContextMenu: (e) => cm.current?.show(e.originalEvent),
          onContextMenuSelectionChange: (
            e: DataTableSelectionSingleChangeEvent<IHabitat[]>
          ) => setSelectedHabitat(e.value),
        }}
      />
      {/* <HabitatSidebarCreate
        visible={sidebarCreateVisible}
        onHide={() => setSidebarCreateVisible(false)}
        especieId={selectedHabitatId ?? undefined}
      /> */}
    </div>
  );
};

export default HabitatTable;