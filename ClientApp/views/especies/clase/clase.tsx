import React from "react";
import { IClase } from "#interfaces";
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
        header: "Clases",
        field: "ClaseNombre",
        body: (rowData: IClase) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-thumbtack text-green-500"></i>
            <span className="font-medium">{rowData.ClaseNombre}</span>
          </div>
        ),
      },
      {
        filter: true,
        sortable: true,
        header: "Creado por",
        field: "NombreUsuario",
        body: (rowData: IClase) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-user text-green-500"></i>
            <span className="font-medium">{rowData.NombreUsuario}</span>
          </div>
        ),
      },
      {
        filter: true,
        sortable: true,
        header: "Fecha de creacion",
        field: "FechaCreacion",
        style: { minWidth: "12rem" },
        body: (rowData: IClase) => (
          <div className="flex items-center gap-2">
            <i className="pi pi-calendar text-green-500"></i>
            <span className="font-medium">
              {rowData.FechaCreacion.split('T')[0]} {/* Esto elimina la parte de la hora */}
            </span>
          </div>
        ),
      },
      {
        header: "Acciones",
        style: { minWidth: "8rem", textAlign: "left" },
        body: (row: IClase) => (
          <Button
            icon="pi pi-ellipsis-v" // <-- horizontal en lugar de vertical
            className="p-button-rounded p-button-text p-button-plain text-gray-700 hover:text-gray-900"
            style={{ width: 28, height: 28, padding: 0, lineHeight: 1 }}
            onClick={(e) => {
              setSelectedClase(row);
              cm.current?.show(e); // abre el ContextMenu ya existente
            }}
          />
        ),
      }
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
      <CardTable<IClase>
        title=""
        columns={columns}
        value={filteredClases}
        skeletonLoading={clases.isPending}
        headerEndContent={
          <Button
            label="Nueva clase"
            icon="pi pi-plus"
            onClick={() => handleOpenDialog(0)}
            className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
          />
        }
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

      <ClaseFormDialog
        id={state.id}
        visible={state.visible ?? false}
        onHide={handleCloseDialog}
      />
    </div>
  );
};

export default Clases;
