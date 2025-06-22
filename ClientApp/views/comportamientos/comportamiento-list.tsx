import { useReducer } from "react";
import ComportamientoTable from "./comportamiento-table";

const initialComportamientos = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const ComportamientosReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_Comportamiento":
      return [...state, action.payload];
    default:
      return state;
  }
};

function ComportamientosList() {
  const [comportamientos, dispatch] = useReducer(ComportamientosReducer, initialComportamientos);

  return (
    <div className="p-3 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ComportamientoTable dispatch={dispatch} />
      </div>
    </div>
  );
}

export default ComportamientosList;