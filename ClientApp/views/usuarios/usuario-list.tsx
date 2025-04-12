import { useReducer } from "react";
import UsuarioTable from "./usuario-table";

const initialUsuarios = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const UsuarioReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_USUARIO":
      return [...state, action.payload];
    default:
      return state;
  }
};

function UsuariosList() {
  const [usuarios, dispatch] = useReducer(UsuarioReducer, initialUsuarios);

  return (
    <>
      <UsuarioTable dispatch={dispatch} />
    </>
  );
}

export default UsuariosList;