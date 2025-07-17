import React, {
  useState,
  useRef,
  useMemo,
  useReducer,
  useCallback,
} from "react";
import { debounce } from "radash";
import { IUsuario } from "#interfaces";
import { AppQueryHooks } from "#hooks";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Skeleton } from "primereact/skeleton";
import { Routes, Reducers } from "#core";
import { ContextMenu } from "primereact/contextmenu";
import { useNavigate, generatePath } from "react-router-dom";
import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { ColumnFilterElementTemplateOptions } from "primereact/column";
import { constants } from "buffer";
import { CardTable, ICardTableProps } from "../../components/card-table";
import { fileURLToPath } from "url";
import UsuarioSidebarCreate from "./usuario-sidebar-create";

interface IUsuarioTableProps {
  dispatch: React.Dispatch<any>;
}

const UsuarioTable = ({ dispatch }: IUsuarioTableProps) => {
  const usuario = AppQueryHooks.useFetchUsuarios();
  const [selectedUsuario, setSelectedUsuario] = useState<IUsuario>();

  const navigate = useNavigate();

  const cm = useRef<ContextMenu>(null);

  const [sidebarCreateVisible, setSidebarCreateVisible] = useState(false);
  const [sidebarUpdateVisible, setSidebarUpdateVisible] = useState(false);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState<number | null>(null);

  const menuModel = [
    {

    },
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedUsuario) {
          setSelectedUsuarioId(selectedUsuario.UsuarioId);
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

  const columns = useMemo<ICardTableProps<IUsuario>["columns"]>(
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
        header: "Correo electronico",
        field: "Email",
        style: { minWidth: "16rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Rol",
        field: "Nombre",
        style: { minWidth: "10rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Empleado/a",
        field: "Nombres",
        style: { minWidth: "10rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "¿Cuenta verificada?",
        field: "Verificado",
        style: { minWidth: "10rem" },
        body: (rowData: IUsuario | null) => (rowData?.Verificado ? "Sí" : "No"),
      }
    ],
    []
  );

  const filteredUsuarios = useMemo(() => {
    if (!Array.isArray(usuario.data)) return [];
    return usuario.data.filter((t) =>
      t.NombreUsuario?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [usuario.data, searchText]);

  return (
    <div className="h-full p-4">
      <ContextMenu
        ref={cm}
        model={menuModel}
        onHide={() => setSelectedUsuario(undefined)}
      />
      <CardTable<IUsuario>
        title="Lista de usuarios registrados en el sistema"
        columns={columns}
        value={filteredUsuarios}
        skeletonLoading={usuario.isPending}
        onChangeSearch={debounce({ delay: 500 }, (e) =>
          setSearchText(e.target.value)
        )}
        renderHeadActions={[
          <Button
            key="btn_add"
            onClick={() => {
              setSelectedUsuarioId(null);
              setSidebarCreateVisible(true);
            }}
            className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
            label="Nuevo usuario"
          />
        ]}
        tableProps={{
          rows: 8,
          size: "small",
          filters,
          dataKey: "UsuarioId",
          loading: usuario.isFetching,
          paginator: filteredUsuarios.length > 8,
          contextMenuSelection: selectedUsuario,
          onContextMenu: (e) => cm.current?.show(e.originalEvent),
          onContextMenuSelectionChange: (
            e: DataTableSelectionSingleChangeEvent<IUsuario[]>
          ) => setSelectedUsuario(e.value),
        }}
      />
      <UsuarioSidebarCreate
        visible={sidebarCreateVisible}
        onHide={() => setSidebarCreateVisible(false)}
        usuarioId={selectedUsuarioId ?? undefined}
        onCreateSuccess={() => usuario.refetch()}
      />
    </div>
  );
};

export default UsuarioTable;