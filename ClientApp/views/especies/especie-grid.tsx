import React from "react";
import { Routes } from "#core";
import { IEspecie } from "#interfaces";
import { Card } from "primereact/card";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";
import { useNavigate, generatePath } from "react-router-dom";

interface IEspecieGridProps {
  searchText: string;
  especies?: IEspecie[];
}

const EspecieGrid = ({ especies, searchText }: IEspecieGridProps) => {
  const navigate = useNavigate();
  const filteredEspecies = React.useMemo(() => {
    if (!especies?.length) return [];
    return especies.filter((item) =>
      matchesSearchText(searchText, `${item.ClaseNombre} ${item.ClaseNombre}`)
    );
  }, [especies, searchText]);

  return (
    <>
      {!filteredEspecies.length ? (
        <EmptyMessage message="No hay especies" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredEspecies.map((t, index) => (
              <div
                key={`${index}-${t.EspecieId}`}
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

export default EspecieGrid;
