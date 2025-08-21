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
import ComportamientoSidebarForm from "./comportamiento-sidebar-form";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

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

  const getConductaSeverity = (value?: string): "success" | "danger" | "warning" | "info" | "secondary" => {
    const v = (value ?? "").toLowerCase();
    if (v.includes("tranquil") || v.includes("amist")) return "success";
    if (v.includes("agres")) return "danger";
    if (v.includes("estres") || v.includes("alert")) return "warning";
    if (v.includes("entren")) return "info";
    return "secondary";
  };

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
        header: "Entrenamiento",
        field: "Entrenamiento",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Conducta",
        field: "Conducta",
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
        header: "Observaciones",
        field: "Observaciones",
        style: { minWidth: "12rem" },
      },

      {
        header: "Acciones",
        style: { minWidth: "8rem", textAlign: "left" },
        body: (row: IComportamiento) => (
          <Button
            icon="pi pi-ellipsis-v" // <-- horizontal en lugar de vertical
            className="p-button-rounded p-button-text p-button-plain text-gray-700 hover:text-gray-900"
            style={{ width: 28, height: 28, padding: 0, lineHeight: 1 }}
            onClick={(e) => {
              setSelectedComportamiento(row);
              cm.current?.show(e); // abre el ContextMenu ya existente
            }}
          />
        ),
      }
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
            label="+ Agregar"
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
      <ComportamientoSidebarForm
        id={selectedComportamientoId ?? undefined}
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        comportamientoId={undefined}
      />
    </div>
  );
};

export default ComportamientoTable;