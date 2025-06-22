import React from "react";
import { IComportamiento } from "#interfaces";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";

interface IComportamientoGridProps {
  searchText: string;
  comportamientos?: IComportamiento[];
}

const EmpleadoGrid = ({ comportamientos, searchText }: IComportamientoGridProps) => {

  const filteredComportamientos = React.useMemo(() => {
    if (!comportamientos?.length) return [];
    return comportamientos.filter((item) =>
      matchesSearchText(searchText, `${item.Alias} ${item.Alias}`)
    );
  }, [comportamientos, searchText]);

  return (
    <>
      {!filteredComportamientos.length ? (
        <EmptyMessage message="No hay empleados" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredComportamientos.map((t, index) => (
              <div
                key={`${index}-${t.ComportamientoId}`}
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