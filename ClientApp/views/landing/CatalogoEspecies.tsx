import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { Paginator } from "primereact/paginator";
import { useFetchEspecies } from "ClientApp/hooks/useFetch";
import { IEspecie } from "#interfaces";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export const CatalogoEspecies = () => {
  const navigate = useNavigate();
  const { data: especies, isLoading, isError } = useFetchEspecies();
  const [selectedEspecie, setSelectedEspecie] = useState<IEspecie | null>(null);
  const [visible, setVisible] = useState(false);

  // Paginación
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const paginatedEspecies = especies?.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <i className="pi pi-spinner pi-spin text-4xl text-primary"></i>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">
        Error al cargar las especies
      </div>
    );
  }

  const footer = (especie: IEspecie) => (
    <div className="flex flex-column gap-2">
      <Button
        label="Ver detalles"
        className="p-button-text p-button-sm"
        onClick={() => {
          setSelectedEspecie(especie);
          setVisible(true);
        }}
      />
    </div>
  );

  return (
    <><Header />
      <div className="container mx-auto pb-8 px-8 py-4">
        {/* Header con botón de regreso */}

        <h1 className="text-center pb-2">Catologo de Especies</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedEspecies?.map((especie) => (
            <Card
              key={especie.EspecieId}
              className="border-1 surface-border hover:shadow-2 transition-all h-full flex flex-column"
              footer={footer(especie)}
            >
              <div className="flex flex-column align-items-center flex-grow-1">
                <div className="relative w-full h-24 md:h-32 lg:h-36 xl:h-40 mb-2 overflow-hidden bg-gray-100 rounded-md flex-shrink-0">
                  <img
                    src={especie.FotoUrl || "https://via.placeholder.com/300"}
                    alt={especie.NombreComun}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300';
                    }} />
                </div>

                <div className="text-center w-full flex-grow-1 flex flex-column">
                  <Tag
                    value={especie.FamiliaNombre}
                    className="text-xs mb-2 self-center"
                    severity="info" />
                  <h3 className="text-xl font-bold text-900 my-1">
                    {especie.NombreComun}
                  </h3>
                  <p className="text-sm italic text-600 mb-2 flex-grow-1">
                    {especie.NombreCientifico}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Paginador */}
        {especies && especies.length > itemsPerPage && (
          <Paginator
            first={currentPage * itemsPerPage}
            rows={itemsPerPage}
            totalRecords={especies.length}
            onPageChange={(e) => setCurrentPage(Math.floor(e.first / e.rows))}
            template={`FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport 
            <span class="mx-2">Total: ${especies.length} especies</span>`}
            currentPageReportTemplate="({currentPage} de {totalPages})"
          />
        )}

        {/* Modal de detalles */}
        <Dialog
          header={selectedEspecie?.NombreComun}
          visible={visible}
          style={{ width: '50vw' }}
          onHide={() => setVisible(false)}
          breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        >
          {selectedEspecie && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex justify-center bg-gray-100 rounded-md p-4">
                <img
                  src={selectedEspecie.FotoUrl || "https://via.placeholder.com/500"}
                  alt={selectedEspecie.NombreComun}
                  className="w-full max-h-64 object-contain" />
              </div>
              <div className="flex flex-column gap-3">
                <div>
                  <span className="text-sm font-semibold text-500">Nombre científico:</span>
                  <p className="text-lg italic">{selectedEspecie.NombreCientifico}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-semibold text-500">Familia:</span>
                    <p className="text-lg">{selectedEspecie.FamiliaNombre}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-500">Clase:</span>
                    <p className="text-lg">{selectedEspecie.ClaseNombre}</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-semibold text-500">Procedencia:</span>
                  <p className="text-lg">{selectedEspecie.ProcedenciaNombre}</p>
                </div>
              </div>
            </div>
          )}
        </Dialog>
      </div></>
  );
};