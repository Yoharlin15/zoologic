import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
    useFetchAnimalReportes,
    useFetchEspecies,
} from "ClientApp/hooks/useFetch";
import dayjs from "dayjs";

const ReporteAnimales = () => {
    const [filtros, setFiltros] = useState<any>({ especieId: null, sexo: "" });
    const { data: especies = [] } = useFetchEspecies();
    const { refetch, isFetching } = useFetchAnimalReportes(filtros);

    // Fallback preview si el navegador bloquea la pestaña nueva
    const [previewVisible, setPreviewVisible] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        };
    }, [pdfUrl]);

    const sexos = [
        { label: "Todos", value: "" },
        { label: "Macho", value: "Macho" },
        { label: "Hembra", value: "Hembra" },
    ];

    const exportarPDFyMostrarPrint = async (animalesConDatos: any[]) => {
        const doc = new jsPDF({ orientation: "landscape", unit: "mm" });

        // Colores
        const primaryColor: [number, number, number] = [0, 82, 155];
        const secondaryColor: [number, number, number] = [0, 102, 71];
        const lightGray: [number, number, number] = [245, 245, 245];
        const darkGray: [number, number, number] = [51, 51, 51];

        // Logo
        const toBase64 = async (url: string): Promise<string> => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
            });
        };
        const logoUrl = "https://res.cloudinary.com/dlbb3qssp/image/upload/v1742419070/zoodom_atpfei.png";
        const [logoBase64] = await Promise.all([toBase64(logoUrl)]);

        // Fondo
        doc.setFillColor(230, 230, 230);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.2);
        for (let i = 0; i < doc.internal.pageSize.getWidth(); i += 20) {
            doc.line(i, 0, i, doc.internal.pageSize.getHeight());
        }
        for (let i = 0; i < doc.internal.pageSize.getHeight(); i += 20) {
            doc.line(0, i, doc.internal.pageSize.getWidth(), i);
        }

        // Marco
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(1.5);
        doc.rect(10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);

        // Obtiene el tamaño real (px) de una dataURL para conservar proporciones
        const getImageSizeFromDataUrl = (dataUrl: string): Promise<{ w: number; h: number }> =>
            new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve({ w: img.width, h: img.height });
                img.crossOrigin = "anonymous";
                img.src = dataUrl;
            });

        // Encabezado
        // Mantener proporción del logo
        const { w: logoPxW, h: logoPxH } = await getImageSizeFromDataUrl(logoBase64);
        const logoWidthMM = 40; // ajusta a gusto (mm)
        const logoHeightMM = logoWidthMM * (logoPxH / logoPxW);
        // Posición recomendada
        const logoX = 18;
        const logoY = 15;

        doc.addImage(logoBase64, "PNG", logoX, logoY, logoWidthMM, logoHeightMM);

        const headerCenterX = doc.internal.pageSize.getWidth() / 2;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(...primaryColor);
        doc.text("PARQUE ZOOLÓGICO NACIONAL (ZOODOM)", headerCenterX, 18, { align: "center" });
        doc.setFontSize(11);
        doc.setTextColor(...secondaryColor);
        doc.text("DIRECCIÓN DE BIODIVERSIDAD Y CONSERVACIÓN", headerCenterX, 24, { align: "center" });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(...darkGray);
        doc.text(
            "Dirección: Avenida La Vega Real, Arroyo Hondo, Distrito Nacional, República Dominicana.",
            headerCenterX,
            30,
            { align: "center", maxWidth: doc.internal.pageSize.getWidth() - 40 }
        );
        doc.text("Tel.: 809-378-2149", headerCenterX, 35, { align: "center" });
        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);
        doc.setTextColor(...secondaryColor);
        doc.text("REPORTE OFICIAL DE ANIMALES", headerCenterX, 42, { align: "center" });
        doc.setDrawColor(...secondaryColor);
        doc.setLineWidth(0.8);
        doc.line(headerCenterX - 60, 44, headerCenterX + 60, 44);

        // Info reporte
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(...darkGray);
        doc.text(`Fecha de generación: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 15, 52);
        doc.text(
            `Documento: RPT-ANML-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0")}`,
            doc.internal.pageSize.getWidth() - 15,
            52,
            { align: "right" }
        );

        // Filtros
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        let filtersText = "Filtros aplicados: ";
        if (filtros.especieId) {
            const especie = especies.find((e) => e.EspecieId === filtros.especieId);
            filtersText += `Especie: ${especie?.NombreComun || ""} | `;
        }
        if (filtros.sexo) filtersText += `Sexo: ${filtros.sexo} | `;
        doc.text(
            filtersText === "Filtros aplicados: " ? filtersText + "Ninguno (Todos los animales)" : filtersText.slice(0, -3),
            15,
            58,
            { maxWidth: doc.internal.pageSize.getWidth() - 30 }
        );

        // Resumen
        const totalAnimales = animalesConDatos.length;
        const machos = animalesConDatos.filter((e) => e.Sexo === "Macho").length;
        const hembras = animalesConDatos.filter((e) => e.Sexo === "Hembra").length;
        doc.setFillColor(...lightGray);
        doc.rect(15, 63, doc.internal.pageSize.getWidth() - 30, 8, "F");
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text("RESUMEN ESTADÍSTICO", 20, 68);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(...darkGray);
        const summaryY = 73;
        const colWidth = (doc.internal.pageSize.getWidth() - 40) / 4;
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

        // Tabla
        autoTable(doc, {
            startY: 88,
            head: [[
                { content: "Código", styles: { fillColor: primaryColor, textColor: 255, fontStyle: "bold" } },
                { content: "Identificador", styles: { fillColor: primaryColor, textColor: 255, fontStyle: "bold" } },
                { content: "Alias", styles: { fillColor: primaryColor, textColor: 255, fontStyle: "bold" } },
                { content: "Especie", styles: { fillColor: primaryColor, textColor: 255, fontStyle: "bold" } },
                { content: "Sexo", styles: { fillColor: primaryColor, textColor: 255, fontStyle: "bold" } },
                { content: "Fecha de nacimiento", styles: { fillColor: primaryColor, textColor: 255, fontStyle: "bold" } },
                { content: "Padre", styles: { fillColor: primaryColor, textColor: 255, fontStyle: "bold" } },
                { content: "Madre", styles: { fillColor: primaryColor, textColor: 255, fontStyle: "bold" } },
            ]],
            body: animalesConDatos.map((e: any) => [
                { content: e.IdentificadorUnico, styles: { fontStyle: "bold" } },
                e.TipoIdentificador,
                e.Alias,
                e.Especie,
                { content: e.Sexo, styles: { textColor: e.Sexo === "Macho" ? [0, 82, 155] : [155, 0, 82] } },
                e.FechaNacimiento ? dayjs(e.FechaNacimiento).format("DD/MM/YYYY") : "Desconocida",
                e.Padre || "Desconocido",
                e.Madre || "Desconocida",
            ]),
            styles: { fontSize: 8, cellPadding: 3, overflow: "linebreak", halign: "left", lineColor: [200, 200, 200], lineWidth: 0.1 },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            columnStyles: {
                0: { cellWidth: 25, fontStyle: "bold" },
                1: { cellWidth: 25 },
                2: { cellWidth: 20 },
                3: { cellWidth: 30 },
                4: { cellWidth: 15, halign: "center" },
                5: { cellWidth: 25, halign: "center" },
                6: { cellWidth: 25 },
                7: { cellWidth: 25 },
            },
            margin: { top: 88 },
            theme: "grid",
            tableLineColor: [200, 200, 200],
            tableLineWidth: 0.1,
            didDrawPage: (data) => {
                // Pie
                doc.setDrawColor(...primaryColor);
                doc.setLineWidth(0.5);
                doc.line(15, doc.internal.pageSize.getHeight() - 18, doc.internal.pageSize.getWidth() - 15, doc.internal.pageSize.getHeight() - 18);
                doc.setFontSize(8);
                doc.setTextColor(100, 100, 100);
                doc.text(`Página ${data.pageNumber} de ${doc.getNumberOfPages()}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 22, { align: "center" });
                doc.text("Documento oficial - Parque Zoológico Nacional (ZOODOM)", 15, doc.internal.pageSize.getHeight() - 22);
                doc.text(
                    "Dirección: Av. La Vega Real, Arroyo Hondo, DN, República Dominicana.  |  Tel.: 809-378-2149",
                    15,
                    doc.internal.pageSize.getHeight() - 15,
                    { maxWidth: doc.internal.pageSize.getWidth() - 30 }
                );
            },
        });

        // 👉 Mostrar vista de impresión del navegador
        doc.autoPrint(); // marca el PDF para abrir el diálogo de impresión
        // Abrir en nueva pestaña: el visor nativo mostrará el diálogo/controles de imprimir
        const blobUrl = doc.output("bloburl");
        const win = window.open(blobUrl, "_blank");

        // Fallback si el navegador bloquea la pestaña
        if (!win) {
            setPdfUrl(blobUrl.toString());
            setPreviewVisible(true);
        }
    };

    const handleReporte = async () => {
        try {
            const { data } = await refetch();
            const animales = data?.Value || [];
            const animalesConDatos = animales.map((e: { EspecieId: number }) => ({
                ...e,
                Especie: especies.find((c) => c.EspecieId === e.EspecieId)?.NombreComun || "No definido",
            }));
            await exportarPDFyMostrarPrint(animalesConDatos);
        } catch (err) {
            console.error("Error generando el reporte:", err);
        }
    };

    return (
        <div className="p-2 space-y-6">
            <Card
                title="Generador de Reporte Oficial"
                className="shadow-lg border-t-4 border-blue-600"
                header={
                    <div className="bg-green-500 text-white p-4 rounded-t-lg">
                        <h2 className="text-xl font-bold">Reporte de Animales</h2>
                        <p className="text-sm opacity-100">Sistema de Gestión Zoológica</p>
                    </div>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Especie</label>
                        <Dropdown
                            value={filtros.especieId}
                            options={[{ label: "Todos", value: null }, ...especies.map((e: any) => ({ label: e.NombreComun, value: e.EspecieId }))]}
                            onChange={(e) => setFiltros({ ...filtros, especieId: e.value })}
                            placeholder="Seleccione especie"
                            className="w-full"
                            filter
                            showClear
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
                            showClear
                        />
                    </div>
                </div>

                <Divider className="my-4" />

                <div className="flex justify-end gap-3">
                    <Button
                        label="Vista de impresión"
                        icon="pi pi-print"
                        onClick={handleReporte}
                        loading={isFetching}
                        className="bg-green-500 hover:bg-green-700 border-green-500"
                        severity="info"
                        size="large"
                    />
                </div>
            </Card>

            {/* Fallback preview si la pestaña fue bloqueada */}
            <Dialog
                header="Vista previa del PDF"
                visible={previewVisible}
                style={{ width: "80vw" }}
                modal
                onHide={() => {
                    setPreviewVisible(false);
                    if (pdfUrl) {
                        URL.revokeObjectURL(pdfUrl);
                        setPdfUrl(null);
                    }
                }}
                maximizable
            >
                {pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        title="Vista previa PDF"
                        style={{ width: "100%", height: "75vh", border: "none" }}
                    />
                )}
            </Dialog>
        </div>
    );
};

export default ReporteAnimales;
