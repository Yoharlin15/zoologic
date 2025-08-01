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
import { ICargo } from "ClientApp/interfaces/cargos";
import { CargosFormDialog } from "./cargosFormDialog";

const Cargos = () => {
  const cargos = AppQueryHooks.useFetchCargos();

  const [state, dispatch] = React.useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });

  const [selectedCargo, setSelectedCargo] = React.useState<ICargo>();
  const cm = React.useRef<ContextMenu>(null);
  const [searchText, setSearchText] = React.useState("");

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () =>
        dispatch({
          type: "OPEN_DIALOG",
          payload: selectedCargo?.CargoId ?? 0,
        }),
    },
    {
      label: "Eliminar",
      icon: "pi pi-trash",
      command: () => handleDeleteCargo(),
    },
  ];

  const handleDeleteCargo = () => {
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el cargo "${selectedCargo?.Cargo}"?`,
      header: "Confirmar Eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      accept: () => {
        // Aquí iría la lógica para eliminar el estado
        toast.success(`Estado "${selectedCargo?.Cargo}" eliminado correctamente`);
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

  const columns = React.useMemo<ICardTableProps<ICargo>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Nombre del cargo",
        field: "Cargo",
        body: (rowData: ICargo) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-briefcase text-green-500"></i>
            <span className="font-medium">{rowData.Cargo}</span>
          </div>
        ),
      },
      {
        filter: true,
        sortable: true,
        header: "Fecha de creacion",
        field: "FechaCreacion",
        body: (rowData: ICargo) => (
          <div className="flex items-center gap-2">
            <i className="pi pi-calendar text-green-500"></i>
            <span className="font-medium">
              {rowData.FechaCreacion.split('T')[0]} {/* Esto elimina la parte de la hora */}
            </span>
          </div>
        ),
      },
    ],
    [],
  );

  const filteredCargos = React.useMemo(() => {
    if (!cargos.data?.length) return [];

    return cargos.data.filter((item) =>
      matchesSearchText(searchText, item.Cargo),
    );
  }, [searchText, cargos.data]);

  const renderEmptyMessage = React.useCallback(() => {
    return (
      <div className="text-center p-6">
        <i className="pi pi-flag text-6xl text-400 mb-3"></i>
        <div className="text-900 font-bold text-xl mb-2">No hay cargos registrados</div>
        <div className="text-600 mb-4">Comienza creando tu primer cargo</div>
        <Button
          label="Crear Nuevo cargo"
          icon="pi pi-plus"
          onClick={() => handleOpenDialog(0)}
        />
      </div>
    );
  }, []);

  const startContent = (
    <div className="flex align-items-center gap-3">
      <div>
        <h1 className="text-2xl font-bold text-900 m-0">Gestión de cargos</h1>
        <p className="text-600 m-0 mt-1">Administra los cargos disponibles</p>
      </div>
    </div>
  );

  const endContent = (
    <div className="flex gap-2">
      <Button
        label="Nuevo cargo"
        icon="pi pi-plus"
        onClick={() => handleOpenDialog(0)}
        className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
      />
    </div>
  );

  if (cargos.isPending) {
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
        onHide={() => setSelectedCargo(undefined)}
      />

      <Card className="mb-2 bg-blue-50">
        <Toolbar start={startContent} end={endContent} className="border-none p-0" />
      </Card>

      <Card className="bg-blue-50">
        <CardTable<ICargo>
          title=""
          columns={columns}
          value={filteredCargos}
          skeletonLoading={cargos.isPending}
          tableProps={{
            rows: 10,
            size: "small",
            scrollable: true,
            dataKey: "CargoId",
            removableSort: true,
            paginatorLeft: true,
            scrollHeight: "500px",
            loading: cargos.isFetching,
            emptyMessage: renderEmptyMessage(),
            contextMenuSelection: selectedCargo,
            rowsPerPageOptions: [10, 25, 50],
            paginator: filteredCargos.length > 10,
            className: "p-datatable-striped",
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<ICargo[]>,
            ) => setSelectedCargo(e.value),
            onRowDoubleClick: (e) => handleOpenDialog(e.data.EstadoId),
          }}
        />
      </Card>

      <CargosFormDialog
        id={state.id}
        visible={state.visible ?? false}
        onHide={handleCloseDialog}
      />
    </div>
  );
};

export default Cargos;
