import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { debounce } from "radash";
import { ITratamientoAplicado } from "#interfaces";
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
import { SplitButton } from "primereact/splitbutton";

interface ITratamientoAplicadoTableProps {
  dispatch: React.Dispatch<any>;
}

const TratamientoAplicadoTable = ({ dispatch }: ITratamientoAplicadoTableProps) => {
  const navigate = useNavigate();
  const tratamientoAplicado = AppQueryHooks.useFetchTratamientosAplicados();
  const [selectedTratamientoAplicado, setSelectedTratamientoAplicado] = useState<ITratamientoAplicado>();
  const cm = useRef<ContextMenu>(null);

  const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
  const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
  const [selectedTratamientoAplicadoId, setSelectedTratamientoAplicadoId] = useState<number | null>(null);

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedTratamientoAplicado) {
          setSelectedTratamientoAplicadoId(selectedTratamientoAplicado.TratamientoAplicadoId);
          setSidebarUpdateVisible(true); // Abre el sidebar
        }
      },
    },
    {
      label: "Detalles",
      icon: "pi pi-objects-column",
      command: () => {
        if (selectedTratamientoAplicado) {
          navigate(`/tratamientos/${selectedTratamientoAplicado.AnimalId}`);
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
        header: "Animal(codigo)",
        field: "IdentificadorUnico",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Habitat",
        field: "Nombre",
        style: { minWidth: "10rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Entrada",
        field: "FechaEntrada",
        style: { minWidth: "12rem" },
        body: (rowData: ITratamientoAplicado | null) => {
          if (!rowData?.FechaEntrada) return "";
          return dayjs(rowData.FechaEntrada).format("DD/MM/YYYY");
        },
      },

      {
        filter: true,
        sortable: true,
        header: "Salida",
        field: "FechaSalida",
        style: { minWidth: "12rem" },
        body: (rowData: ITratamientoAplicado | null) => {
          if (!rowData?.FechaSalida) return "";
          return dayjs(rowData.FechaSalida).format("DD/MM/YYYY");
        },
      },

      {
        filter: true,
        sortable: true,
        header: "Atendido por",
        field: "NombreUsuario",
        style: { minWidth: "12rem" },
      },
    ],
    []
  );

  const filteredTratamientosAplicados = useMemo(() => {
    if (!Array.isArray(tratamientoAplicado.data)) return [];
    return tratamientoAplicado.data.filter((t) =>
      t.IdentificadorUnico?.toLowerCase().includes(searchText.toLowerCase())
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
          <SplitButton
            key="btn_add_split"
            label="Aplicar tratamiento"
            severity="success"
            className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
            color="primary"
            onClick={() => {
              setSelectedTratamientoAplicadoId(null);
              setSidebarCreateVisible(true);
            }}
            model={[
              {
                label: "Ir a vista salud",
                icon: "pi pi-directions",
                command: () => navigate("/menu"),
              },
            ]}
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