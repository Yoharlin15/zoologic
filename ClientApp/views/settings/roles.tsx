import React from "react";
import { debounce } from "radash";
import { IRoles } from "#interfaces";
import toast from "react-hot-toast";
import { matchesSearchText } from "#utils";
import { Button } from "primereact/button";
import { Reducers } from "#core";
import { ContextMenu } from "primereact/contextmenu";
import { AppQueryHooks, AppMutationHooks } from "#hooks";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Badge } from "primereact/badge";
import { Skeleton } from "primereact/skeleton";
import { confirmDialog } from "primereact/confirmdialog";

import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";
import {
  CardTable,
  EmptyMessage,
  RoleFormDialog,
  ICardTableProps,
} from "#components";

const Roles = () => {
  // Fetch roles data using the appropriate query hook
  const roles = AppQueryHooks.useFetchRoles();

  const [state, dispatch] = React.useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });
  const [selectedRole, setSelectedRole] = React.useState<IRoles>();
  const cm = React.useRef<ContextMenu>(null);
  const [searchText, setSearchText] = React.useState("");

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () =>
        dispatch({
          type: "OPEN_DIALOG",
          payload: selectedRole?.RolId ?? 0,
        }),
    },
    {
      label: "Eliminar",
      icon: "pi pi-trash",
      command: () => handleDeleteRole(),
    },
  ];

  const handleDeleteRole = () => {
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el rol "${selectedRole?.Nombre}"?`,
      header: "Confirmar Eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      accept: () => {
        // Aquí iría la lógica para eliminar el rol
        toast.success(`Rol "${selectedRole?.Nombre}" eliminado correctamente`);
      },
    });
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleOpenDialog = (id: number = 0) => {
    dispatch({
      type: "OPEN_DIALOG",
      payload: id,
    });
  };

  const handleCloseDialog = () => {
    dispatch({ type: "CLOSE_DIALOG" });
  };

  const columns = React.useMemo<ICardTableProps<IRoles>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Nombre del Rol",
        field: "Nombre",
        body: (rowData: IRoles) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-user text-primary"></i>
            <span className="font-medium">{rowData.Nombre}</span>
          </div>
        ),
      },
      {
        header: "Acciones",
        body: (rowData: IRoles) => (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              size="small"
              severity="info"
              tooltip="Editar rol"
              tooltipOptions={{ position: "top" }}
              onClick={() => handleOpenDialog(rowData.RolId)}
            />
            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              tooltip="Eliminar rol"
              tooltipOptions={{ position: "top" }}
              onClick={() => {
                setSelectedRole(rowData);
                handleDeleteRole();
              }}
            />
          </div>
        ),
      },
    ],
    [],
  );

  const filteredRoles = React.useMemo(() => {
    if (!roles.data?.length) return [];

    return roles.data?.filter((item: IRoles) => {
      const fields = [item.Nombre];
      return fields.some((field) => matchesSearchText(searchText, field));
    });
  }, [searchText, roles.data]);

  const renderEmptyMessage = React.useCallback(() => {
    return (
      <div className="text-center p-6">
        <i className="pi pi-users text-6xl text-400 mb-3"></i>
        <div className="text-900 font-bold text-xl mb-2">No hay roles disponibles</div>
        <div className="text-600 mb-4">
          Comienza creando tu primer rol del sistema
        </div>
        <Button
          label="Crear Nuevo Rol"
          icon="pi pi-plus"
          onClick={() => handleOpenDialog(0)}
        />
      </div>
    );
  }, []);

  const startContent = (
    <div className="flex align-items-center gap-3">
      <i className="pi pi-users text-2xl text-primary"></i>
      <div>
        <h1 className="text-2xl font-bold text-900 m-0">Gestión de Roles</h1>
        <p className="text-600 m-0 mt-1">
          Administra los roles del sistema
        </p>
      </div>
    </div>
  );

  const endContent = (
    <div className="flex gap-2">
      <span className="p-input-icon-left">
      </span>
      <Button
        label="Nuevo Rol"
        icon="pi pi-plus"
        onClick={() => handleOpenDialog(0)}
        className="p-button-primary"
      />
    </div>
  );

  if (roles.isPending) {
    return (
      <div className="w-full">
        <Card className="mb-2 bg-blue-50">
          <Toolbar start={startContent} />
        </Card>
        <Card className="bg-blue-50">
          <div className="p-4">
            <Skeleton height="3rem" className="mb-3" />
            <div className="grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="col-12 md:col-6 lg:col-4">
                  <Skeleton height="8rem" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ContextMenu
        ref={cm}
        model={menuModel}
        onHide={() => setSelectedRole(undefined)}
      />

      {/* Header */}
      <Card className="mb-2 bg-blue-50">
        <Toolbar
          start={startContent}
          end={endContent}
          className="border-none p-0"
        />
      </Card>

      {/* Main Data Table */}
      <Card className="bg-blue-50">
        <CardTable<IRoles>
          title=""
          columns={columns}
          value={filteredRoles}
          skeletonLoading={roles.isPending}
          tableProps={{
            rows: 10,
            size: "small",
            scrollable: true,
            dataKey: "RolId",
            removableSort: true,
            paginatorLeft: true,
            scrollHeight: "500px",
            loading: roles.isFetching,
            emptyMessage: renderEmptyMessage(),
            contextMenuSelection: selectedRole,
            rowsPerPageOptions: [10, 25, 50],
            paginator: filteredRoles.length > 10,
            className: "p-datatable-striped",
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<IRoles[]>,
            ) => setSelectedRole(e.value),
            onRowDoubleClick: (e) => handleOpenDialog(e.data.RolId),
          }}
        />
      </Card>

      <RoleFormDialog
        id={state.id}
        visible={state.visible ?? false}
        onHide={handleCloseDialog}
      />
    </div>
  );
};

export default Roles;