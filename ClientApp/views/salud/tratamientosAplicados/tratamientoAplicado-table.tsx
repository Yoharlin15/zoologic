import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { debounce } from "radash";
import { IEmpleado, ITratamientoAplicado } from "#interfaces";
import { AppQueryHooks } from "#hooks";
import { Button } from "primereact/button";
import { ContextMenu } from "primereact/contextmenu";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";
import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { CardTable, ICardTableProps } from "../../../components/card-table";
import dayjs from "dayjs";
import { Reducers } from "#core";
import TratamientoAplicadoSidebarCreate from "./tratamientoAplicado-sidebar-create";

interface ITratamientoAplicadoTableProps {
  dispatch: React.Dispatch<any>;
}

const TratamientoAplicadoTable = ({ dispatch }: ITratamientoAplicadoTableProps) => {
  const tratamientoAplicado = AppQueryHooks.useFetchTratamientosAplicados();
  const [selectedTratamientoAplicado, setSelectedTratamientoAplicado] = useState<ITratamientoAplicado>();

  const navigate = useNavigate();

  const cm = useRef<ContextMenu>(null);
  const menu = useRef<Menu>(null);

  const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
  const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
  const [selectedTratamientoAplicadoId, setSelectedEmpleadoId] = useState<number | null>(null);

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedTratamientoAplicado) {
          setSelectedEmpleadoId(selectedTratamientoAplicado.TratamientoAplicadoId);
          setSidebarUpdateVisible(true); // Abre el sidebar
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

  const columns = useMemo<ICardTableProps<ITratamientoAplicado>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Tratamiento",
        field: "NombreTratamiento",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Animal (Alias)",
        field: "Alias",
        style: { minWidth: "12rem" },
      },

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
        header: "Fecha de Entrada",
        field: "FechaEntrada",
        style: { minWidth: "12em" },
      },

      {
        filter: true,
        sortable: true,
        header: "Fecha de Salida",
        field: "FechaSalida",
        style: { minWidth: "12em" },
      },

      {
        filter: true,
        sortable: true,
        header: "Atendido por",
        field: "NombreUsuario",
        style: { minWidth: "10fem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Razon",
        field: "Razon",
        style: { minWidth: "10fem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Procedencia",
        field: "NombreUsuario",
        style: { minWidth: "10fem" },
      },

    ],
    []
  );

  const filteredTratamientosAplicados = useMemo(() => {
    if (!Array.isArray(tratamientoAplicado.data)) return [];
    return tratamientoAplicado.data.filter((t) =>
      t.Alias?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [tratamientoAplicado.data, searchText]);

  return (
    <div className="h-full">
      <ContextMenu
        ref={cm}
        model={menuModel}
        onHide={() => setSelectedTratamientoAplicado(undefined)}
      />
      <CardTable<ITratamientoAplicado>
        title="Record de tratamientos aplicados"
        columns={columns}
        value={filteredTratamientosAplicados}
        skeletonLoading={tratamientoAplicado.isPending}
        onChangeSearch={debounce({ delay: 500 }, (e) =>
          setSearchText(e.target.value)
        )}
        renderHeadActions={[
          <Button
            key="btn_add"
            onClick={() => {
              setSelectedEmpleadoId(null);
              setSidebarCreateVisible(true);
            }}
            className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
            label="Aplicar Tratamiento"
          />

        ]}
        tableProps={{
          rows: 8,
          size: "small",
          filters,
          dataKey: "TratamientoAplicadoId",
          loading: tratamientoAplicado.isFetching,
          paginator: filteredTratamientosAplicados.length > 8,
          contextMenuSelection: selectedTratamientoAplicado,
          onContextMenu: (e) => cm.current?.show(e.originalEvent),
          onContextMenuSelectionChange: (
            e: DataTableSelectionSingleChangeEvent<ITratamientoAplicado[]>
          ) => setSelectedTratamientoAplicado(e.value),
        }}
      />
      <TratamientoAplicadoSidebarCreate
        visible={sidebarCreateVisible}
        onHide={() => setSidebarCreateVisible(false)}
        especieId={selectedTratamientoAplicadoId ?? undefined}
      />
    </div>
  );
};

export default TratamientoAplicadoTable;