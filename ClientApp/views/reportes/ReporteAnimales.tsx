import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
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
    const { refetch, isFetching } = useFetchAnimalReportes(filtros);

    const sexos = [
        { label: "Todos", value: "" },
        { label: "Macho", value: "Macho" },
        { label: "Hembra", value: "Hembra" },
    ];

    const exportarPDF = async (animalesConDatos: any[]) => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
        });

        // Colores institucionales
        const primaryColor: [number, number, number] = [0, 82, 155]; // Azul institucional
        const secondaryColor: [number, number, number] = [0, 102, 71]; // Verde institucional
        const lightGray: [number, number, number] = [245, 245, 245];
        const darkGray: [number, number, number] = [51, 51, 51];

        // Cargar imágenes (logo y sello)
        const toBase64 = async (url: string): Promise<string> => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
            });
        };

        const logoUrl = "https://res.cloudinary.com/dlbb3qssp/image/upload/v1750984362/logo3-removebg-preview_l3k6et.png";
        const selloUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Official_seal.svg/1200px-Official_seal.svg.png";

        const [logoBase64, selloBase64] = await Promise.all([
            toBase64(logoUrl),
            toBase64(selloUrl)
        ]);

        // Fondo timbrado (marca de agua)
        doc.setFillColor(230, 230, 230);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

        // Patrón de fondo sutil
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.2);
        for (let i = 0; i < doc.internal.pageSize.getWidth(); i += 20) {
            doc.line(i, 0, i, doc.internal.pageSize.getHeight());
        }
        for (let i = 0; i < doc.internal.pageSize.getHeight(); i += 20) {
            doc.line(0, i, doc.internal.pageSize.getWidth(), i);
        }

        // Marco decorativo
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(1.5);
        doc.rect(10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);

        // Encabezado institucional
        doc.addImage(logoBase64, "PNG", 15, 12, 25, 25);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text("ZOOLOGICO DE SANTO DOMINGO", doc.internal.pageSize.getWidth() / 2, 20, {
            align: "center",
        });

        doc.setFontSize(12);
        doc.text("DIRECCIÓN DE BIODIVERSIDAD Y CONSERVACIÓN", doc.internal.pageSize.getWidth() / 2, 26, {
            align: "center",
        });

        doc.setFontSize(16);
        doc.setTextColor(...secondaryColor);
        doc.text("REPORTE OFICIAL DE ANIMALES", doc.internal.pageSize.getWidth() / 2, 34, {
            align: "center",
        });

        // Línea decorativa
        doc.setDrawColor(...secondaryColor);
        doc.setLineWidth(0.8);
        doc.line(doc.internal.pageSize.getWidth() / 2 - 60, 36, doc.internal.pageSize.getWidth() / 2 + 60, 36);

        // Información del reporte
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...darkGray);
        doc.text(`Fecha de generación: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 15, 45);
        doc.text(`Documento: RPT-ANML-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`, doc.internal.pageSize.getWidth() - 15, 45, { align: "right" });

        // Filtros aplicados
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        let filtersText = "Filtros aplicados: ";
        if (filtros.especieId) {
            const especie = especies.find((e) => e.EspecieId === filtros.especieId);
            filtersText += `Especie: ${especie?.NombreComun || ""} | `;
        }
        if (filtros.sexo) filtersText += `Sexo: ${filtros.sexo} | `;
        if (filtersText === "Filtros aplicados: ") {
            filtersText += "Ninguno (Todos los animales)";
        } else {
            filtersText = filtersText.slice(0, -3);
        }
        doc.text(filtersText, 15, 50, {
            maxWidth: doc.internal.pageSize.getWidth() - 30,
        });

        // Resumen estadístico
        const totalAnimales = animalesConDatos.length;
        const machos = animalesConDatos.filter((e) => e.Sexo === "Macho").length;
        const hembras = animalesConDatos.filter((e) => e.Sexo === "Hembra").length;

        doc.setFillColor(...lightGray);
        doc.rect(15, 55, doc.internal.pageSize.getWidth() - 30, 8, "F");

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text("RESUMEN ESTADÍSTICO", 20, 60);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(...darkGray);

        const summaryY = 65;
        const colWidth = (doc.internal.pageSize.getWidth() - 40) / 4;

        // Cajas de resumen con estilo mejorado
        const drawSummaryBox = (x: number, text: string, color: [number, number, number]) => {
            doc.setFillColor(color[0], color[1], color[2]);
            doc.roundedRect(x, summaryY, colWidth - 5, 8, 2, 2, "F");
            doc.setTextColor(255, 255, 255);
            doc.text(text, x + 5, summaryY + 5);
        };

        drawSummaryBox(20, `Total animales: ${totalAnimales}`, [0, 82, 155]);
        drawSummaryBox(20 + colWidth, `Machos: ${machos}`, [0, 102, 71]);
        drawSummaryBox(20 + colWidth * 2, `Hembras: ${hembras}`, [155, 82, 0]);
        drawSummaryBox(20 + colWidth * 3, `Generado por: Zoologic`, [102, 0, 71]);

        // Tabla principal
        autoTable(doc, {
            startY: 80,
            head: [
                [
                    { content: "Código", styles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' } },
                    { content: "Identificador", styles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' } },
                    { content: "Alias", styles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' } },
                    { content: "Especie", styles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' } },
                    { content: "Sexo", styles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' } },
                    { content: "Fecha de nacimiento", styles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' } },
                    { content: "Padre", styles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' } },
                    { content: "Madre", styles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' } },
                ],
            ],
            body: animalesConDatos.map((e: any) => [
                { content: e.IdentificadorUnico, styles: { fontStyle: 'bold' } },
                e.TipoIdentificador,
                e.Alias,
                e.Especie,
                { content: e.Sexo, styles: { textColor: e.Sexo === 'Macho' ? [0, 82, 155] : [155, 0, 82] } },
                e.FechaNacimiento ? dayjs(e.FechaNacimiento).format("DD/MM/YYYY") : "Desconocida",
                e.Padre || "Desconocido",
                e.Madre || "Desconocida",
            ]),
            styles: {
                fontSize: 8,
                cellPadding: 3,
                overflow: "linebreak",
                halign: "left",
                lineColor: [200, 200, 200],
                lineWidth: 0.1,
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },
            columnStyles: {
                0: { cellWidth: 25, fontStyle: 'bold' },
                1: { cellWidth: 25 },
                2: { cellWidth: 20 },
                3: { cellWidth: 30 },
                4: { cellWidth: 15, halign: 'center' },
                5: { cellWidth: 25, halign: 'center' },
                6: { cellWidth: 25 },
                7: { cellWidth: 25 },
            },
            margin: { top: 80 },
            theme: "grid",
            tableLineColor: [200, 200, 200],
            tableLineWidth: 0.1,
            didDrawPage: (data) => {
                // Pie de página en cada hoja

                // Primero dibujamos la línea azul
                doc.setDrawColor(...primaryColor);
                doc.setLineWidth(0.5);
                doc.line(
                    15,
                    doc.internal.pageSize.getHeight() - 18,  // Movemos la línea un poco más abajo
                    doc.internal.pageSize.getWidth() - 15,
                    doc.internal.pageSize.getHeight() - 18
                );

                // Luego el texto del número de página (más arriba)
                doc.setFontSize(8);
                doc.setTextColor(100, 100, 100);
                doc.text(
                    `Página ${data.pageNumber} de ${data.pageCount ?? 'N'}`,
                    doc.internal.pageSize.getWidth() / 2,
                    doc.internal.pageSize.getHeight() - 22,  // Posición más arriba
                    { align: "center" }
                );

                // Texto "Documento oficial" (más arriba y con ajuste de posición)
                doc.text(
                    "Documento oficial - Zoologico de Santo Domingo © 2023",
                    doc.internal.pageSize.getWidth() - 15,
                    doc.internal.pageSize.getHeight() - 22,  // Posición más arriba
                    { align: "right" }
                );

                // Texto "Sello digital oficial" (si lo mantienes)
                doc.text(
                    "Sello digital oficial",
                    doc.internal.pageSize.getWidth() - 35,
                    doc.internal.pageSize.getHeight() - 15,
                    { align: "center" }
                );
            }
        });

        // Sello húmedo en la última página
        doc.setPage(doc.getNumberOfPages());
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Sello digital oficial", doc.internal.pageSize.getWidth() - 35, doc.internal.pageSize.getHeight() - 15, { align: "center" });

        doc.save(`Reporte_Oficial_Animales_${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    const handleReporte = async () => {
        try {
            const { data } = await refetch();
            const animales = data?.Value || [];

            const animalesConDatos = animales.map((e: { EspecieId: number }) => ({
                ...e,
                Especie:
                    especies.find((c) => c.EspecieId === e.EspecieId)?.NombreComun ||
                    "No definido",
            }));

            await exportarPDF(animalesConDatos);
        } catch (err) {
            console.error("Error generando el reporte:", err);
        }
    };

    return (
        <div className="p-4 space-y-6">
            <Card
                title="Generador de Reporte Oficial"
                className="shadow-lg border-t-4 border-blue-600"
                header={
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                        <h2 className="text-xl font-bold">Reporte de Animales</h2>
                        <p className="text-sm opacity-80">Sistema de Gestión Zoológica</p>
                    </div>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Especie
                        </label>
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
                            filter
                            showClear
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Sexo
                        </label>
                        <Dropdown
                            value={filtros.sexo}
                            options={sexos}
                            onChange={(e) => setFiltros({ ...filtros, sexo: e.value })}
                            placeholder="Seleccione sexo"
                            className="w-full"
                            showClear
                        />
                    </div>
                </div>

                <Divider className="my-4" />

                <div className="flex justify-end gap-3">
                    <Button
                        label="Generar Reporte Oficial"
                        icon="pi pi-file-pdf"
                        onClick={handleReporte}
                        loading={isFetching}
                        className="bg-blue-600 hover:bg-blue-700 border-blue-600"
                        severity="info"
                        size="large"
                    />
                </div>
            </Card>
        </div>
    );
};

export default ReporteAnimales;