import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { debounce } from "radash";
import { IComportamiento } from "#interfaces";
import { AppQueryHooks } from "#hooks";
import { ContextMenu } from "primereact/contextmenu";
import { useNavigate } from "react-router-dom";
import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { CardTable, ICardTableProps } from "../../components/card-table";
import dayjs from "dayjs";
import { Reducers } from "#core";
import { SplitButton } from "primereact/splitbutton";
import ComportamientoSidebarCreate from "./comportamiento-sidebar-form";

interface IComportamientoTableProps {
  dispatch: React.Dispatch<any>;
}

const ComportamientoTable = ({ dispatch }: IComportamientoTableProps) => {
  const navigate = useNavigate();
  const comportamiento = AppQueryHooks.useFetchComportamientos();
  const [selectedComportamiento, setSelectedComportamiento] = useState<IComportamiento>();
  const cm = useRef<ContextMenu>(null);

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedComportamientoId, setSelectedComportamientoId] = useState<number | null>(null);

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedComportamiento) {
          setSelectedComportamientoId(selectedComportamiento.ComportamientoId);
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

  const columns = useMemo<ICardTableProps<IComportamiento>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Animal(Codigo)",
        field: "IdentificadorUnico",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Creado por",
        field: "NombreUsuario",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Fecha de creacion",
        field: "FechaCreacion",
        style: { minWidth: "12rem" },
        body: (rowData: IComportamiento | null) => {
          if (!rowData?.FechaCreacion) return "";
          return dayjs(rowData.FechaCreacion).format("DD/MM/YYYY");
        },
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
        header: "Entrenamiento",
        field: "Entrenamiento",
        style: { minWidth: "10rem" },
      },
    ],
    []
  );

  const filteredComportamientos = useMemo(() => {
    if (!Array.isArray(comportamiento.data)) return [];
    return comportamiento.data.filter((t) =>
      t.IdentificadorUnico?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [comportamiento.data, searchText]);

  return (
    <div className="h-full">
      <ContextMenu
        ref={cm}
        model={menuModel}
        onHide={() => setSelectedComportamiento(undefined)}
      />
      <CardTable<IComportamiento>
        title="Comportamientos"
        columns={columns}
        value={filteredComportamientos}
        skeletonLoading={comportamiento.isPending}
        onChangeSearch={debounce({ delay: 500 }, (e) =>
          setSearchText(e.target.value)
        )}
        renderHeadActions={[
          <SplitButton
            key="btn_add_split"
            label="registrar comportamiento"
            severity="success"
            className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
            color="primary"
            onClick={() => {
              setSelectedComportamientoId(null);
              setSidebarVisible(true);
            }}
            model={[
              {
                label: "Ir a vista comportamiento",
                icon: "pi pi-directions",
                command: () => navigate("/detalle"),
              },
            ]}
          />

        ]}
        tableProps={{
          rows: 8,
          size: "small",
          filters,
          dataKey: "ComportamientoId",
          loading: comportamiento.isFetching,
          paginator: filteredComportamientos.length > 8,
          contextMenuSelection: selectedComportamiento,
          onContextMenu: (e) => cm.current?.show(e.originalEvent),
          onContextMenuSelectionChange: (
            e: DataTableSelectionSingleChangeEvent<IComportamiento[]>
          ) => setSelectedComportamiento(e.value),
        }}
      />
      <ComportamientoSidebarCreate
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        comportamientoId={selectedComportamientoId ?? undefined}
      />
    </div>
  );
};

export default ComportamientoTable;