import { useReducer } from "react";
import EmpleadoTable from "./empleado-table";

const initialEmpleados = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const EmpleadosReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_EMPLEADOS":
      return [...state, action.payload];
    default:
      return state;
  }
};

function EmpleadosList() {
  const [empleados, dispatch] = useReducer(EmpleadosReducer, initialEmpleados);

  return (
    <div className="p-3 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <EmpleadoTable dispatch={dispatch} />
      </div>
    </div>
  );
}

export default EmpleadosList;