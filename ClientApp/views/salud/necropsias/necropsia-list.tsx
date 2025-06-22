import { useReducer } from "react";
import TratamientoTable from "./necropsia-table";
import NecropsiaTable from "./necropsia-table";

const initialTratamientos = [
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
  const [necropsias, dispatch] = useReducer(NecropsiasReducer, initialTratamientos);

  return (
    <>
      <NecropsiaTable dispatch={dispatch} />
    </>
  );
}

export default NecropsiasList;