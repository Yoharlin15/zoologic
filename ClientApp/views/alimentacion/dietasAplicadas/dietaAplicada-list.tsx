import { useReducer } from "react";
import DietaAplicadaTable from "./dietaAplicada-table";

const initialDietaAplicada = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const DietasAplicadasReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_ANIMAL":
      return [...state, action.payload];
    default:
      return state;
  }
};

function DietasAplicadasList() {
  const [dietaAplicada, dispatch] = useReducer(DietasAplicadasReducer, initialDietaAplicada);

  return (
    <div className="p-3 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <DietaAplicadaTable dispatch={dispatch} />
      </div>
    </div>
  );
}

export default DietasAplicadasList;