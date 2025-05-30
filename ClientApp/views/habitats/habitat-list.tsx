import { useReducer } from "react";
import HabitatTable from "./habitat-table";

const initialHabitats = [
  { id: 1, title: "Error en login", status: "Pendiente" },
  { id: 2, title: "Bug en dashboard", status: "Resuelto" },
];

const HabitatsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_HABITAT":
      return [...state, action.payload];
    default:
      return state;
  }
};

function HabitatList() {
  const [habitats, dispatch] = useReducer(HabitatsReducer, initialHabitats);

  return (
    <div className="p-3 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <HabitatTable dispatch={dispatch} />
      </div>
    </div>
  );
}

export default HabitatList;