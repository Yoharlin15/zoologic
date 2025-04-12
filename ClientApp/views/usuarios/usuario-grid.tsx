import React from "react";
import { Routes } from "#core";
import { IUsuario } from "#interfaces";
import { Card } from "primereact/card";
import { matchesSearchText } from "#utils";
import { EmptyMessage, TopSearchResult } from "#components";
import { useNavigate, generatePath } from "react-router-dom";

interface IUsuarioGridProps {
  searchText: string;
  usuarios?: IUsuario[];
}

const UsuarioGrid = ({ usuarios, searchText }: IUsuarioGridProps) => {
  const navigate = useNavigate();
  const filteredUsuarios = React.useMemo(() => {
    if (!usuarios?.length) return [];
    return usuarios.filter((item) =>
      matchesSearchText(searchText, `${item.NombreUsuario} ${item.NombreUsuario}`)
    );
  }, [usuarios, searchText]);

  return (
    <>
      {!filteredUsuarios.length ? (
        <EmptyMessage message="No hay empleados" />
      ) : (
        <>
          {searchText !== "" && <TopSearchResult />}
          <div className="grid">
            {filteredUsuarios.map((t, index) => (
              <div
                key={`${index}-${t.UsuarioId}`}
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

export default UsuarioGrid;