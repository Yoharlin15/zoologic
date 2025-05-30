import React from "react";
import { Routes } from "#core";
import { IInventario } from "#interfaces";
import { Card } from "primereact/card";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";
import { useNavigate, generatePath } from "react-router-dom";

interface IInventarioGridProps {
  searchText: string;
  inventarios?: IInventario[];
}

const InventarioGrid = ({ inventarios, searchText }: IInventarioGridProps) => {
  const navigate = useNavigate();
  const filteredInventarios = React.useMemo(() => {
    if (!inventarios?.length) return [];
    return inventarios.filter((item) =>
      matchesSearchText(searchText, `${item.Nombre} ${item.Cantidad}`)
    );
  }, [inventarios, searchText]);

  return (
    <>
      {!filteredInventarios.length ? (
        <EmptyMessage message="No hay inventarios" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredInventarios.map((t, index) => (
              <div
                key={`${index}-${t.InventarioId}`}
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

export default InventarioGrid;