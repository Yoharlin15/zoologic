import React from "react";
import { ITratamientoAplicado } from "#interfaces";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";

interface ITratamientoAplicadoGridProps {
  searchText: string;
  tratamientosAplicados?: ITratamientoAplicado[];
}

const TratamientoAplicadoGrid = ({ tratamientosAplicados, searchText }: ITratamientoAplicadoGridProps) => {

  const filteredTratamientosAplicados = React.useMemo(() => {
    if (!tratamientosAplicados?.length) return [];
    return tratamientosAplicados.filter((item) =>
      matchesSearchText(searchText, `${item.Alias} ${item.Alias}`)
    );
  }, [tratamientosAplicados, searchText]);

  return (
    <>
      {!filteredTratamientosAplicados.length ? (
        <EmptyMessage message="No hay empleados" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredTratamientosAplicados.map((t, index) => (
              <div
                key={`${index}-${t.TratamientoAplicadoId}`}
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

export default TratamientoAplicadoGrid;