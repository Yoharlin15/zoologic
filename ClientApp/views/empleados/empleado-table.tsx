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

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface IEmpleadoTableProps {
  dispatch: React.Dispatch<any>;
}

const EmpleadoTable = ({ dispatch }: IEmpleadoTableProps) => {
  const toast = useRef<Toast>(null);
  const estados = AppQueryHooks.useFetchEstados();
  const deleteEmpleado = useDeleteEmpleado();
  const activateEmpleado = useActivateEmpleado();
  const [estadoSeleccionadoId, setEstadoSeleccionadoId] = useState<number | null>(null);

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

    const action = accionConfirmacion === "desactivar" ? deleteEmpleado : activateEmpleado;
    const params = empleadoAConfirmar.EmpleadoId;

    action.mutate(params, {
      onSuccess: () => {
        toast.current?.show({
          severity: "success",
          summary: `Empleado ${accionConfirmacion === "activar" ? "activado" : "desactivado"}`,
          detail: `El empleado ${empleadoAConfirmar.Nombres} ${empleadoAConfirmar.Apellidos} fue ${accionConfirmacion === "activar" ? "activado" : "desactivado"} correctamente.`,
        });
        setConfirmVisible(false);
        setEmpleadoAConfirmar(null);
      },
    });
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
      command: () => selectedEmpleado && onClickAnular(selectedEmpleado),
    },
    {
      label: "Activar",
      icon: "pi pi-check-circle",
      visible: selectedEmpleado?.EstadoId === 2,
      command: () => selectedEmpleado && onClickActivar(selectedEmpleado),
    },
  ];

  const [confirmState, confirmDispatch] = useReducer(Reducers.DialogsReducer, { id: 0, visible: false });
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<DataTableFilterMeta>({});

  const columns = useMemo<ICardTableProps<IEmpleado>["columns"]>(
    () => [
      { filter: true, sortable: true, header: "Nombres", field: "Nombres", style: { minWidth: "12rem" } },
      { filter: true, sortable: true, header: "Apellidos", field: "Apellidos", style: { minWidth: "12rem" } },
      { filter: true, sortable: true, header: "Cedula", field: "Cedula", style: { minWidth: "12rem" } },
      {
        filter: true,
        sortable: true,
        header: "Fecha de nacimiento",
        field: "FechaNacimiento",
        style: { minWidth: "14rem" },
        body: (rowData) => rowData?.FechaNacimiento ? dayjs(rowData.FechaNacimiento).format("DD/MM/YYYY") : "",
      },
      { filter: true, sortable: true, header: "Sexo", field: "Sexo", style: { minWidth: "12rem" } },
      { filter: true, sortable: true, header: "Telefono", field: "Telefono", style: { minWidth: "12rem" } },
      { filter: true, sortable: true, header: "Correo personal", field: "Email", style: { minWidth: "18rem" } },
      { filter: true, sortable: true, header: "Nacionalidad", field: "Nacionalidad", style: { minWidth: "12rem" } },
      { filter: true, sortable: true, header: "Dirección", field: "Direccion", style: { minWidth: "18rem" } },
      { filter: true, sortable: true, header: "Cargo", field: "CargoNombre", style: { minWidth: "12rem" } },
      {
        filter: true,
        sortable: true,
        header: "Fecha de contratacion",
        field: "FechaContratacion",
        style: { minWidth: "18rem" },
        body: (rowData) => rowData?.FechaContratacion ? dayjs(rowData.FechaContratacion).format("DD/MM/YYYY") : "",
      },
      { filter: true, sortable: true, header: "Departamento", field: "NombreDepartamento", style: { minWidth: "12em" } },
      { filter: true, sortable: true, header: "Estado", field: "NombreEstado", style: { minWidth: "10em" } },
      {
        filter: true,
        sortable: true,
        header: "Fecha de creacion",
        field: "FechaCreacion",
        style: { minWidth: "12rem" },
        body: (rowData) => rowData?.FechaCreacion ? dayjs(rowData.FechaCreacion).format("DD/MM/YYYY") : "",
      },
      {
        header: "Acciones",
        style: { minWidth: "8rem", textAlign: "left" },
        body: (row: IEmpleado) => (
          <Button
            icon="pi pi-ellipsis-v" // <-- horizontal en lugar de vertical
            className="p-button-rounded p-button-text p-button-plain text-gray-700 hover:text-gray-900"
            style={{ width: 28, height: 28, padding: 0, lineHeight: 1 }}
            onClick={(e) => {
              setSelectedEmpleado(row);
              cm.current?.show(e); // abre el ContextMenu ya existente
            }}
          />
        ),
      }
    ],
    []
  );

  const filteredEmpleados = useMemo(() => {
    if (!Array.isArray(empleados.data)) return [];
    return empleados.data.filter((t) =>
      t.Cedula?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [empleados.data, searchText]);

  const exportToExcel = () => {
    const dataToExport = filteredEmpleados.map((e) => ({
      Nombres: e.Nombres,
      Apellidos: e.Apellidos,
      Cédula: e.Cedula,
      FechaNacimiento: e.FechaNacimiento ? dayjs(e.FechaNacimiento).format("DD/MM/YYYY") : "",
      Sexo: e.Sexo,
      Teléfono: e.Telefono,
      Correo: e.Email,
      Nacionalidad: e.Nacionalidad,
      Dirección: e.Direccion,
      Cargo: e.CargoNombre,
      FechaContratación: e.FechaContratacion ? dayjs(e.FechaContratacion).format("DD/MM/YYYY") : "",
      Departamento: e.NombreDepartamento,
      Estado: e.NombreEstado,
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Empleados");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `empleados_${dayjs().format("YYYYMMDD_HHmmss")}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [[
        "Nombres", "Apellidos", "Cédula", "F. Nacimiento", "Sexo", "Teléfono", "Correo",
        "Nacionalidad", "Dirección", "Cargo", "F. Contratación", "Departamento", "Estado"
      ]],
      body: filteredEmpleados.map((e) => [
        e.Nombres, e.Apellidos, e.Cedula,
        e.FechaNacimiento ? dayjs(e.FechaNacimiento).format("DD/MM/YYYY") : "",
        e.Sexo, e.Telefono, e.Email, e.Nacionalidad, e.Direccion,
        e.CargoNombre, e.FechaContratacion ? dayjs(e.FechaContratacion).format("DD/MM/YYYY") : "",
        e.NombreDepartamento, e.NombreEstado
      ]),
      styles: { fontSize: 7 },
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
    });
    doc.save(`empleados_${dayjs().format("YYYYMMDD_HHmmss")}.pdf`);
  };

  const estadosOptions = (estados.data ?? []).filter(
    (estado) => estado.EstadoId === 1 || estado.EstadoId === 2
  );


  return (
    <div className="h-full">
      <Toast ref={toast} />
      <ContextMenu ref={cm} model={menuModel} onHide={() => setSelectedEmpleado(undefined)} />
      <CardTable<IEmpleado>
        title="Lista de Empleados"
        columns={columns}
        value={filteredEmpleados}
        skeletonLoading={empleados.isPending}
        onChangeSearch={debounce({ delay: 500 }, (e) => setSearchText(e.target.value))}
        renderHeadActions={[
          <Dropdown
            key="filtro_estado"
            value={estadoSeleccionadoId}
            options={estadosOptions}
            onChange={(e) => {
              setEstadoSeleccionadoId(e.value);
              setSearchText("");
            }}
            placeholder="Filtrar por estado"
            className="ml-2 w-60"
            optionLabel="NombreEstado"
            optionValue="EstadoId"
            showClear
          />,

          <Button
            key="btn_excel"
            icon={<i className="pi pi-file-excel" style={{ fontSize: '1.5rem' }} />}
            className="p-button-sm p-button-outlined p-button-success"
            aria-label="Exportar Excel"
            onClick={exportToExcel}
          />,
          <Button
            key="btn_pdf"
            icon={<i className="pi pi-file-pdf" style={{ fontSize: '1.5rem' }} />}
            className="p-button-sm p-button-outlined p-button-danger"
            aria-label="Exportar PDF" // para accesibilidad
            onClick={exportToPDF}
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
          onContextMenuSelectionChange: (e: DataTableSelectionSingleChangeEvent<IEmpleado[]>) =>
            setSelectedEmpleado(e.value),
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
        message={`¿Deseas ${accionConfirmacion === "activar" ? "activar" : "desactivar"} al empleado ${empleadoAConfirmar?.Nombres} ${empleadoAConfirmar?.Apellidos}?`}
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
