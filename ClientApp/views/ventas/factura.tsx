import React, { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import QRCode from "react-qr-code";
import { AppQueryHooks } from "#hooks";
import { IFacturaDetalle } from "ClientApp/interfaces/venta";

const formatCurrency = (value?: number) =>
  new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" }).format(value ?? 0);

const formatDate = (iso?: string) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return new Intl.DateTimeFormat("es-DO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

const FacturaComprobante: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams<Record<string, string>>();
  const search = new URLSearchParams(window.location.search);
  const paramId = Object.values(params)[0];
  const rawId = paramId ?? search.get("facturaId");
  const facturaId = useMemo(() => {
    const n = Number(rawId);
    return Number.isFinite(n) ? n : undefined;
  }, [rawId]);

  const { data: factura, isLoading: l1 } = AppQueryHooks.useFetchOneFactura(facturaId!);
  const { data: detallesRaw, isLoading: l2 } = AppQueryHooks.useFetchOneFacturaDetalle(facturaId!);
  const loading = l1 || l2;
  const codigoQR = state?.codigoQR ?? null;

  // Normaliza array de detalle para DataTable
  const detalles: IFacturaDetalle[] = useMemo(() => {
    const r: any = detallesRaw as any;
    if (Array.isArray(r)) return r;
    if (Array.isArray(r?.data)) return r.data;
    if (Array.isArray(r?.value)) return r.value;
    if (Array.isArray(r?.items)) return r.items;
    if (r && typeof r === "object") return [r as IFacturaDetalle];
    return [];
  }, [detallesRaw]);

  // Totales: si hay detalle, calcula; sino usa MontoTotal de la factura
  const totals = useMemo(() => {
    if (detalles.length) {
      const subtotal = detalles.reduce((acc: number, d: IFacturaDetalle) => acc + d.Cantidad * d.PrecioUnitario, 0);
      // si el backend ya manda precioTotal por línea, úsalo para total
      const total = detalles.reduce((acc: number, d: IFacturaDetalle) => acc + (Number((d as any).precioTotal ?? d.Cantidad * d.PrecioUnitario)), 0);
      return { subtotal, itbis: total - subtotal, total };
    }
    const t = factura?.MontoTotal ?? 0;
    return { subtotal: t, itbis: 0, total: t };
  }, [detalles, factura?.MontoTotal]);

  const onPrint = () => window.print();

  if (!facturaId) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-xl w-full border rounded-md p-6 text-center">
          <div className="text-lg font-semibold mb-2">Falta el parámetro facturaId</div>
          <Button label="Volver" icon="pi pi-arrow-left" onClick={() => navigate(-1)} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center bg-white print:bg-white">
      {/* Estilos de impresión */}
      <style>{`
        @page { size: A4; margin: 18mm; }
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
        }
      `}</style>

      <div className="relative w-[210mm] min-h-[297mm] p-6 md:p-10">
        {/* Barra vertical izquierda */}
        <div className="absolute left-0 top-0 h-full w-[6mm] bg-black print:bg-black" />

        {/* Acciones */}
        <div className="no-print flex justify-end mb-4 gap-2">
          <Button label="Imprimir" icon="pi pi-print" onClick={onPrint} loading={loading} />
          <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" onClick={() => navigate(-1)} />
        </div>

        {/* Encabezado institución */}
        <div className="pl-6">
          <div className="text-xl font-bold">Zoológico Nacional</div>
          <div className="text-xs text-gray-600 leading-5">
            Ave. Principal del Parque, Santo Domingo, Rep. Dom<br />
            RNC: 4-101001002
          </div>
        </div>

        {/* INTERESADO (desde IFactura) */}
        <Section title="Cliente:">
          <KV label="Nombre" value={factura?.NombreUsuario ?? "-"} />
          <KV label="Compra ID" value={factura?.CompraId ?? "-"} />
        </Section>

        {/* DATOS DEL DOCUMENTO (desde IFactura) */}
        <Section title="Datos de la factura:">
          <KV label="Documento" value={String(factura?.FacturaId ?? "-")} />
          <KV label="Fecha" value={formatDate(factura?.FechaFactura)} />
        </Section>

        {/* FACTURA DE CONSUMO (desde IFactura) */}
        <Section title="FACTURA DE CONSUMO">
          <KV label="RNC" value={"4-101001002"} />
          <KV label="NCF" value={factura?.NumeroFactura ? `B${factura.NumeroFactura}` : "-"} />
          <KV label="Nombre" value={factura?.NombreUsuario ?? "-"} />
        </Section>

        {/* DETALLE */}
        <div className="pl-6 mt-6">
          <div className="border-t border-black w-full mb-2" />
          <div className="font-semibold text-sm mb-2">DETALLE DE SERVICIOS FACTURADOS</div>

          <DataTable
            value={detalles}
            dataKey="DetalleFacturaId"
            className="text-xs"
            stripedRows
            loading={loading}
            emptyMessage="Sin detalles para esta factura"
          >
            <Column header="Servicio" body={(d: IFacturaDetalle) => `Boleto ${d.Descripcion}`} />
            <Column header="Cantidad" body={(d: IFacturaDetalle) => d.Cantidad} className="text-right" />
            <Column
              header="Subtotal"
              body={(d: IFacturaDetalle) => formatCurrency(d.Cantidad * d.PrecioUnitario)}
              className="text-right"
            />
          </DataTable>

          <div className="border-t border-black w-full mt-2" />
        </div>

        {/* Totales (prioriza MontoTotal de IFactura) */}
        <div className="pl-6 mt-4 flex flex-col items-end gap-1 text-sm">
          <div className="border-t border-black w-[240px] my-1" />
          <RowTotal strong label="TOTAL" value={formatCurrency(factura?.MontoTotal ?? totals.total)} />
        </div>

        {codigoQR && (
          <>
            <div className="justify-content-center ml-8 mt-2">
              <QRCode value={codigoQR} size={180} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="pl-6 mt-6">
    <div className="border-t border-black w-full mb-2" />
    <div className="uppercase tracking-wide font-semibold text-sm">{title}</div>
    <div className="grid grid-cols-[140px_1fr] gap-y-1 text-sm mt-2">{children}</div>
  </div>
);

const KV: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <>
    <div className="text-gray-600">{label}:</div>
    <div className="font-medium break-words">{value}</div>
  </>
);

const RowTotal: React.FC<{ label: string; value: string; strong?: boolean }> = ({ label, value, strong }) => (
  <div className={`grid grid-cols-[1fr_160px] gap-3 w-[320px] ${strong ? "font-semibold" : ""}`}>
    <div className="text-right">{label}</div>
    <div className="text-right">{value}</div>
  </div>
);

export default FacturaComprobante;
