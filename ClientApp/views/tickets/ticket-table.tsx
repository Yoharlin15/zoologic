import React, { useState, useRef, useMemo, useReducer } from "react";
import { debounce } from "radash";
import { AppQueryHooks } from "#hooks";
import { Reducers } from "#core";
import { ContextMenu } from "primereact/contextmenu";
import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";
import { CardTable, ICardTableProps } from "../../components/card-table";
import { ICompra } from "ClientApp/interfaces/venta";
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext";

interface ITicketTableProps {
  dispatch: React.Dispatch<any>;
}

const TicketTable = ({ dispatch }: ITicketTableProps) => {
  const { rolId, usuarioId } = useAuth();
  const isAdmin = rolId === 1;

  // Llamamos AMBOS hooks; habilitamos solo el que aplique
  const comprasAll = AppQueryHooks.useFetchCompras({
    enabled: isAdmin,
  });

  const comprasUser = AppQueryHooks.useFetchCompraByUsuarioId(usuarioId ?? undefined, {
    enabled: !isAdmin && !!usuarioId,
  });

  // Fuente activa en función del rol
  const data = (isAdmin ? comprasAll.data : comprasUser.data) ?? [];
  const isPending = isAdmin ? comprasAll.isPending : comprasUser.isPending;
  const isFetching = isAdmin ? comprasAll.isFetching : comprasUser.isFetching;

  const [selectedTicket, setSelectedTicket] = useState<ICompra>();
  const cm = useRef<ContextMenu>(null);

  const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
  const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedTicket) {
          setSidebarUpdateVisible(true);
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

  const columns = useMemo<ICardTableProps<ICompra>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Nombre de usuario",
        field: "NombreUsuario",
        style: { minWidth: "10rem" },
        //body: (row: ICompra) => (isAdmin ? row.NombreUsuario : "Tú"),
      },
      {
        filter: true,
        sortable: true,
        header: "Fecha de compra",
        field: "FechaCompra",
        style: { minWidth: "16rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Monto total",
        field: "TotalCompra",
        style: { minWidth: "10rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Estado de pago",
        field: "NombreEstado",
        style: { minWidth: "10rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Fecha de visita",
        field: "FechaVisita",
        style: { minWidth: "10rem" },
      },
    ],
    [isAdmin]
  );

  const filteredTickets = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const q = searchText.toLowerCase();
    return data.filter((t) =>
      (t.NombreUsuario ?? "").toLowerCase().includes(q) ||
      String(t.TotalCompra ?? "").toLowerCase().includes(q) ||
      (t.NombreEstado ?? "").toLowerCase().includes(q)
    );
  }, [data, searchText]);

  return (
    <div className="h-full p-4">
      <ContextMenu ref={cm} model={menuModel} onHide={() => setSelectedTicket(undefined)} />
      <CardTable<ICompra>
        title={isAdmin ? "Todas las compras" : "Mis boletos"}
        columns={columns}
        value={filteredTickets}
        skeletonLoading={isPending}
        onChangeSearch={debounce({ delay: 500 }, (e) => setSearchText(e.target.value))}
        tableProps={{
          rows: 8,
          size: "small",
          filters,
          dataKey: "CompraId",
          loading: isFetching,
          paginator: filteredTickets.length > 8,
          contextMenuSelection: selectedTicket,
          onContextMenu: (e) => cm.current?.show(e.originalEvent),
          onContextMenuSelectionChange: (
            e: DataTableSelectionSingleChangeEvent<ICompra[]>
          ) => setSelectedTicket(e.value),
        }}
      />
    </div>
  );
};

export default TicketTable;
