import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Chart } from "primereact/chart";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { Divider } from "primereact/divider";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  useFetchCargos,
  useFetchDepartamentos,
  useFetchEmpleadoReportes,
  useFetchEstados,
} from "ClientApp/hooks/useFetch";

const ReporteEmpleados = () => {
  const [filtros, setFiltros] = useState<any>({
    estadoId: null,
    cargoId: null,
    departamentoId: null,
    sexo: "",
  });

  const { data: estados = [] } = useFetchEstados();
  const { data: cargos = [] } = useFetchCargos();
  const { data: departamentos = [] } = useFetchDepartamentos();

  const {
    data: empleadosResponse = {},
    refetch,
    isFetching,
  } = useFetchEmpleadoReportes(filtros);

  const empleados = empleadosResponse?.Value || [];

  const sexos = [
    { label: "Todos", value: "" },
    { label: "Masculino", value: "Masculino" },
    { label: "Femenino", value: "Femenino" },
  ];

  const handleReporte = () => {
    console.log("📤 Generando reporte con filtros:", filtros);
    refetch();
  };

  const empleadosConDatos = empleados.map((e: { CargoId: number; DepartamentoId: number }) => ({
    ...e,
    Cargo: cargos.find((c) => c.CargoId === e.CargoId)?.Cargo || "No definido",
    Departamento:
      departamentos.find((d) => d.DepartamentoId === e.DepartamentoId)?.Nombre || "No definido",
  }));

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte de Empleados", 14, 20);

    doc.setFontSize(11);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 28);

    autoTable(doc, {
      startY: 35,
      head: [["Nombre", "Sexo", "Cargo", "Departamento"]],
      body: empleadosConDatos.map((e: { Nombres: string; Sexo: string; Cargo: string; Departamento: string; }) => [
        e.Nombres,
        e.Sexo,
        e.Cargo,
        e.Departamento,
      ]),
      styles: { halign: "left", fontSize: 10 },
      headStyles: { fillColor: [63, 81, 181], textColor: 255 },
      theme: "grid",
    });

    doc.save("reporte_empleados.pdf");
  };

  return (
    <div className="p-4 space-y-6">
      <Card title="Filtros de Reporte" className="shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <Dropdown
              value={filtros.estadoId}
              options={[
                { label: "Todos", value: null },
                ...estados.map((e) => ({
                  label: e.NombreEstado,
                  value: e.EstadoId,
                })),
              ]}
              onChange={(e) => setFiltros({ ...filtros, estadoId: e.value })}
              placeholder="Seleccione estado"
              className="w-full"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Cargo</label>
            <Dropdown
              value={filtros.cargoId}
              options={[
                { label: "Todos", value: null },
                ...cargos.map((c) => ({
                  label: c.Cargo,
                  value: c.CargoId,
                })),
              ]}
              onChange={(e) => setFiltros({ ...filtros, cargoId: e.value })}
              placeholder="Seleccione cargo"
              className="w-full"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Departamento</label>
            <Dropdown
              value={filtros.departamentoId}
              options={[
                { label: "Todos", value: null },
                ...departamentos.map((d) => ({
                  label: d.Nombre,
                  value: d.DepartamentoId,
                })),
              ]}
              onChange={(e) => setFiltros({ ...filtros, departamentoId: e.value })}
              placeholder="Seleccione departamento"
              className="w-full"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Sexo</label>
            <Dropdown
              value={filtros.sexo}
              options={sexos}
              onChange={(e) => setFiltros({ ...filtros, sexo: e.value })}
              placeholder="Seleccione sexo"
              className="w-full"
            />
          </div>
        </div>

        <Divider />

        <div className="flex justify-end gap-3">
          <Button
            label="Generar Reporte"
            icon="pi pi-filter"
            onClick={handleReporte}
            loading={isFetching}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600"
          />
        </div>
      </Card>

      {isFetching ? (
        <div className="flex justify-center items-center h-64">
          <ProgressSpinner />
        </div>
      ) : empleadosConDatos.length > 0 ? (
        <>
          <Card title="Resultados" className="shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Total empleados: {empleadosConDatos.length}
              </h3>
              <Button
                label="Exportar a PDF"
                icon="pi pi-file-pdf"
                severity="danger"
                onClick={exportarPDF}
                className="hover:bg-red-700"
              />
            </div>

            <DataTable
              value={empleadosConDatos}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25]}
              tableStyle={{ minWidth: "50rem" }}
              stripedRows
              showGridlines
              size="small"
            >
              <Column field="Nombres" header="Nombre" sortable />
              <Column field="Sexo" header="Sexo" sortable />
              <Column field="Cargo" header="Cargo" sortable />
              <Column field="Departamento" header="Departamento" sortable />
            </DataTable>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Distribución por Género" className="shadow-md">
              <Chart
                type="pie"
                data={{
                  labels: ["Masculino", "Femenino"],
                  datasets: [
                    {
                      data: [
                        empleadosConDatos.filter((e: { Sexo: string; }) => e.Sexo === "Masculino").length,
                        empleadosConDatos.filter((e: { Sexo: string; }) => e.Sexo === "Femenino").length,
                      ],
                      backgroundColor: ["#3B82F6", "#EC4899"],
                      hoverBackgroundColor: ["#2563EB", "#DB2777"],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                      },
                    },
                  },
                }}
              />
            </Card>

            <Card title="Resumen" className="shadow-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-blue-800 font-medium">Hombres</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {empleadosConDatos.filter((e: { Sexo: string; }) => e.Sexo === "Masculino").length}
                  </p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
                  <h4 className="text-pink-800 font-medium">Mujeres</h4>
                  <p className="text-2xl font-bold text-pink-600">
                    {empleadosConDatos.filter((e: { Sexo: string; }) => e.Sexo === "Femenino").length}
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <h4 className="text-indigo-800 font-medium">Departamentos</h4>
                  <p className="text-2xl font-bold text-indigo-600">
                    {[...new Set(empleadosConDatos.map((e: { Departamento: any; }) => e.Departamento))].length}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h4 className="text-purple-800 font-medium">Cargos</h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {[...new Set(empleadosConDatos.map((e: { Cargo: any; }) => e.Cargo))].length}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </>
      ) : (
        <Card className="shadow-md">
          <div className="text-center py-8">
            <i className="pi pi-info-circle text-4xl text-blue-500 mb-3" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No hay datos para mostrar
            </h3>
            <p className="text-gray-500">
              Ajusta los filtros y genera un nuevo reporte
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReporteEmpleados;