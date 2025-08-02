import React from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { useFetchDietasAplicadasByAnimalId, useFetchOneAnimal } from "ClientApp/hooks/useFetch";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";

interface AnimalDetailProps {
  animalId: number;
}

const AnimalDietas: React.FC<AnimalDetailProps> = ({ animalId }) => {
  const { data: animal, isLoading: isLoadingAnimal } = useFetchOneAnimal(animalId);
  const {
    data: dietas,
    isLoading: isLoadingDietas,
  } = useFetchDietasAplicadasByAnimalId(animalId);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'UTC'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="p-6 md:p-2 mx-auto text-sm" style={{ maxWidth: '95vw' }}>
      <Card 
        title={<span className="text-lg font-semibold text-gray-700">Historial de dietas</span>}
        className="shadow-sm rounded-lg border border-gray-100 w-full"
      >
        {isLoadingDietas ? (
          <div className="space-y-3">
            <Skeleton width="100%" height="2rem" />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} width="100%" height="2.5rem" />
            ))}
          </div>//
        ) : dietas && dietas.length > 0 ? (
          <>
            <div className="mb-2 flex justify-end">
              <Tag 
                value={`Total: ${dietas.length}`} 
                severity="info"
                className="font-medium text-xs py-1"
              />
            </div>
            
            <div className="overflow-x-auto">
              <DataTable
                value={dietas}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 20]}
                stripedRows
                size="small"
                className="min-w-full"
                emptyMessage="No hay dietas aplicadas."
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} dietas"
              >
                <Column
                  field="AlimentoNombre"
                  header="Alimento"
                  body={(rowData) => (
                    <div className="text-gray-800">
                      {rowData.Nombre || "—"}
                    </div>
                  )}
                  sortable
                  style={{ width: '10%' }}
                />
                
                <Column
                  field="Cantidad"
                  header="Cantidad"
                  body={(rowData) => (
                    <div className="text-gray-800">
                      {rowData.Cantidad || "—"}
                    </div>
                  )}
                  sortable
                  style={{ width: '10%' }}
                />

                <Column
                  field="FechaAplicacion"
                  header="Fecha de aplicacion"
                  body={(rowData) => (
                    <div className="flex items-center gap-1">
                      <i className="pi pi-calendar text-gray-400 text-xs" />
                      {rowData.FechaAplicacion
                        ? formatDate(rowData.FechaAplicacion)
                        : "—"}
                    </div>
                  )}
                  sortable
                  style={{ width: '15%' }}
                />
              </DataTable>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <i className="pi pi-inbox text-3xl text-gray-400 mb-2" />
            <p className="text-gray-500 font-medium">No hay dietas registrados</p>
            <p className="text-gray-400 text-xs mt-1">
              Este animal no tiene dietas aplicadas en su historial
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnimalDietas;