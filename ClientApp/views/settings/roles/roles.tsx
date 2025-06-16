import React from "react";
import { IRoles } from "#interfaces";
import toast from "react-hot-toast";
import { matchesSearchText } from "#utils";
import { Button } from "primereact/button";
import { Reducers } from "#core";
import { ContextMenu } from "primereact/contextmenu";
import { AppQueryHooks } from "#hooks";
import { Card } from "primereact/card";
import { Toolbar } from "primereact/toolbar";
import { Skeleton } from "primereact/skeleton";
import { confirmDialog } from "primereact/confirmdialog";

import {
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";
import {
  CardTable,
  ICardTableProps,
} from "#components";
import { RolesFormDialog } from "./rolesFormDialog";

const Roles = () => {
  const roles = AppQueryHooks.useFetchRoles();

  const [state, dispatch] = React.useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });

  const [selectedRol, setSelectedRol] = React.useState<IRoles>();
  const cm = React.useRef<ContextMenu>(null);
  const [searchText, setSearchText] = React.useState("");

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () =>
        dispatch({
          type: "OPEN_DIALOG",
          payload: selectedRol?.RolId ?? 0,
        }),
    },
    {
      label: "Eliminar",
      icon: "pi pi-trash",
      command: () => handleDeleteRol(),
    },
  ];

  const handleDeleteRol = () => {
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el estado "${selectedRol?.Nombre}"?`,
      header: "Confirmar Eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      accept: () => {
        // Aquí iría la lógica para eliminar el estado
        toast.success(`Estado "${selectedRol?.Nombre}" eliminado correctamente`);
      },
    });
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleOpenDialog = (id: number = 0) => {
    dispatch({ type: "OPEN_DIALOG", payload: id });
  };

  const handleCloseDialog = () => {
    dispatch({ type: "CLOSE_DIALOG" });
  };

  const columns = React.useMemo<ICardTableProps<IRoles>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Nombre del Estado",
        field: "Nombre",
        body: (rowData: IRoles) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-flag text-primary"></i>
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
              onClick={() => {
                setSelectedRol(rowData); // ✅ Esto es lo que faltaba
                handleOpenDialog(rowData.RolId);
              }}
            />

            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              tooltip="Eliminar rol"
              tooltipOptions={{ position: "top" }}
              onClick={() => {
                setSelectedRol(rowData);
                handleDeleteRol();
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

    return roles.data.filter((item) =>
      matchesSearchText(searchText, item.Nombre),
    );
  }, [searchText, roles.data]);

  const renderEmptyMessage = React.useCallback(() => {
    return (
      <div className="text-center p-6">
        <i className="pi pi-flag text-6xl text-400 mb-3"></i>
        <div className="text-900 font-bold text-xl mb-2">No hay roles registrados</div>
        <div className="text-600 mb-4">Comienza creando tu primer rol</div>
        <Button
          label="Crear Nuevo rol"
          icon="pi pi-plus"
          onClick={() => handleOpenDialog(0)}
        />
      </div>
    );
  }, []);

  const startContent = (
    <div className="flex align-items-center gap-3">
      <i className="pi pi-flag text-2xl text-primary"></i>
      <div>
        <h1 className="text-2xl font-bold text-900 m-0">Gestión de Roles</h1>
        <p className="text-600 m-0 mt-1">Administra los roles disponibles</p>
      </div>
    </div>
  );

  const endContent = (
    <div className="flex gap-2">
      <Button
        label="Nuevo rol"
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
        onHide={() => setSelectedRol(undefined)}
      />

      <Card className="mb-2 bg-blue-50">
        <Toolbar start={startContent} end={endContent} className="border-none p-0" />
      </Card>

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
            contextMenuSelection: selectedRol,
            rowsPerPageOptions: [10, 25, 50],
            paginator: filteredRoles.length > 10,
            className: "p-datatable-striped",
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<IRoles[]>,
            ) => setSelectedRol(e.value),
            onRowDoubleClick: (e) => handleOpenDialog(e.data.EstadoId),
          }}
        />
      </Card>

      <RolesFormDialog
        id={state.id}
        visible={state.visible ?? false}
        onHide={handleCloseDialog}
      />
    </div>
  );
};

export default Roles;
