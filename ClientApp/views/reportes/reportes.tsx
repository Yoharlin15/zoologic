import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import ReporteEmpleados from "./ReporteEmpleados";
import ReporteAnimales from "./ReporteAnimales";
import ReporteHabitats from "./ReporteHabitats";
import ReporteCompras from "./ReporteCompras";


const VistaReportes = () => {
  const [modulo, setModulo] = useState<string>("");

  const modulos = [
    { label: "Empleados", value: "empleados" },
    { label: "Animales", value: "animales" },
    { label: "habitats", value: "habitats" },
    { label: "Compras", value: "compras" }
  ];

  const renderReporte = () => {
    switch (modulo) {
      case "empleados":
        return <ReporteEmpleados />;
       case "animales":
         return <ReporteAnimales />;
       case "habitats":
         return <ReporteHabitats />;
       case "compras":
         return <ReporteCompras />;
      default:
        return <p className="text-gray-500">Seleccione un módulo</p>;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Generador de Reportes</h2>
      <Dropdown
        value={modulo}
        options={modulos}
        onChange={(e) => setModulo(e.value)}
        placeholder="Seleccione un módulo"
        className="w-64"
      />

      <div>{renderReporte()}</div>
    </div>
  );
};

export default VistaReportes;
