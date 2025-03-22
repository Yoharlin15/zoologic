import React from "react";
import { Routes } from "#core";
import { IEmpleado } from "#interfaces";
import { Card } from "primereact/card";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";
import { useNavigate, generatePath } from "react-router-dom";

interface IEmpleadoGridProps {
  searchText: string;
  empleados?: IEmpleado[];
}

const EmpleadoGrid = ({ empleados, searchText }: IEmpleadoGridProps) => {
  const navigate = useNavigate();
  const filteredEmpleados = React.useMemo(() => {
    if (!empleados?.length) return [];
    return empleados.filter((item) =>
      matchesSearchText(searchText, `${item.Apellidos} ${item.Apellidos}`)
    );
  }, [empleados, searchText]);

  return (
    <>
      {!filteredEmpleados.length ? (
        <EmptyMessage message="No hay empleados" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredEmpleados.map((t, index) => (
              <div
                key={`${index}-${t.EmpleadoId}`}
                className="col-12 sm:col-6 lg:col-4 xl:col-3"
              >
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EmpleadoGrid;