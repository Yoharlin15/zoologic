import React from "react";
import { Routes } from "#core";
import { INecropsia } from "#interfaces";
import { Card } from "primereact/card";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";
import { useNavigate, generatePath } from "react-router-dom";

interface INecropsiaGridProps {
  searchText: string;
  necropsias?: INecropsia[];
}

const NecropsiaGrid = ({ necropsias, searchText }: INecropsiaGridProps) => {
  const navigate = useNavigate();
  const filteredNecropsias = React.useMemo(() => {
    if (!necropsias?.length) return [];
    return necropsias.filter((item) =>
      matchesSearchText(searchText, `${item.Examen} ${item.Examen}`)
    );
  }, [necropsias, searchText]);

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