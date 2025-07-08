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
import { IDepartamento } from "ClientApp/interfaces/departamento";
import { DepartamentosFormDialog } from "./departamentosFormDialog";

const Departamentos = () => {
  const departamentos = AppQueryHooks.useFetchDepartamentos();

  const [state, dispatch] = React.useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });

  const [selectedDepartamento, setSelectedCargo] = React.useState<IDepartamento>();
  const cm = React.useRef<ContextMenu>(null);
  const [searchText, setSearchText] = React.useState("");

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () =>
        dispatch({
          type: "OPEN_DIALOG",
          payload: selectedDepartamento?.DepartamentoId ?? 0,
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
      message: `¿Estás seguro de que deseas eliminar el cargo "${selectedDepartamento?.Nombre}"?`,
      header: "Confirmar Eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      accept: () => {
        // Aquí iría la lógica para eliminar el estado
        toast.success(`Departamento "${selectedDepartamento?.Nombre}" eliminado correctamente`);
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

  const columns = React.useMemo<ICardTableProps<IDepartamento>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Nombre del departamento",
        field: "Nombre",
        body: (rowData: IDepartamento) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-briefcase text-green-500"></i>
            <span className="font-medium">{rowData.Nombre}</span>
          </div>
        ),
      },
    ],
    [],
  );

  const filteredDepartamentos = React.useMemo(() => {
    if (!departamentos.data?.length) return [];

    return departamentos.data.filter((item) =>
      matchesSearchText(searchText, item.Nombre),
    );
  }, [searchText, departamentos.data]);

  const renderEmptyMessage = React.useCallback(() => {
    return (
      <div className="text-center p-6">
        <i className="pi pi-flag text-6xl text-400 mb-3"></i>
        <div className="text-900 font-bold text-xl mb-2">No hay departamentos registrados</div>
        <div className="text-600 mb-4">Comienza creando tu primer departamento</div>
        <Button
          label="Crear Nuevo departamento"
          icon="pi pi-plus"
          onClick={() => handleOpenDialog(0)}
        />
      </div>
    );
  }, []);

  const startContent = (
    <div className="flex align-items-center gap-3">
      <div>
        <h1 className="text-2xl font-bold text-900 m-0">Gestión de departamientos</h1>
        <p className="text-600 m-0 mt-1">Administra los departamientos disponibles</p>
      </div>
    </div>
  );

  const endContent = (
    <div className="flex gap-2">
      <Button
        label="Nuevo departamiento"
        icon="pi pi-plus"
        onClick={() => handleOpenDialog(0)}
        className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
      />
    </div>
  );

  if (departamentos.isPending) {
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
        <CardTable<IDepartamento>
          title=""
          columns={columns}
          value={filteredDepartamentos}
          skeletonLoading={departamentos.isPending}
          tableProps={{
            rows: 10,
            size: "small",
            scrollable: true,
            dataKey: "DepartamentoId",
            removableSort: true,
            paginatorLeft: true,
            scrollHeight: "500px",
            loading: departamentos.isFetching,
            emptyMessage: renderEmptyMessage(),
            contextMenuSelection: selectedDepartamento,
            rowsPerPageOptions: [10, 25, 50],
            paginator: filteredDepartamentos.length > 10,
            className: "p-datatable-striped",
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<IDepartamento[]>,
            ) => setSelectedCargo(e.value),
            onRowDoubleClick: (e) => handleOpenDialog(e.data.DepartamentoId),
          }}
        />
      </Card>

      <DepartamentosFormDialog
        id={state.id}
        visible={state.visible ?? false}
        onHide={handleCloseDialog}
      />
    </div>
  );
};

export default Departamentos;
