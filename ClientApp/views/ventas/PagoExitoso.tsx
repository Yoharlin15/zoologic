import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import QRCode from "react-qr-code";

const PagoExitoso = () => {
  const { state } = useLocation() as {
    state?: {
      compraId?: number;
      facturaId?: number;
      codigoQR?: string;        // GUID
      validationUrl?: string;   // URL completa devuelta por el backend
    };
  };
  const navigate = useNavigate();

  const compraId = state?.compraId ?? null;
  const facturaId = state?.facturaId ?? null;
  const codigoQR = state?.codigoQR ?? null;
  const validationUrl = state?.validationUrl ?? (codigoQR
    ? `${window.location.origin}/validar?code=${encodeURIComponent(codigoQR)}`
    : null);

  const handleVerFactura = () => {
    if (!facturaId) return alert("Factura no disponible");
    navigate(`/invoice/${facturaId}`, { state: { codigoQR } });
  };

  const handleVolverInicio = () => navigate("/");

  const handleAbrirVerificacion = () => {
    if (!validationUrl) return;
    window.open(validationUrl, "_blank");
  };

  const handleCopiarEnlace = async () => {
    if (!validationUrl) return;
    await navigator.clipboard.writeText(validationUrl);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-100 via-green-50 to-white p-4">
      <Card
        title={<span className="text-3xl font-bold text-green-700">✅ ¡Pago Exitoso!</span>}
        subTitle={<span className="text-lg text-gray-600">Gracias por tu compra</span>}
        className="w-full max-w-2xl shadow-4 border-round-xl bg-white"
      >
        <div className="text-center my-2 space-y-2">
          <p className="text-green-700 font-medium text-lg">🧾 Tu pago ha sido procesado correctamente.</p>
          {facturaId && <p className="text-gray-600">Factura N° <strong>{facturaId}</strong></p>}
          {compraId && <p className="text-gray-600">Compra N° <strong>{compraId}</strong></p>}
        </div>

        {validationUrl && (
          <>
            <p className="text-center text-sm text-gray-700 mb-2">
              📌 Muestra este código al equipo de boleteros del zoológico.
            </p>

            <div className="bg-gray-50 border border-dashed border-green-300 rounded-lg p-4 mb-4 flex justify-content-center">
              {/* El QR DEBE llevar la URL, no el GUID */}
              <QRCode value={validationUrl} size={180} />
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <Button label="Abrir verificación" icon="pi pi-external-link" onClick={handleAbrirVerificacion} />
              <Button label="Copiar enlace" icon="pi pi-copy" className="p-button-secondary" onClick={handleCopiarEnlace} />
            </div>

            <p className="text-center text-xs text-gray-500 italic mb-4">
              También podrás ver los detalles en <strong>“Mis tickets”</strong>.
            </p>
          </>
        )}

        {!validationUrl && (
          <p className="text-center text-red-600 text-sm mb-4">
            No se recibió la URL de validación. Intenta recargar o contacta soporte.
          </p>
        )}

        <div className="flex flex-column w-full gap-2 mt-4">
          <Button label="Ver factura detallada" icon="pi pi-file-pdf" className="p-button-success" onClick={handleVerFactura} />
          <Button label="Volver al inicio" icon="pi pi-home" className="p-button-outlined p-button-secondary" onClick={handleVolverInicio} />
        </div>
      </Card>
    </div>
  );
};

export default PagoExitoso;
