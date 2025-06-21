import React from "react";
import { IClase, IFamilia, IRoles } from "#interfaces";
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
import { ClaseFormDialog } from "./claseFormDialog";

const Clases = () => {
  const clases = AppQueryHooks.useFetchClases();

  const [state, dispatch] = React.useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });

  const [selectedClase, setSelectedClase] = React.useState<IClase>();
  const cm = React.useRef<ContextMenu>(null);
  const [searchText, setSearchText] = React.useState("");

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () =>
        dispatch({
          type: "OPEN_DIALOG",
          payload: selectedClase?.ClaseId ?? 0,
        }),
    },
    {
      label: "Eliminar",
      icon: "pi pi-trash",
      command: () => handleDeleteClase(),
    },
  ];

  const handleDeleteClase = () => {
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el estado "${selectedClase?.ClaseNombre}"?`,
      header: "Confirmar Eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      accept: () => {
        // Aquí iría la lógica para eliminar el estado
        toast.success(`Clase "${selectedClase?.ClaseNombre}" eliminado correctamente`);
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

  const columns = React.useMemo<ICardTableProps<IClase>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Nombre del Estado",
        field: "ClaseNombre",
        body: (rowData: IClase) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-flag text-primary"></i>
            <span className="font-medium">{rowData.ClaseNombre}</span>
          </div>
        ),
      },
      {
        header: "Acciones",
        body: (rowData: IClase) => (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              size="small"
              severity="info"
              tooltip="Editar clase"
              tooltipOptions={{ position: "top" }}
              onClick={() => {
                setSelectedClase(rowData); // ✅ Esto es lo que faltaba
                handleOpenDialog(rowData.ClaseId);
              }}
            />

            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              tooltip="Eliminar clase"
              tooltipOptions={{ position: "top" }}
              onClick={() => {
                setSelectedClase(rowData);
                handleDeleteClase();
              }}
            />
          </div>
        ),
      },
    ],
    [],
  );

  const filteredClases = React.useMemo(() => {
    if (!clases.data?.length) return [];

    return clases.data.filter((item) =>
      matchesSearchText(searchText, item.ClaseNombre),
    );
  }, [searchText, clases.data]);

  const renderEmptyMessage = React.useCallback(() => {
    return (
      <div className="text-center p-6">
        <i className="pi pi-flag text-6xl text-400 mb-3"></i>
        <div className="text-900 font-bold text-xl mb-2">No hay clases registrados</div>
        <Button
          label="Crear Nueva clase"
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
        <h1 className="text-2xl font-bold text-900 m-0">Gestión de clases</h1>
      </div>
    </div>
  );

  const endContent = (
    <div className="flex gap-2">
      <Button
        label="Nueva clase"
        icon="pi pi-plus"
        onClick={() => handleOpenDialog(0)}
        className="p-button-primary"
      />
    </div>
  );

  if (clases.isPending) {
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
        onHide={() => setSelectedClase(undefined)}
      />

      <Card className="mb-2 bg-blue-50">
        <Toolbar start={startContent} end={endContent} className="border-none p-0" />
      </Card>

      <Card className="bg-blue-50">
        <CardTable<IClase>
          title=""
          columns={columns}
          value={filteredClases}
          skeletonLoading={clases.isPending}
          tableProps={{
            rows: 10,
            size: "small",
            scrollable: true,
            dataKey: "ClaseId",
            removableSort: true,
            paginatorLeft: true,
            scrollHeight: "500px",
            loading: clases.isFetching,
            emptyMessage: renderEmptyMessage(),
            contextMenuSelection: selectedClase,
            rowsPerPageOptions: [10, 25, 50],
            paginator: filteredClases.length > 10,
            className: "p-datatable-striped",
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<IClase[]>,
            ) => setSelectedClase(e.value),
            onRowDoubleClick: (e) => handleOpenDialog(e.data.EstadoId),
          }}
        />
      </Card>

      <ClaseFormDialog
        id={state.id}
        visible={state.visible ?? false}
        onHide={handleCloseDialog}
      />
    </div>
  );
};

export default Clases;
