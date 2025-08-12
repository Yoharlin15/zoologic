import { useReducer } from "react";
import TicketTable from "./ticket-table";


const initialTickets = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

// Definimos un reducer simple (puedes ajustarlo según sea necesario)
const TicketReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_USUARIO":
      return [...state, action.payload];
    default:
      return state;
  }
};

function TicketList() {
  const [tickets, dispatch] = useReducer(TicketReducer, initialTickets);

  return (
    <>
      <TicketTable dispatch={dispatch} />
    </>
  );
}

export default TicketList;