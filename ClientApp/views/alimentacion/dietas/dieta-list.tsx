import { useReducer } from "react";
import DietaTable from "./dieta-table";

const initialDieta = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const DietasReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_ANIMAL":
      return [...state, action.payload];
    default:
      return state;
  }
};

function DietasList() {
  const [dieta, dispatch] = useReducer(DietasReducer, initialDieta);

  return (
    <>
      <DietaTable dispatch={dispatch} />
    </>
  );
}

export default DietasList;