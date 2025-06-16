import { useReducer } from "react";
import AlimentoTable from "./alimento-table";

const initialAlimento = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const AlimentosReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_ANIMAL":
      return [...state, action.payload];
    default:
      return state;
  }
};

function AlimentosList() {
  const [dietaAplicada, dispatch] = useReducer(AlimentosReducer, initialAlimento);

  return (
    <>
      <AlimentoTable dispatch={dispatch} />
    </>
  );
}

export default AlimentosList;