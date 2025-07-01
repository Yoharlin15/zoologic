import React from "react";
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
import { IDetalleComportamiento } from "#interfaces";
import { DetallesComportamientoFormDialog } from "./detalleComportamientoFormDialog";

const DetallesComportamientos = () => {
  const detallesComportamientos = AppQueryHooks.useFetchDetalleComportamiento();

  const [state, dispatch] = React.useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });

  const [selectedDetalleComportamiento, setSelectedDetalleComportamiento] = React.useState<IDetalleComportamiento>();
  const cm = React.useRef<ContextMenu>(null);
  const [searchText, setSearchText] = React.useState("");

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () =>
        dispatch({
          type: "OPEN_DIALOG",
          payload: selectedDetalleComportamiento?.DetalleComportamientoId ?? 0,
        }),
    },
    {
      label: "Eliminar",
      icon: "pi pi-trash",
      command: () => handleDeleteDetalleComportamiento(),
    },
  ];

  const handleDeleteDetalleComportamiento = () => {
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el cargo "${selectedDetalleComportamiento?.DetallesComportamiento}"?`,
      header: "Confirmar Eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      accept: () => {

        toast.success(`Comportamiento "${selectedDetalleComportamiento?.DetallesComportamiento}" eliminado correctamente`);
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

  const columns = React.useMemo<ICardTableProps<IDetalleComportamiento>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Nombre del comportamiento",
        field: "DetallesComportamiento",
        body: (rowData: IDetalleComportamiento) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-pen-to-square text-green-500"></i>
            <span className="font-medium">{rowData.DetallesComportamiento}</span>
          </div>
        ),
      },
    ],
    [],
  );

  const filteredDetallesComportamiento = React.useMemo(() => {
    if (!detallesComportamientos.data?.length) return [];

    return detallesComportamientos.data.filter((item) =>
      matchesSearchText(searchText, item.DetallesComportamiento),
    );
  }, [searchText, detallesComportamientos.data]);

  const renderEmptyMessage = React.useCallback(() => {
    return (
      <div className="text-center p-6">
        <i className="pi pi-flag text-6xl text-400 mb-3"></i>
        <div className="text-900 font-bold text-xl mb-2">No hay comportamientos registrados</div>
        <div className="text-600 mb-4">Comienza creando tu primer comportamiento</div>
        <Button
          label="Crear Nuevo comportamiento"
          icon="pi pi-plus"
          onClick={() => handleOpenDialog(0)}
        />
      </div>
    );
  }, []);

  const endContent = (
    <div className="flex gap-2">
      <Button
        label="Nuevo comportamiento"
        icon="pi pi-plus"
        onClick={() => handleOpenDialog(0)}
        className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
      />
    </div>
  );

  if (detallesComportamientos.isPending) {
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
        onHide={() => setSelectedDetalleComportamiento(undefined)}
      />

      
        <CardTable<IDetalleComportamiento>
          title=""
          columns={columns}
          value={filteredDetallesComportamiento}
          skeletonLoading={detallesComportamientos.isPending}

          headerEndContent={
            <Button
              label="Nueva familia"
              icon="pi pi-plus"
              onClick={() => handleOpenDialog(0)}
              className="bg-green-400 hover:bg-green-600 border-0 shadow-none"

            />
          }
          tableProps={{
            rows: 10,
            size: "small",
            scrollable: true,
            dataKey: "DetalleComportamientoId",
            removableSort: true,
            paginatorLeft: true,
            scrollHeight: "500px",
            loading: detallesComportamientos.isFetching,
            emptyMessage: renderEmptyMessage(),
            contextMenuSelection: selectedDetalleComportamiento,
            rowsPerPageOptions: [10, 25, 50],
            paginator: filteredDetallesComportamiento.length > 10,
            className: "p-datatable-striped",
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<IDetalleComportamiento[]>,
            ) => setSelectedDetalleComportamiento(e.value),
            onRowDoubleClick: (e) => handleOpenDialog(e.data.DetalleComportamientoId),
          }}
        />

      <DetallesComportamientoFormDialog
        id={state.id}
        visible={state.visible ?? false}
        onHide={handleCloseDialog}
      />
    </div>
  );
};

export default DetallesComportamientos;
