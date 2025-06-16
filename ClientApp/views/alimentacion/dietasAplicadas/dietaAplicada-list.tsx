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
    <>
      <DietaAplicadaTable dispatch={dispatch} />
    </>
  );
}

export default DietasAplicadasList;