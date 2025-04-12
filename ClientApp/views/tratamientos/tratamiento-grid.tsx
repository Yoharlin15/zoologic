import React from "react";
import { Routes } from "#core";
import { ITratamiento } from "#interfaces";
import { Card } from "primereact/card";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";
import { useNavigate, generatePath } from "react-router-dom";

interface ITratamientoGridProps {
  searchText: string;
  tratamientos?: ITratamiento[];
}

const TratamientoGrid = ({ tratamientos, searchText }: ITratamientoGridProps) => {
  const navigate = useNavigate();
  const filteredTratamientos = React.useMemo(() => {
    if (!tratamientos?.length) return [];
    return tratamientos.filter((item) =>
      matchesSearchText(searchText, `${item.NombreComun} ${item.NombreComun}`)
    );
  }, [tratamientos, searchText]);

  return (
    <>
      {!filteredTratamientos.length ? (
        <EmptyMessage message="No hay empleados" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredTratamientos.map((t, index) => (
              <div
                key={`${index}-${t.TratamientoId}`}
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

export default TratamientoGrid;