import React from "react";
import { IRoles, IZona } from "#interfaces";
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
import { ZonasFormDialog } from "./zonasFormDialog";

const Zonas = () => {
  const zonas = AppQueryHooks.useFetchZonas();

  const [state, dispatch] = React.useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });

  const [selectedZona, setSelectedZona] = React.useState<IZona>();
  const cm = React.useRef<ContextMenu>(null);
  const [searchText, setSearchText] = React.useState("");

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () =>
        dispatch({
          type: "OPEN_DIALOG",
          payload: selectedZona?.ZonaId ?? 0,
        }),
    },
    {
      label: "Eliminar",
      icon: "pi pi-trash",
      command: () => handleDeleteZona(),
    },
  ];

  const handleDeleteZona = () => {
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar la zona "${selectedZona?.NombreZona}"?`,
      header: "Confirmar Eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      accept: () => {
        toast.success(`Zona "${selectedZona?.NombreZona}" eliminado correctamente`);
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

  const columns = React.useMemo<ICardTableProps<IZona>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Zonas",
        field: "NombreZona",
        body: (rowData: IZona) => (
          <div className="flex align-items-center gap-2">
            <i className="pi pi-map-marker text-green-500"></i>
            <span className="font-medium">{rowData.NombreZona}</span>
          </div>
        ),
      },
    ],
    [],
  );

  const filteredZonas = React.useMemo(() => {
    if (!zonas.data?.length) return [];

    return zonas.data.filter((item) =>
      matchesSearchText(searchText, item.NombreZona),
    );
  }, [searchText, zonas.data]);

  const renderEmptyMessage = React.useCallback(() => {
    return (
      <div className="text-center p-6">
        <i className="pi pi-flag text-6xl text-400 mb-3"></i>
        <div className="text-900 font-bold text-xl mb-2">No hay zonas registrados</div>
        <div className="text-600 mb-4">Comienza creando tu primera zona</div>
        <Button
          label="Crear Nuevo zona"
          icon="pi pi-plus"
          onClick={() => handleOpenDialog(0)}
        />
      </div>
    );
  }, []);

  const startContent = (
    <div className="flex align-items-center gap-3">
      <div>
        <h1 className="text-2xl font-bold text-900 m-0">Gestión de Zonas</h1>
        <p className="text-600 m-0 mt-1">Administra las zonas disponibles</p>
      </div>
    </div>
  );

  const endContent = (
    <div className="flex gap-2">
      <Button
        label="Nuevo zona"
        icon="pi pi-plus"
        onClick={() => handleOpenDialog(0)}
        className="bg-green-400 hover:bg-green-600 border-0 shadow-none" />
    </div>
  );

  if (zonas.isPending) {
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
        onHide={() => setSelectedZona(undefined)}
      />

      <Card className="mb-2 bg-blue-50">
        <Toolbar start={startContent} end={endContent} className="border-none p-0" />
      </Card>

      <Card className="bg-blue-50">
        <CardTable<IZona>
          title=""
          columns={columns}
          value={filteredZonas}
          skeletonLoading={zonas.isPending}
          tableProps={{
            rows: 10,
            size: "small",
            scrollable: true,
            dataKey: "RolId",
            removableSort: true,
            paginatorLeft: true,
            scrollHeight: "500px",
            loading: zonas.isFetching,
            emptyMessage: renderEmptyMessage(),
            contextMenuSelection: selectedZona,
            rowsPerPageOptions: [10, 25, 50],
            paginator: filteredZonas.length > 10,
            className: "p-datatable-striped",
            onContextMenu: (e) => cm.current?.show(e.originalEvent),
            onContextMenuSelectionChange: (
              e: DataTableSelectionSingleChangeEvent<IZona[]>,
            ) => setSelectedZona(e.value),
            onRowDoubleClick: (e) => handleOpenDialog(e.data.EstadoId),
          }}
        />
      </Card>

      <ZonasFormDialog
        id={state.id}
        visible={state.visible ?? false}
        onHide={handleCloseDialog}
      />
    </div>
  );
};

export default Zonas;
