import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { debounce } from "radash";
import { IUsuario } from "#interfaces";
import { AppQueryHooks } from "#hooks";
import { Button } from "primereact/button";
import { Reducers } from "#core";
import { ContextMenu } from "primereact/contextmenu";
import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { CardTable, ICardTableProps } from "../../components/card-table";
import { ICompra } from "ClientApp/interfaces/venta";

interface ITicketTableProps {
  dispatch: React.Dispatch<any>;
}

const TicketTable = ({ dispatch }: ITicketTableProps) => {
  const ticket = AppQueryHooks.useFetchCompras();
  const [selectedTicket, setSelectedTicket] = useState<ICompra>();

  const cm = useRef<ContextMenu>(null);

  const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
  const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState<number | null>(null);

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedTicket) {
          setSelectedUsuarioId(selectedTicket.UsuarioId);
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
  const [filters, setFilters] = useState<DataTableFilterMeta>(
  );

  const columns = useMemo<ICardTableProps<ICompra>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Nombre de usuario",
        field: "NombreUsuario",
        style: { minWidth: "10rem" },
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
        body: (rowData: ICompra) => `$ ${rowData.TotalCompra} pesos` 
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
    []
  );

  const filteredTickets = useMemo(() => {
    if (!Array.isArray(ticket.data)) return [];
    return ticket.data.filter((t) =>
      t.NombreUsuario?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [ticket.data, searchText]);

  return (
    <div className="h-full p-4">
      <ContextMenu
        ref={cm}
        model={menuModel}
        onHide={() => setSelectedTicket(undefined)}
      />
      <CardTable<ICompra>
        title="Boletos comprados"
        columns={columns}
        value={filteredTickets}
        skeletonLoading={ticket.isPending}
        onChangeSearch={debounce({ delay: 500 }, (e) =>
          setSearchText(e.target.value)
        )}
        tableProps={{
          rows: 8,
          size: "small",
          filters,
          dataKey: "CompraId",
          loading: ticket.isFetching,
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