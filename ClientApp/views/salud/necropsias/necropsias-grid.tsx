import React from "react";
import { INecropsia } from "#interfaces";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";

interface INecropsiaGridProps {
  searchText: string;
  tratamientosAplicados?: INecropsia[];
}

const NecropsiaGrid = ({ tratamientosAplicados, searchText }: INecropsiaGridProps) => {

  const filteredNecropsias = React.useMemo(() => {
    if (!tratamientosAplicados?.length) return [];
    return tratamientosAplicados.filter((item) =>
      matchesSearchText(searchText, `${item.Alias} ${item.Alias}`)
    );
  }, [tratamientosAplicados, searchText]);

  return (
    <>
      {!filteredNecropsias.length ? (
        <EmptyMessage message="No hay necropsias" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredNecropsias.map((t, index) => (
              <div
                key={`${index}-${t.NecropsiaId}`}
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

export default NecropsiaGrid;