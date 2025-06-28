import React from "react";
import { IExamen, ITratamiento } from "#interfaces";
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
import { ExamenesFormDialog } from "./examenFormDialog";

const Examenes = () => {
  const examenes = AppQueryHooks.useFetchExamenes();

  const [state, dispatch] = React.useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });

  const [selectedExamen, setSelectedExamen] = React.useState<IExamen>();
  const cm = React.useRef<ContextMenu>(null);
  const [searchText, setSearchText] = React.useState("");

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () =>
        dispatch({
          type: "OPEN_DIALOG",
          payload: selectedExamen?.ExamenId ?? 0,
        }),
    },
    {
      label: "Eliminar",
      icon: "pi pi-trash",
      command: () => handleDeleteExamen(),
    },
  ];

  const handleDeleteExamen = () => {
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el estado "${selectedExamen?.Examen}"?`,
      header: "Confirmar Eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      accept: () => {
        // Aquí iría la lógica para eliminar el estado
        toast.success(`Estado "${selectedExamen?.Examen}" eliminado correctamente`);
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

  const columns = React.useMemo<ICardTableProps<IExamen>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Examenes",
        field: "Examen",
        body: (rowData: IExamen) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-user text-green-500"></i>
            <span className="font-medium">{rowData.Examen}</span>
          </div>
        ),
      },
    ],
    [],
  );

  const filteredExamenes = React.useMemo(() => {
    if (!examenes.data?.length) return [];

    return examenes.data.filter((item) =>
      matchesSearchText(searchText, item.Examen),
    );
  }, [searchText, examenes.data]);

  const renderEmptyMessage = React.useCallback(() => {
    return (
      <div className="text-center p-6">
        <i className="pi pi-flag text-6xl text-400 mb-3"></i>
        <div className="text-900 font-bold text-xl mb-2">No hay examenes registrados</div>
        <div className="text-600 mb-4">Comienza creando tu primer examen</div>
        <Button
          label="Crear Nuevo examen"
          icon="pi pi-plus"
          onClick={() => handleOpenDialog(0)}
        />
      </div>
    );
  }, []);

  const startContent = (
    <div className="flex align-items-center gap-3">
      <div>
        <h1 className="text-2xl font-bold text-900 m-0">Gestión de Examenes clinicos</h1>
        <p className="text-600 m-0 mt-1">Administra los examenes clinicos disponibles</p>
      </div>
    </div>
  );

  const endContent = (
    <div className="flex gap-2">
      <Button
        label="Nuevo tratamiento"
        icon="pi pi-plus"
        onClick={() => handleOpenDialog(0)}
        className="bg-green-400 hover:bg-green-600 border-0 shadow-none" />
    </div>
  );

  if (examenes.isPending) {
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
        onHide={() => setSelectedExamen(undefined)}
      />

      <Card className="mb-2 bg-blue-50">
        <Toolbar start={startContent} end={endContent} className="border-none p-0" />
      </Card>

      <Card className="bg-blue-50">
        <CardTable<IExamen>
          title=""
          columns={columns}
          value={filteredExamenes}
          skeletonLoading={examenes.isPending}
          tableProps={{
            rows: 10,
            size: "small",
            scrollable: true,
            dataKey: "ExamenId",
            removableSort: true,
            paginatorLeft: true,
            scrollHeight: "500px",
            loading: examenes.isFetching,
            emptyMessage: renderEmptyMessage(),
            contextMenuSelection: selectedExamen,
            rowsPerPageOptions: [10, 25, 50],
            paginator: filteredExamenes.length > 10,
            className: "p-datatable-striped",
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<IExamen[]>,
            ) => setSelectedExamen(e.value),
            onRowDoubleClick: (e) => handleOpenDialog(e.data.ExamenId),
          }}
        />
      </Card>

      <ExamenesFormDialog
        id={state.id}
        visible={state.visible ?? false}
        onHide={handleCloseDialog}
      />
    </div>
  );
};

export default Examenes;
