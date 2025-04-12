import { useReducer } from "react";
import TratamientoTable from "./tratamiento-table";

const initialTratamientos = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const TratamientosReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_TRATAMIENTO":
      return [...state, action.payload];
    default:
      return state;
  }
};

function TratamientosList() {
  const [tratamientos, dispatch] = useReducer(TratamientosReducer, initialTratamientos);

  return (
    <>
      <TratamientoTable dispatch={dispatch} />
    </>
  );
}

export default TratamientosList;