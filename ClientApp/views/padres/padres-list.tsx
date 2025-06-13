import { useReducer } from "react";
import PadreTable from "./padres-table";

const initialPadres = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const PadresReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_PADRE":
      return [...state, action.payload];
    default:
      return state;
  }
};

function PadresList() {
  const [padres, dispatch] = useReducer(PadresReducer, initialPadres);

  return (
    <>
      <PadreTable dispatch={dispatch} />
    </>
  );
}

export default PadresList;