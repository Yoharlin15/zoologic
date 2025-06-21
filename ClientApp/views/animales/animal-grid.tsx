import React from "react";
import { IAnimal } from "#interfaces";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";

interface IAnimalGridProps {
  searchText: string;
  animales?: IAnimal[];
}

const AnimalGrid = ({ animales, searchText }: IAnimalGridProps) => {

  const filteredAnimales = React.useMemo(() => {
    if (!animales?.length) return [];
    return animales.filter((item) =>
      matchesSearchText(searchText, `${item.EspecieId} ${item.AnimalId}`)
    );
  }, [animales, searchText]);

  return (
    <>
      {!filteredAnimales.length ? (
        <EmptyMessage message="No hay empleados" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredAnimales.map((t, index) => (
              <div
                key={`${index}-${t.AnimalId}`}
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

export default AnimalGrid;