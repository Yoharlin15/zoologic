import { useReducer } from "react";
import TratamientoAplicadoTable from "./tratamientoAplicado-table";

const initialTratamientosAplicados = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const TratamientosAplicadosReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_TRATAMIENTO_APLICADO":
      return [...state, action.payload];
    default:
      return state;
  }
};

function TratamientosAplicadosList() {
  const [TratamientosAplicados, dispatch] = useReducer(TratamientosAplicadosReducer, initialTratamientosAplicados);

  return (
    <>
      <TratamientoAplicadoTable dispatch={dispatch} />
    </>
  );
}

export default TratamientosAplicadosList;