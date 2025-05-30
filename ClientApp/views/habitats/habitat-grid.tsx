import React from "react";
import { IHabitat } from "#interfaces";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";
import { useNavigate, generatePath } from "react-router-dom";

interface IHabitatGridProps {
  searchText: string;
  habitats?: IHabitat[];
}

const HabitatGrid = ({ habitats, searchText }: IHabitatGridProps) => {
  const navigate = useNavigate();
  const filteredHabitats = React.useMemo(() => {
    if (!habitats?.length) return [];
    return habitats.filter((item) =>
      matchesSearchText(searchText, `${item.HabitatId} ${item.Nombre}`)
    );
  }, [habitats, searchText]);

  return (
    <>
      {!filteredHabitats.length ? (
        <EmptyMessage message="No hay habitats" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredHabitats.map((t, index) => (
              <div
                key={`${index}-${t.HabitatId}`}
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

export default HabitatGrid;