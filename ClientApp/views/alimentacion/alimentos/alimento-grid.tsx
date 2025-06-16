import React from "react";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";
import { useNavigate } from "react-router-dom";
import { IAlimento } from "ClientApp/interfaces/alimentacion";

interface IAlimentosGridProps {
  searchText: string;
  alimentos?: IAlimento[];
}

const Alimentos = ({ alimentos, searchText }: IAlimentosGridProps) => {
  const navigate = useNavigate();
  const filteredAlimentos = React.useMemo(() => {
    if (!alimentos?.length) return [];
    return alimentos.filter((item) =>
      matchesSearchText(searchText, `${item.Nombre}`)
    );
  }, [alimentos, searchText]);

  return (
    <>
      {!filteredAlimentos.length ? (
        <EmptyMessage message="No hay alimentos" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredAlimentos.map((t, index) => (
              <div
                key={`${index}-${t.Nombre}`}
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

export default Alimentos;