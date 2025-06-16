import React from "react";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";
import { useNavigate } from "react-router-dom";
import { IDietaAplicada } from "ClientApp/interfaces/alimentacion";

interface IDietaAplicadaGridProps {
  searchText: string;
  dietasAplicadas?: IDietaAplicada[];
}

const dietasAplicadas = ({ dietasAplicadas, searchText }: IDietaAplicadaGridProps) => {
  const navigate = useNavigate();
  const filteredDietasAplicadas = React.useMemo(() => {
    if (!dietasAplicadas?.length) return [];
    return dietasAplicadas.filter((item) =>
      matchesSearchText(searchText, `${item.Alias} ${item.Nombre}`)
    );
  }, [dietasAplicadas, searchText]);

  return (
    <>
      {!filteredDietasAplicadas.length ? (
        <EmptyMessage message="No hay empleados" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredDietasAplicadas.map((t, index) => (
              <div
                key={`${index}-${t.Alias}`}
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

export default dietasAplicadas;