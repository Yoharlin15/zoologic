import React from "react";
import { useNavigate } from "react-router-dom";
import QrScanner from "react-qr-scanner";

const BoleteroView: React.FC = () => {
  const navigate = useNavigate();

  const handleScan = (data: any) => {
    if (!data) return;

    const text = data?.text || data; // `react-qr-scanner` devuelve { text } o string
    try {
      const url = new URL(text);
      const code = url.searchParams.get("code") || text;
      navigate(`/validar?code=${encodeURIComponent(code)}`);
    } catch {
      // No era URL, asumimos que es directamente el código
      navigate(`/validar?code=${encodeURIComponent(text)}`);
    }
  };

  const handleError = (err: any) => {
    console.error("Error al escanear:", err);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Escanear boleto</h2>
      <QrScanner
        onScan={handleScan}
        onError={handleError}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default BoleteroView;
