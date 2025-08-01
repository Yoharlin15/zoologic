import { useReducer } from "react";
import AlimentoEspecieTable from "./alimentoEspecie-table";

const initialAlimentoEspecie = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const AlimentosEspeciesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_ANIMAL":
      return [...state, action.payload];
    default:
      return state;
  }
};

function AlimentosEspeciesList() {
  const [alimentoEspecie, dispatch] = useReducer(AlimentosEspeciesReducer, initialAlimentoEspecie);

  return (
    <>
      <AlimentoEspecieTable dispatch={dispatch} />
    </>
  );
}

export default AlimentosEspeciesList;