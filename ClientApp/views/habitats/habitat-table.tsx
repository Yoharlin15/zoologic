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
import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { CardTable, ICardTableProps } from "../../components/card-table";
import { Reducers } from "#core";
import HabitatSidebarForm from "./habitat-sidebar-form";

interface IHabitatTableProps {
  dispatch: React.Dispatch<any>;
}

const HabitatTable = ({ dispatch }: IHabitatTableProps) => {
  const Habitat = AppQueryHooks.useFetchHabitats();
  const [selectedHabitat, setSelectedHabitat] = useState<IHabitat>();
  const cm = useRef<ContextMenu>(null);

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedHabitatId, setSelectedHabitatId] = useState<number | null>(null);

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedHabitat) {
          setSelectedHabitatId(selectedHabitat.HabitatId);
          setSidebarVisible(true); // Abre el sidebar
        }
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

      {
        filter: true,
        sortable: true,
        header: "Descipcion",
        field: "Descripcion",
        style: { minWidth: "10rem" },
      }
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
              setSidebarVisible(true);
            }}
            className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
            label="Nuevo habitat"
          />
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
      <HabitatSidebarForm
        id={selectedHabitatId ?? undefined} // importante para edición
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        especieId={undefined}
      />
    </div>
  );
};

export default HabitatTable;