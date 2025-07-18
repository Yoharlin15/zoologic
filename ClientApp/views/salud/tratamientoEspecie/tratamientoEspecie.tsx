import React from "react";
import { ITratamiento, ITratamientoEspecie } from "#interfaces";
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
import { TratamientoEspecieFormDialog } from "./tratamientoEspecieFormDialog";

const TratamientosEspecies = () => {
  const tratamientosEspecies = AppQueryHooks.useFetchTratamientoEspecie();

  const [state, dispatch] = React.useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });

  const [selectedTratamientoEspecie, setSelectedTratamientoEspecie] = React.useState<ITratamientoEspecie>();
  const cm = React.useRef<ContextMenu>(null);
  const [searchText, setSearchText] = React.useState("");

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () =>
        dispatch({
          type: "OPEN_DIALOG",
          payload: selectedTratamientoEspecie?.TratamientoId ?? 0,
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
      message: `¿Estás seguro de que deseas eliminar la relacion "${selectedTratamientoEspecie?.NombreTratamiento}"?`,
      header: "Confirmar Eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      accept: () => {
        // Aquí iría la lógica para eliminar el estado
        toast.success(`Estado "${selectedTratamientoEspecie?.NombreTratamiento}" eliminado correctamente`);
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

  const columns = React.useMemo<ICardTableProps<ITratamientoEspecie>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Tratamientos",
        field: "NombreTratamiento",
        body: (rowData: ITratamientoEspecie) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-user text-green-500"></i>
            <span className="font-medium">{rowData.NombreTratamiento}</span>
          </div>
        ),
      },
      {
        filter: true,
        sortable: true,
        header: "Especies",
        field: "NombreComun",
        body: (rowData: ITratamientoEspecie) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-user text-green-500"></i>
            <span className="font-medium">{rowData.NombreComun}</span>
          </div>
        ),
      },
    ],
    [],
  );

  const filteredTratamientos = React.useMemo(() => {
    if (!tratamientosEspecies.data?.length) return [];

    return tratamientosEspecies.data.filter((item) =>
      matchesSearchText(searchText, item.NombreTratamiento),
    );
  }, [searchText, tratamientosEspecies.data]);

  const renderEmptyMessage = React.useCallback(() => {
    return (
      <div className="text-center p-6">
        <i className="pi pi-flag text-6xl text-400 mb-3"></i>
        <div className="text-900 font-bold text-xl mb-2">No hay tratamientos registrados</div>
        <div className="text-600 mb-4">Comienza creando tu primer tratamiento</div>
        <Button
          label="Crear Nuevo tratamiento"
          icon="pi pi-plus"
          onClick={() => handleOpenDialog(0)}
        />
      </div>
    );
  }, []);

  const startContent = (
    <div className="flex align-items-center gap-3">
      <div>
        <h1 className="text-2xl font-bold text-900 m-0">Tratamientos aplicados a especies</h1>
        <p className="text-600 m-0 mt-1">Administra los tratamientos disponibles</p>
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

  if (tratamientosEspecies.isPending) {
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
        onHide={() => setSelectedTratamientoEspecie(undefined)}
      />

      <Card className="mb-2 bg-blue-50">
        <Toolbar start={startContent} end={endContent} className="border-none p-0" />
      </Card>

      <Card className="bg-blue-50">
        <CardTable<ITratamientoEspecie>
          title=""
          columns={columns}
          value={filteredTratamientos}
          skeletonLoading={tratamientosEspecies.isPending}
          tableProps={{
            rows: 10,
            size: "small",
            scrollable: true,
            dataKey: "TratamientoEspecieId",
            removableSort: true,
            paginatorLeft: true,
            scrollHeight: "500px",
            loading: tratamientosEspecies.isFetching,
            emptyMessage: renderEmptyMessage(),
            contextMenuSelection: selectedTratamientoEspecie,
            rowsPerPageOptions: [10, 25, 50],
            paginator: filteredTratamientos.length > 10,
            className: "p-datatable-striped",
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<ITratamientoEspecie[]>,
            ) => setSelectedTratamientoEspecie(e.value),
            onRowDoubleClick: (e) => handleOpenDialog(e.data.TratamientoId),
          }}
        />
      </Card>

      <TratamientoEspecieFormDialog
        id={state.id}
        visible={state.visible ?? false}
        onHide={handleCloseDialog}
      />
    </div>
  );
};

export default TratamientosEspecies;
