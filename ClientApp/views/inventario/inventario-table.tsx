import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
} from "react";
import { debounce } from "radash";
import { IInventario } from "#interfaces";
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

// import InventarioSidebarCreate from "./Inventario-sidebar-create";
import { Reducers } from "#core";

interface IInventarioTableProps {
  dispatch: React.Dispatch<any>;
}

const InventarioTable = ({ dispatch }: IInventarioTableProps) => {
  const Inventario = AppQueryHooks.useFetchInventario();
  const [selectedInventario, setSelectedInventario] = useState<IInventario>();

  const navigate = useNavigate();

  const cm = useRef<ContextMenu>(null);
  const menu = useRef<Menu>(null);

  const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
  const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
  const [selectedInventarioId, setSelectedInventarioId] = useState<number | null>(null);

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedInventario) {
          setSelectedInventarioId(selectedInventario.InventarioId);
          setSidebarUpdateVisible(true); // Abre el sidebar
        }
      },
    },
    {
      label: "Detalles",
      icon: "pi pi-objects-column",
      command: () => {
        if (selectedInventario) {
          navigate(`/Inventarioes/${selectedInventario.InventarioId}`);
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

  const columns = useMemo<ICardTableProps<IInventario>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Alimento",
        field: "Nombre",
        style: { minWidth: "12rem" },
      },

      {
        filter: true,
        sortable: true,
        header: "Cantidad",
        field: "Cantidad",
        style: { minWidth: "12rem" },
      },
    ],
    []
  );

  const filteredInventarioes = useMemo(() => {
    if (!Array.isArray(Inventario.data)) return [];
    return Inventario.data.filter((t) =>
      t.Nombre?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [Inventario.data, searchText]);

  return (
    <div className="h-full">
      <ContextMenu
        ref={cm}
        model={menuModel}
        onHide={() => setSelectedInventario(undefined)}
      />
      <Menu model={optionsMenuModel} popup ref={menu} />
      <CardTable<IInventario>
        title="Inventario de Alimentos"
        columns={columns}
        value={filteredInventarioes}
        skeletonLoading={Inventario.isPending}
        onChangeSearch={debounce({ delay: 500 }, (e) =>
          setSearchText(e.target.value)
        )}
        renderHeadActions={[
          <Button
            key="btn_add"
            onClick={() => {
              setSelectedInventarioId(null);
              setSidebarCreateVisible(true);
            }}
          >
            <i className="pi pi-plus mr-2"></i>
            <span className="hidden md:flex">Nuevo Inventario</span>
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
          dataKey: "InventarioId",
          loading: Inventario.isFetching,
          paginator: filteredInventarioes.length > 8,
          contextMenuSelection: selectedInventario,
          onContextMenu: (e) => cm.current?.show(e.originalEvent),
          onContextMenuSelectionChange: (
            e: DataTableSelectionSingleChangeEvent<IInventario[]>
          ) => setSelectedInventario(e.value),
        }}
      />
      {/* <InventarioSidebarCreate
        visible={sidebarCreateVisible}
        onHide={() => setSidebarCreateVisible(false)}
        especieId={selectedInventarioId ?? undefined}
      /> */}
    </div>
  );
};

export default InventarioTable;