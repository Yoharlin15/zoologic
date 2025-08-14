import React from "react";
import { IFamilia } from "#interfaces";
import toast from "react-hot-toast";
import { matchesSearchText } from "#utils";
import { Button } from "primereact/button";
import { Reducers } from "#core";
import { ContextMenu } from "primereact/contextmenu";
import { AppQueryHooks } from "#hooks";
import { Skeleton } from "primereact/skeleton";
import { confirmDialog } from "primereact/confirmdialog";

import {
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";
import {
  CardTable,
  ICardTableProps,
} from "#components";
import { FamiliaFormDialog } from "./familiaFormDialog";

const Familias = () => {
  const familias = AppQueryHooks.useFetchFamilias();

  const [state, dispatch] = React.useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });

  const [selectedFamilia, setSelectedFamilia] = React.useState<IFamilia>();
  const cm = React.useRef<ContextMenu>(null);
  const [searchText, setSearchText] = React.useState("");

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () =>
        dispatch({
          type: "OPEN_DIALOG",
          payload: selectedFamilia?.FamiliaId ?? 0,
        }),
    },
    {
      label: "Eliminar",
      icon: "pi pi-trash",
      command: () => handleDeleteFamilia(),
    },
  ];

  const handleDeleteFamilia = () => {
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el estado "${selectedFamilia?.FamiliaNombre}"?`,
      header: "Confirmar Eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      accept: () => {
        toast.success(`Estado "${selectedFamilia?.FamiliaNombre}" eliminado correctamente`);
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

  const columns = React.useMemo<ICardTableProps<IFamilia>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Familias",
        field: "FamiliaNombre",
        body: (rowData: IFamilia) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-globe text-green-500"></i>
            <span className="font-medium">{rowData.FamiliaNombre}</span>
          </div>
        ),
      },
      {
        filter: true,
        sortable: true,
        header: "Creado por",
        field: "CreadoPor",
        body: (rowData: IFamilia) => (
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
        body: (rowData: IFamilia) => (
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

  const filteredFamilias = React.useMemo(() => {
    if (!familias.data?.length) return [];
    return familias.data.filter((item) =>
      matchesSearchText(searchText, item.FamiliaNombre),
    );
  }, [searchText, familias.data]);

  const renderEmptyMessage = React.useCallback(() => {
    return (
      <div className="text-center p-6">
        <i className="pi pi-flag text-6xl text-400 mb-3"></i>
        <div className="text-900 font-bold text-xl mb-2">No hay familias registrados</div>
        <Button
          label="Crear Nueva familia"
          icon="pi pi-plus"
          onClick={() => handleOpenDialog(0)}
        />
      </div>
    );
  }, []);

  const endContent = (
    <div className="flex gap-2">
      <Button
        label="Nueva familia"
        icon="pi pi-plus"
        onClick={() => handleOpenDialog(0)}
        className="p-button-primary"
      />
    </div>
  );

  if (familias.isPending) {
    return (
      <div className="w-full">
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
      </div>
    );
  }

  return (
    <div className="w-full">
      <ContextMenu
        ref={cm}
        model={menuModel}
        onHide={() => setSelectedFamilia(undefined)}
      />

      <CardTable<IFamilia>
        title=""
        columns={columns}
        value={filteredFamilias}
        skeletonLoading={familias.isPending}
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
          dataKey: "FamiliaId",
          removableSort: true,
          paginatorLeft: true,
          scrollHeight: "500px",
          loading: familias.isFetching,
          emptyMessage: renderEmptyMessage(),
          contextMenuSelection: selectedFamilia,
          rowsPerPageOptions: [10, 25, 50],
          paginator: filteredFamilias.length > 10,
          className: "p-datatable-striped",
          onContextMenu: (e) => cm.current?.show(e.originalEvent),
          onContextMenuSelectionChange: (
            e: DataTableSelectionSingleChangeEvent<IFamilia[]>,
          ) => setSelectedFamilia(e.value),
          onRowDoubleClick: (e) => handleOpenDialog(e.data.EstadoId),
        }}
      />

      <FamiliaFormDialog
        id={state.id}
        visible={state.visible ?? false}
        onHide={handleCloseDialog}
      />
    </div>
  );

};

export default Familias;
