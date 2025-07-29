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
    useFetchAnimalReportes,
    useFetchEstados,
    useFetchHabitatReportes,
} from "ClientApp/hooks/useFetch";
import dayjs from "dayjs";

const ReporteHabitats = () => {
    const [filtros, setFiltros] = useState<any>({
        especieId: null,
        sexo: "",
    });

    const { data: estados = [] } = useFetchEstados();

    const {
        data: habitatsResponse = {},
        refetch,
        isFetching,
    } = useFetchHabitatReportes(filtros);

    const habitats = habitatsResponse?.Value || [];

    const handleReporte = () => {
        console.log("📤 Generando reporte con filtros:", filtros);
        refetch();
    };

    const habitatsConDatos = habitats.map((e: { EstadoId: number }) => ({
        ...e,
        Estado: estados.find((c) => c.EstadoId === e.EstadoId)?.NombreEstado || "No definido",
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
        const logoUrl = "https://res.cloudinary.com/dlbb3qssp/image/upload/v1750984362/logo3-removebg-preview_l3k6et.png";

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
        doc.addImage(logoBase64, "PNG", 15, 4, 25, 25);

        // Título principal
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...(primaryColor as [number, number, number]));
        doc.text("REPORTE DE HABITATS", doc.internal.pageSize.getWidth() / 2, 20, {
            align: "center"
        });

        // Subtítulo
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...darkGray);
        doc.text("Zoologic - Sistema de Gestión de zoologico de Santo Domingo", doc.internal.pageSize.getWidth() / 2, 26, {
            align: "center"
        });

        // Fecha y filtros aplicados
        doc.setFontSize(9);
        doc.text(`Generado el: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 15, 35);

        // Información de filtros
        let filtersText = "Filtros aplicados: ";
        if (filtros.estadoId) {
            const estado = estados.find(e => e.EstadoId === filtros.estadoId);
            filtersText += `Estado: ${estado?.NombreEstado || ''} | `;
        }

        if (filtersText === "Filtros aplicados: ") {
            filtersText += "Ninguno (Todos los habitats) | ";
        } else {
            filtersText = filtersText.slice(0, -3); // Eliminar el último " | "
        }

        // Añadir texto de filtros con formato
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(filtersText, 15, 40, {
            maxWidth: doc.internal.pageSize.getWidth() - 30
        });

        // Resumen estadístico
        const total = habitatsConDatos.length;
        const numHabitats = [...new Set(habitatsConDatos.map((e: { Habitat: any; }) => e.Habitat))].length;

        // Cuadro de resumen
        doc.setFillColor(...lightGray);
        doc.rect(15, 45, doc.internal.pageSize.getWidth() - 30, 10, "F");

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text("RESUMEN ESTADÍSTICO", 20, 51);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(...darkGray);

        const summaryY = 56;
        const colWidth = (doc.internal.pageSize.getWidth() - 40) / 4;

        // Total animales
        doc.setFillColor(230, 230, 250);
        doc.roundedRect(20, summaryY, colWidth, 8, 2, 2, "F");
        doc.text(`Total habitats: ${total}`, 25, summaryY + 5);

        // Tabla de datos
        autoTable(doc, {
            startY: 70,
            head: [[
                "Habitat", "Cantidad maxima de animales", "Estado", "Especie", "Sexo", "Fecha de nacimiento", "Padre", "Madre",
            ]],
            body: habitatsConDatos.map((e: {
                Nombre: string;
                CantidadMaxima: number;
                Estado: string;
                Descripcion: string;
            }) => [
                    e.Nombre,
                    e.CantidadMaxima,
                    e.Estado,
                    e.Descripcion,
                ]),
            styles: {
                fontSize: 8,
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
                0: { cellWidth: 25 },
                1: { cellWidth: 25 },
                2: { cellWidth: 20 },
                3: { cellWidth: 30 },
                4: { cellWidth: 25 },
                5: { cellWidth: 40 },
                6: { cellWidth: 25 },
                7: { cellWidth: 20 }
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
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, {
                align: "center"
            });

            doc.text("© Zoologic - Sistema de Gestión del zoologico de Santo Domingo ", doc.internal.pageSize.getWidth() - 15, doc.internal.pageSize.getHeight() - 10, {
                align: "right"
            });
        }

        // Guardar el documento
        doc.save(`Reporte_habitats_${new Date().toISOString().slice(0, 10)}.pdf`);
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
            ) : habitatsConDatos.length > 0 ? (
                <>
                    <Card title="Resultados" className="shadow-md mt-2">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                Total hábitats: {habitatsConDatos.length}
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
                            value={habitatsConDatos}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 25]}
                            tableStyle={{ minWidth: "50rem" }}
                            stripedRows
                            showGridlines
                            size="small"
                        >
                            <Column field="Nombre" header="Nombre" sortable />
                            <Column field="CantidadAnimales" header="Cantidad maxima de animales" sortable />
                            <Column field="Estado" header="NombreEstado" sortable />
                            <Column field="Descripcion" header="Descripcion" sortable />
                        </DataTable>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card title="Resumen" className="shadow-md mt-4">
                            <div className="grid grid-cols-2 gap-4">
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

export default ReporteHabitats;