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
    useFetchEspecies,
} from "ClientApp/hooks/useFetch";
import dayjs from "dayjs";

const ReporteAnimales = () => {
    const [filtros, setFiltros] = useState<any>({
        especieId: null,
        sexo: "",
    });

    const { data: especies = [] } = useFetchEspecies();

    const {
        data: animalesResponse = {},
        refetch,
        isFetching,
    } = useFetchAnimalReportes(filtros);

    const animales = animalesResponse?.Value || [];

    const sexos = [
        { label: "Todos", value: "" },
        { label: "Macho", value: "Macho" },
        { label: "Hembra", value: "Hembra" },
    ];

    const handleReporte = () => {
        console.log("📤 Generando reporte con filtros:", filtros);
        refetch();
    };

    const animalesConDatos = animales.map((e: { EspecieId: number }) => ({
        ...e,
        Especie: especies.find((c) => c.EspecieId === e.EspecieId)?.NombreComun || "No definido",
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
        doc.text("REPORTE DE ANIMALES", doc.internal.pageSize.getWidth() / 2, 20, {
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
        if (filtros.especieId) {
            const especie = especies.find(e => e.EspecieId === filtros.especieId);
            filtersText += `Especie: ${especie?.NombreComun || ''} | `;
        }
        if (filtros.sexo) {
            filtersText += `Sexo: ${filtros.sexo} | `;
        }

        if (filtersText === "Filtros aplicados: ") {
            filtersText += "Ninguno (Todos los animales) | ";
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
        const totalAnimales = animalesConDatos.length;
        const hombres = animalesConDatos.filter((e: { Sexo: string; }) => e.Sexo === "Macho").length;
        const mujeres = animalesConDatos.filter((e: { Sexo: string; }) => e.Sexo === "Hembra").length;
        const numEspecies = [...new Set(animalesConDatos.map((e: { Especie: any; }) => e.Especie))].length;

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
        doc.text(`Total animales: ${totalAnimales}`, 25, summaryY + 5);

        // Hombres
        doc.setFillColor(230, 240, 255);
        doc.roundedRect(20 + colWidth, summaryY, colWidth, 8, 2, 2, "F");
        doc.text(`Machos: ${hombres} (${Math.round((hombres / totalAnimales) * 100)}%)`, 25 + colWidth, summaryY + 5);

        // Hembras
        doc.setFillColor(255, 230, 240);
        doc.roundedRect(20 + colWidth * 2, summaryY, colWidth, 8, 2, 2, "F");
        doc.text(`Hembras: ${mujeres} (${Math.round((mujeres / totalAnimales) * 100)}%)`, 25 + colWidth * 2, summaryY + 5);
        // Especies
        // Tabla de datos
        autoTable(doc, {
            startY: 70,
            head: [[
                "Codigo", "Indentificador", "Alias", "Especie", "Sexo", "Fecha de nacimiento", "Padre", "Madre",
            ]],
            body: animalesConDatos.map((e: {
                IdentificadorUnico: string;
                TipoIdentificador: string;
                Alias: string;
                Especie: string;
                Sexo: string;
                FechaNacimiento: string;
                Padre: string;
                Madre: string;
            }) => [
                    e.IdentificadorUnico,
                    e.TipoIdentificador,
                    e.Alias,
                    e.Especie,
                    e.Sexo,
                    dayjs(e.FechaNacimiento).format("DD/MM/YYYY"),
                    e.Padre,
                    e.Madre,
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
        doc.save(`Reporte_Animales_${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    return (
        <div className="p-4 space-y-6">
            <Card title="Filtros de Reporte" className="shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Especie</label>
                        <Dropdown
                            value={filtros.especieId}
                            options={[
                                { label: "Todos", value: null },
                                ...especies.map((e) => ({
                                    label: e.NombreComun,
                                    value: e.EspecieId,
                                })),
                            ]}
                            onChange={(e) => setFiltros({ ...filtros, especieId: e.value })}
                            placeholder="Seleccione especie"
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
            ) : animalesConDatos.length > 0 ? (
                <>
                    <Card title="Resultados" className="shadow-md mt-2">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                Total animales: {animalesConDatos.length}
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
                            value={animalesConDatos}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 25]}
                            tableStyle={{ minWidth: "50rem" }}
                            stripedRows
                            showGridlines
                            size="small"
                        >

                            <Column field="IdentificadorUnico" header="Código" sortable />
                            <Column field="TipoIdentificador" header="Identificador" sortable />
                            <Column field="Alias" header="Alias" sortable />
                            <Column field="NombreComun" header="Especie" sortable />
                            <Column field="Sexo" header="Sexo" sortable />
                            <Column
                                field="FechaNacimiento"
                                header="Fecha Nacimiento"
                                sortable
                                body={(rowData) => dayjs(rowData.FechaNacimiento).format("DD/MM/YYYY")}
                            />

                            <Column field="Padre" header="Padre" sortable />
                            <Column field="Madre" header="Madre" sortable />

                        </DataTable>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card title="Distribución por Género" className="shadow-md mt-4">
                            <Chart
                                type="pie"
                                data={{
                                    labels: ["Macho", "Hembra"],
                                    datasets: [
                                        {
                                            data: [
                                                animalesConDatos.filter((e: { Sexo: string; }) => e.Sexo === "Macho").length,
                                                animalesConDatos.filter((e: { Sexo: string; }) => e.Sexo === "Hembra").length,
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
                                    <h4 className="text-blue-800 font-medium">Machos</h4>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {animalesConDatos.filter((e: { Sexo: string; }) => e.Sexo === "Macho").length}
                                    </p>
                                </div>
                                <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
                                    <h4 className="text-pink-800 font-medium">Hembras </h4>
                                    <p className="text-2xl font-bold text-pink-600">
                                        {animalesConDatos.filter((e: { Sexo: string; }) => e.Sexo === "Hembra").length}
                                    </p>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                                    <h4 className="text-indigo-800 font-medium">Departamentos</h4>
                                    <p className="text-2xl font-bold text-indigo-600">
                                        {[...new Set(animalesConDatos.map((e: { Departamento: any; }) => e.Departamento))].length}
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                    <h4 className="text-purple-800 font-medium">Cargos</h4>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {[...new Set(animalesConDatos.map((e: { Cargo: any; }) => e.Cargo))].length}
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

export default ReporteAnimales;