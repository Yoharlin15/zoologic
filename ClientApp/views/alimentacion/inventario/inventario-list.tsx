import { useReducer } from "react";
import InventarioTable from "./inventario-table";

const initialInventario = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const InventarioReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_INVENTARIO":
      return [...state, action.payload];
    default:
      return state;
  }
};

function InventarioList() {
  const [inventario , dispatch] = useReducer(InventarioReducer, initialInventario);

  return (
    <>
      <InventarioTable dispatch={dispatch} />
    </>
  );
}

export default InventarioList;