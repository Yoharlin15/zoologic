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

  const exportarPDF = async () => {
    // Configuración inicial del documento
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm"
    });

    // Colores corporativos (puedes ajustarlos)
    const primaryColor: [number, number, number] = [63, 81, 181]; // Azul oscuro
    const secondaryColor: [number, number, number] = [255, 193, 7]; // Amarillo
    const lightGray: [number, number, number] = [245, 245, 245];
    const darkGray: [number, number, number] = [33, 33, 33];

    // Logo
    const logoUrl = "https://res.cloudinary.com/dlbb3qssp/image/upload/v1741974209/Captura_de_pantalla_2025-03-14_133841-removebg-preview_ibdy4g.png";

    // Función para convertir imagen a base64
    const toBase64 = async (url: string): Promise<string> => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    };

    const logoBase64 = await toBase64(logoUrl);

    // Encabezado del reporte
    doc.addImage(logoBase64, "PNG", 15, 5, 30, 30);

    // Título principal
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...(primaryColor as [number, number, number]));
    doc.text("REPORTE DE EMPLEADOS", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center"
    });

    // Subtítulo
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkGray);
    doc.text("Zoologic - Sistema de Gestión de Personal", doc.internal.pageSize.getWidth() / 2, 26, {
      align: "center"
    });

    // Fecha y filtros aplicados
    doc.setFontSize(8);
    doc.text(`Generado el: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 15, 35);

    // Información de filtros
    let filtersText = "Filtros aplicados: ";
    if (filtros.estadoId) {
      const estado = estados.find(e => e.EstadoId === filtros.estadoId);
      filtersText += `Estado: ${estado?.NombreEstado || ''} | `;
    }
    if (filtros.cargoId) {
      const cargo = cargos.find(c => c.CargoId === filtros.cargoId);
      filtersText += `Cargo: ${cargo?.Cargo || ''} | `;
    }
    if (filtros.departamentoId) {
      const depto = departamentos.find(d => d.DepartamentoId === filtros.departamentoId);
      filtersText += `Departamento: ${depto?.Nombre || ''} | `;
    }
    if (filtros.sexo) {
      filtersText += `Sexo: ${filtros.sexo} | `;
    }

    if (filtersText === "Filtros aplicados: ") {
      filtersText += "Ninguno (Todos los empleados)";
    } else {
      filtersText = filtersText.slice(0, -3); // Eliminar el último " | "
    }

    // Añadir texto de filtros con formato
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(filtersText, 15, 40, {
      maxWidth: doc.internal.pageSize.getWidth() - 30
    });

    // Resumen estadístico
    const totalEmpleados = empleadosConDatos.length;
    const hombres = empleadosConDatos.filter((e: { Sexo: string; }) => e.Sexo === "Masculino").length;
    const mujeres = empleadosConDatos.filter((e: { Sexo: string; }) => e.Sexo === "Femenino").length;
    const numDepartamentos = [...new Set(empleadosConDatos.map((e: { Departamento: any; }) => e.Departamento))].length;
    const numCargos = [...new Set(empleadosConDatos.map((e: { Cargo: any; }) => e.Cargo))].length;

    // Cuadro de resumen
    doc.setFillColor(...lightGray);
    doc.rect(15, 45, doc.internal.pageSize.getWidth() - 30, 10, "F");

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("RESUMEN ESTADÍSTICO", 20, 51);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...darkGray);

    const summaryY = 56;
    const colWidth = (doc.internal.pageSize.getWidth() - 40) / 4;

    // Total empleados
    doc.setFillColor(230, 230, 250);
    doc.roundedRect(20, summaryY, colWidth, 8, 2, 2, "F");
    doc.text(`Total empleados: ${totalEmpleados}`, 25, summaryY + 5);

    // Hombres
    doc.setFillColor(230, 240, 255);
    doc.roundedRect(20 + colWidth, summaryY, colWidth, 8, 2, 2, "F");
    doc.text(`Hombres: ${hombres} (${Math.round((hombres / totalEmpleados) * 100)}%)`, 25 + colWidth, summaryY + 5);

    // Mujeres
    doc.setFillColor(255, 230, 240);
    doc.roundedRect(20 + colWidth * 2, summaryY, colWidth, 8, 2, 2, "F");
    doc.text(`Mujeres: ${mujeres} (${Math.round((mujeres / totalEmpleados) * 100)}%)`, 25 + colWidth * 2, summaryY + 5);

    // Departamentos
    doc.setFillColor(230, 255, 240);
    doc.roundedRect(20 + colWidth * 3, summaryY, colWidth, 8, 2, 2, "F");
    doc.text(`Departamentos: ${numDepartamentos} | Cargos: ${numCargos}`, 25 + colWidth * 3, summaryY + 5);

    // Tabla de datos
    autoTable(doc, {
      startY: 70,
      head: [[
        "Nombre", "Apellidos", "Cédula", "FechaNacimiento", "Sexo", "Telefono", "Nacionalidad", "Direccion",
        "Cargo", "Contratación", "Departamento", "Estado", "Email"
      ]],
      body: empleadosConDatos.map((e: {
        Nombres: string;
        Apellidos: string;
        Cedula: string;
        FechaNacimiento: string;
        Sexo: string;
        Telefono: string;
        Nacionalidad: string;
        Direccion: string;
        Cargo: string;
        Departamento: string;
        NombreEstado: string;
        FechaContratacion: string;
        Email: string;
      }) => [
        e.Nombres,
        e.Apellidos,
        e.Cedula,
        e.FechaNacimiento,
        e.Sexo,
        e.Telefono,
        e.Nacionalidad,
        e.Direccion,
        e.Cargo,
        e.Departamento,
        e.NombreEstado,
        e.FechaContratacion,
        e.Email
      ]),
      styles: {
        fontSize: 7,
        cellPadding: 2,
        overflow: "linebreak",
        halign: "left"
      },
      headStyles: {
        fillColor: primaryColor,
        textColor: 255,
        fontStyle: "bold",
        fontSize: 8
      },
      alternateRowStyles: {
        fillColor: lightGray
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Nombre
        1: { cellWidth: 25 }, // Apellidos
        2: { cellWidth: 20 }, // Cédula
        3: { cellWidth: 12 }, // Sexo
        4: { cellWidth: 25 }, // Cargo
        5: { cellWidth: 25 }, // Departamento
        6: { cellWidth: 20 }, // Estado
        7: { cellWidth: 20 }  // Contratación
      },
      margin: { top: 70 },
      theme: "grid",
      tableLineColor: [200, 200, 200],
      tableLineWidth: 0.1
    });

    // Pie de página
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      // Línea decorativa
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.5);
      doc.line(15, doc.internal.pageSize.getHeight() - 15, doc.internal.pageSize.getWidth() - 15, doc.internal.pageSize.getHeight() - 15);

      // Texto del pie
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, {
        align: "center"
      });

      doc.text("© Zoologic - Sistema de Gestión de Personal", doc.internal.pageSize.getWidth() - 15, doc.internal.pageSize.getHeight() - 10, {
        align: "right"
      });
    }

    // Guardar el documento
    doc.save(`Reporte_Empleados_${new Date().toISOString().slice(0, 10)}.pdf`);
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
          <Card title="Resultados" className="shadow-md mt-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Total empleados: {empleadosConDatos.length}
              </h3>
              <Button
                label="Exportar a PDF"
                icon="pi pi-file-pdf"
                severity="danger"
                onClick={exportarPDF}
                className="hover:bg-red-700 ml-2"
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
              <Column field="Nombres" header="Nombres" sortable className="min-w-[18rem]" />
              <Column field="Apellidos" header="Apellidos" sortable className="min-w-[10rem]" />
              <Column field="Cedula" header="Cédula" sortable className="min-w-[10rem]" />
              <Column field="FechaNacimiento" header="Fecha Nacimiento" sortable className="min-w-[10rem]" />
              <Column field="Sexo" header="Sexo" sortable className="min-w-[10rem]" />
              <Column field="Telefono" header="Teléfono" sortable className="min-w-[10rem]" />
              <Column field="Email" header="Email" sortable className="min-w-[10rem]" />
              <Column field="Nacionalidad" header="Nacionalidad" sortable className="min-w-[10rem]" />
              <Column field="Direccion" header="Dirección" sortable className="min-w-[10rem]" />
              <Column field="Cargo" header="Cargo" sortable className="min-w-[10rem]" />
              <Column field="FechaContratacion" header="Fecha Contratación" sortable className="min-w-[10rem]" />
              <Column field="Departamento" header="Departamento" sortable className="min-w-[10rem]" />
              <Column field="NombreEstado" header="Estado" sortable className="min-w-[10rem]" />
            </DataTable>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card title="Distribución por Género" className="shadow-md mt-4">
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

            <Card title="Resumen" className="shadow-md mt-4">
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