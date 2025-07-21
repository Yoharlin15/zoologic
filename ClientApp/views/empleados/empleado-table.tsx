import React, { useState, useRef, useMemo, useReducer } from "react";
import { debounce } from "radash";
import { IEmpleado } from "#interfaces";
import { AppQueryHooks } from "#hooks";
import { Button } from "primereact/button";
import { ContextMenu } from "primereact/contextmenu";
import {
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";

import { Toast } from "primereact/toast";
import { CardTable, ICardTableProps } from "../../components/card-table";
import dayjs from "dayjs";
import { Reducers } from "#core";
import EmpleadoSidebarForm from "./empleado-sidebar-form";
import { Dropdown } from "primereact/dropdown";
import { useActivateEmpleado, useDeleteEmpleado } from "ClientApp/hooks/useMutation/useMutationEmpleados";
import ConfirmDialogCustom from "ClientApp/components/confirmDialog/ConfirmDialogCustom";

interface IEmpleadoTableProps {
  dispatch: React.Dispatch<any>;
}

const EmpleadoTable = ({ dispatch }: IEmpleadoTableProps) => {
  const toast = useRef<Toast>(null);

  const estados = AppQueryHooks.useFetchEstados();
  const deleteEmpleado = useDeleteEmpleado();
  const activateEmpleado = useActivateEmpleado();
  const [estadoSeleccionadoId, setEstadoSeleccionadoId] = useState<number | null>(null);

  // Usa empleados filtrados si hay estado seleccionado, sino todos
  const empleados = estadoSeleccionadoId
    ? AppQueryHooks.useFetchEmpleadoByEstadoId(estadoSeleccionadoId)
    : AppQueryHooks.useFetchEmpleados();

  const [selectedEmpleado, setSelectedEmpleado] = useState<IEmpleado>();
  const cm = useRef<ContextMenu>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedEmpleadoId, setSelectedEmpleadoId] = useState<number | null>(null);

  const [empleadoAConfirmar, setEmpleadoAConfirmar] = useState<IEmpleado | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [accionConfirmacion, setAccionConfirmacion] = useState<"activar" | "desactivar">("desactivar");


  const onClickAnular = (empleado: IEmpleado) => {
    setEmpleadoAConfirmar(empleado);
    setAccionConfirmacion("desactivar");
    setConfirmVisible(true);
  };

  const onClickActivar = (empleado: IEmpleado) => {
    setEmpleadoAConfirmar(empleado);
    setAccionConfirmacion("activar");
    setConfirmVisible(true);
  };

  const onConfirmAccion = () => {
    if (!empleadoAConfirmar) return;

    if (accionConfirmacion === "desactivar") {
      deleteEmpleado.mutate(empleadoAConfirmar, {
        onSuccess: () => {
          toast.current?.show({
            severity: "success",
            summary: "Empleado desactivado",
            detail: `El empleado ${empleadoAConfirmar.Nombres} ${empleadoAConfirmar.Apellidos} fue desactivado correctamente.`
          });
          setConfirmVisible(false);
          setEmpleadoAConfirmar(null);
        },
      });
    } else if (accionConfirmacion === "activar") {
      activateEmpleado.mutate(empleadoAConfirmar.EmpleadoId, {
        onSuccess: () => {
          toast.current?.show({
            severity: "success",
            summary: "Empleado activado",
            detail: `El empleado ${empleadoAConfirmar.Nombres} ${empleadoAConfirmar.Apellidos} fue activado correctamente.`
          });
          setConfirmVisible(false);
          setEmpleadoAConfirmar(null);
        },
      });
    }
  };

  const menuModel = [
    {
      label: "Editar",
      icon: "pi pi-pencil",
      command: () => {
        if (selectedEmpleado) {
          setSelectedEmpleadoId(selectedEmpleado.EmpleadoId);
          setSidebarVisible(true);
        }
      },
    },
    {
      label: "Anular",
      icon: "pi pi-trash",
      visible: selectedEmpleado?.EstadoId === 1,
      command: () => {
        if (selectedEmpleado) {
          onClickAnular(selectedEmpleado);
        }
      },
    },
    {
      label: "Activar",
      icon: "pi pi-check-circle",
      visible: selectedEmpleado?.EstadoId === 2,
      command: () => {
        if (selectedEmpleado) {
          onClickActivar(selectedEmpleado);
        }
      },
    },


  ];

  const [confirmState, confirmDispatch] = useReducer(Reducers.DialogsReducer, {
    id: 0,
    visible: false,
  });
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<DataTableFilterMeta>({});

  const columns = useMemo<ICardTableProps<IEmpleado>["columns"]>(
    () => [
      {
        filter: true,
        sortable: true,
        header: "Nombres",
        field: "Nombres",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Apellidos",
        field: "Apellidos",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Cedula",
        field: "Cedula",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Fecha de nacimiento",
        field: "FechaNacimiento",
        style: { minWidth: "14rem" },
        body: (rowData: IEmpleado | null) => {
          if (!rowData?.FechaNacimiento) return "";
          return dayjs(rowData.FechaNacimiento).format("DD/MM/YYYY");
        },
      },
      {
        filter: true,
        sortable: true,
        header: "Sexo",
        field: "Sexo",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Telefono",
        field: "Telefono",
        style: { minWidth: "12em" },
      },
      {
        filter: true,
        sortable: true,
        header: "Correo personal",
        field: "Email",
        style: { minWidth: "12em" },
      },
      {
        filter: true,
        sortable: true,
        header: "Nacionalidad",
        field: "Nacionalidad",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Dirección",
        field: "Direccion",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Cargo",
        field: "CargoNombre",
        style: { minWidth: "12rem" },
      },
      {
        filter: true,
        sortable: true,
        header: "Fecha de contratacion",
        field: "FechaContratacion",
        style: { minWidth: "12rem" },
        body: (rowData: IEmpleado | null) => {
          if (!rowData?.FechaContratacion) return "";
          return dayjs(rowData.FechaContratacion).format("DD/MM/YYYY");
        },
      },
      {
        filter: true,
        sortable: true,
        header: "Departamento",
        field: "NombreDepartamento",
        style: { minWidth: "12em" },
      },
      {
        filter: true,
        sortable: true,
        header: "Estado",
        field: "NombreEstado",
        style: { minWidth: "10em" },
      },
    ],
    []
  );

  // Filtra por búsqueda solo dentro de los empleados ya filtrados por estado
  const filteredEmpleados = useMemo(() => {
    if (!Array.isArray(empleados.data)) return [];
    return empleados.data.filter((t) =>
      t.Sexo?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [empleados.data, searchText]);

  const estadosOptions = estados.data ?? [];

  return (
    <div className="h-full">
      <Toast ref={toast} />
      <ContextMenu
        ref={cm}
        model={menuModel}
        onHide={() => setSelectedEmpleado(undefined)}
      />
      <CardTable<IEmpleado>
        title="Lista de Empleados"
        columns={columns}
        value={filteredEmpleados}
        skeletonLoading={empleados.isPending}
        onChangeSearch={debounce({ delay: 500 }, (e) =>
          setSearchText(e.target.value)
        )}
        renderHeadActions={[
          <Dropdown
            key="filtro_estado"
            value={estadoSeleccionadoId}
            options={estadosOptions}
            onChange={(e) => {
              setEstadoSeleccionadoId(e.value);
              setSearchText(""); // limpia búsqueda al cambiar filtro
            }}
            placeholder="Filtrar por estado"
            className="ml-2 w-60"
            optionLabel="NombreEstado"
            optionValue="EstadoId"
            showClear
          />,
          <Button
            key="btn_add"
            onClick={() => {
              setSelectedEmpleadoId(null);
              setSidebarVisible(true);
            }}
            className="bg-green-400 hover:bg-green-600 border-0 shadow-none"
            label="Nuevo empleado"
          />,
        ]}
        tableProps={{
          rows: 8,
          size: "small",
          filters,
          dataKey: "EmpleadoId",
          loading: empleados.isFetching,
          paginator: filteredEmpleados.length > 8,
          contextMenuSelection: selectedEmpleado,
          onContextMenu: (e) => cm.current?.show(e.originalEvent),
          onContextMenuSelectionChange: (
            e: DataTableSelectionSingleChangeEvent<IEmpleado[]>
          ) => setSelectedEmpleado(e.value),
        }}
      />
      <EmpleadoSidebarForm
        id={selectedEmpleadoId ?? undefined}
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        empleadoId={undefined}
      />

      <ConfirmDialogCustom
        visible={confirmVisible}
        message={`¿Deseas ${accionConfirmacion === "activar" ? "activar" : "desactivar"
          } al empleado ${empleadoAConfirmar?.Nombres} ${empleadoAConfirmar?.Apellidos}?`}
        confirmLabel={accionConfirmacion === "activar" ? "Activar" : "Desactivar"}
        confirmClassName={accionConfirmacion === "activar" ? "p-button-success" : "p-button-danger"}
        icon={accionConfirmacion === "activar" ? "pi pi-check-circle" : "pi pi-exclamation-triangle"}
        onConfirm={onConfirmAccion}
        onCancel={() => setConfirmVisible(false)}
      />
    </div>
  );
};

export default EmpleadoTable;
