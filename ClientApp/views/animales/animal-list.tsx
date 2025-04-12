import { useReducer } from "react";
import AnimalTable from "./animal-table";

const initialAnimales = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const AnimalesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_ANIMAL":
      return [...state, action.payload];
    default:
      return state;
  }
};

function AnimalesList() {
  const [animales, dispatch] = useReducer(AnimalesReducer, initialAnimales);

  return (
    <>
      <AnimalTable dispatch={dispatch} />
    </>
  );
}

export default AnimalesList;