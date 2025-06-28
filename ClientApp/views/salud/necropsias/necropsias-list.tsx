import { useReducer } from "react";
import NecropsiaTable from "./necropsias-table";

const initialNecropsias = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const NecropsiasReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_NECROPSIA":
      return [...state, action.payload];
    default:
      return state;
  }
};

function NecropsiasList() {
  const [TratamientosAplicados, dispatch] = useReducer(NecropsiasReducer, initialNecropsias);

  return (
    <>
      <NecropsiaTable dispatch={dispatch} />
    </>
  );
}

export default NecropsiasList;