import { useReducer } from "react";
import EspecieTable from "./especie-table";

const initialEspecies = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const EspeciesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_ESPECIE":
      return [...state, action.payload];
    default:
      return state;
  }
};

function EspeciesList() {
  const [especies, dispatch] = useReducer(EspeciesReducer, initialEspecies);

  return (
    <>
      <EspecieTable dispatch={dispatch} />
    </>
  );
}

export default EspeciesList;
