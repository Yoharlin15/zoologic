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
import { IPermiso } from "ClientApp/interfaces/permisos";
import { PermisosFormDialog } from "./permisosFormDialog";

const Permisos = () => {
  const permisos = AppQueryHooks.useFetchPermisos();

  const [state, dispatch] = React.useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });

  const [selectedPermiso, setSelectedPermiso] = React.useState<IPermiso>();
  const cm = React.useRef<ContextMenu>(null);
  const [searchText, setSearchText] = React.useState("");

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () =>
        dispatch({
          type: "OPEN_DIALOG",
          payload: selectedPermiso?.PermisoId ?? 0,
        }),
    },
    {
      label: "Eliminar",
      icon: "pi pi-trash",
      command: () => handleDeletePermiso(),
    },
  ];

  const handleDeletePermiso = () => {
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el permiso "${selectedPermiso?.Modulo}"?`,
      header: "Confirmar Eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      accept: () => {
        // Aquí iría la lógica para eliminar el permiso
        toast.success(`Permiso "${selectedPermiso?.Modulo}" eliminado correctamente`);
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

  const columns = React.useMemo<ICardTableProps<IPermiso>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Modulos",
        field: "Modulo",
        body: (rowData: IPermiso) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-user text-green-500"></i>
             <span className="font-medium">
            {Array.isArray(rowData.Modulo) ? rowData.Modulo.join(", ") : rowData.Modulo}
          </span>
          </div>
        ),
      },
      {
        filter: true,
        sortable: true,
        header: "Acciones",
        field: "Accion",
        body: (rowData: IPermiso) => (
           <span className="font-medium">
            {Array.isArray(rowData.Accion) ? rowData.Accion.join(", ") : rowData.Accion}
          </span>
        ),
      },
      {
        filter: true,
        sortable: true,
        header: "Descripción",
        field: "Descripcion",
        body: (rowData: IPermiso) => (
          <span className="text-600">{rowData.Descripcion}</span>
        ),
      },
    ],
    [],
  );

  const filteredPermisos = React.useMemo(() => {
    if (!permisos.data?.length) return [];

    return permisos.data.filter((item) =>
      matchesSearchText(searchText, item.Descripcion),
    );
  }, [searchText, permisos.data]);

  const renderEmptyMessage = React.useCallback(() => {
    return (
      <div className="text-center p-6">
        <i className="pi pi-flag text-6xl text-400 mb-3"></i>
        <div className="text-900 font-bold text-xl mb-2">No hay roles registrados</div>
        <div className="text-600 mb-4">Comienza creando tu primer rol</div>
        <Button
          label="Crear Nuevo permiso"
          icon="pi pi-plus"
          onClick={() => handleOpenDialog(0)}
        />
      </div>
    );
  }, []);

  const startContent = (
    <div className="flex align-items-center gap-3">
      <div>
        <h1 className="text-2xl font-bold text-900 m-0">Gestión de Permisos</h1>
        <p className="text-600 m-0 mt-1">Administra los permisos disponibles</p>
      </div>
    </div>
  );

  const endContent = (
    <div className="flex gap-2">
      <Button
        label="Nuevo permiso"
        icon="pi pi-plus"
        onClick={() => handleOpenDialog(0)}
        className="bg-green-400 hover:bg-green-600 border-0 shadow-none" />
    </div>
  );

  if (permisos.isPending) {
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
        onHide={() => setSelectedPermiso(undefined)}
      />

      <Card className="mb-2 bg-blue-50">
        <Toolbar start={startContent} end={endContent} className="border-none p-0" />
      </Card>

      <Card className="bg-blue-50">
        <CardTable<IPermiso>
          title=""
          columns={columns}
          value={filteredPermisos}
          skeletonLoading={permisos.isPending}
          tableProps={{
            rows: 10,
            size: "small",
            scrollable: true,
            dataKey: "PermisoId",
            removableSort: true,
            paginatorLeft: true,
            scrollHeight: "500px",
            loading: permisos.isFetching,
            emptyMessage: renderEmptyMessage(),
            contextMenuSelection: selectedPermiso,
            rowsPerPageOptions: [10, 25, 50],
            paginator: filteredPermisos.length > 10,
            className: "p-datatable-striped",
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<IPermiso[]>,
            ) => setSelectedPermiso(e.value),
            onRowDoubleClick: (e) => handleOpenDialog(e.data.EstadoId),
          }}
        />
      </Card>

      <PermisosFormDialog
        id={state.id}
        visible={state.visible ?? false}
        onHide={handleCloseDialog}
      />
    </div>
  );
};

export default Permisos;
