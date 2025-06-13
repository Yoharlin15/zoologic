import React from "react";
import { Routes } from "#core";
import { IEmpleado } from "#interfaces";
import { Card } from "primereact/card";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";
import { useNavigate, generatePath } from "react-router-dom";
import { IPadre } from "ClientApp/interfaces/padre";

interface IPadreGridProps {
  searchText: string;
  padres?: IPadre[];
}

const PadreGrid = ({ padres, searchText }: IPadreGridProps) => {
  const navigate = useNavigate();
  const filteredPadres = React.useMemo(() => {
    if (!padres?.length) return [];
    return padres.filter((item) =>
      matchesSearchText(searchText, `${item.PadreAlias} ${item.MadreAlias}`)
    );
  }, [[padres], searchText]);

  return (
    <>
      {!filteredPadres.length ? (
        <EmptyMessage message="No hay padres" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredPadres.map((t, index) => (
              <div
                key={`${index}-${t.AnimalPadreId}`}
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

export default PadreGrid;