import React from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { useFetchOneAnimal, useFetchTratamientosAplicadosByAnimalId } from "ClientApp/hooks/useFetch";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";

interface AnimalDetailProps {
  animalId: number;
}

const AnimalTratamientos: React.FC<AnimalDetailProps> = ({ animalId }) => {
  const { data: animal, isLoading: isLoadingAnimal } = useFetchOneAnimal(animalId);
  const {
    data: tratamientos,
    isLoading: isLoadingTratamientos,
  } = useFetchTratamientosAplicadosByAnimalId(animalId);

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
        title={<span className="text-lg font-semibold text-gray-700">Historial de tratamientos</span>}
        className="shadow-sm rounded-lg border border-gray-100 w-full"
      >
        {isLoadingTratamientos ? (
          <div className="space-y-3">
            <Skeleton width="100%" height="2rem" />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} width="100%" height="2.5rem" />
            ))}
          </div>
        ) : tratamientos && tratamientos.length > 0 ? (
          <>
            <div className="mb-2 flex justify-end">
              <Tag 
                value={`Total: ${tratamientos.length}`} 
                severity="info"
                className="font-medium text-xs py-1"
              />
            </div>
            
            <div className="overflow-x-auto">
              <DataTable
                value={tratamientos}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 20]}
                stripedRows
                size="small"
                className="min-w-full"
                emptyMessage="No hay tratamientos aplicados."
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} tratamientos"
              >
                <Column
                  field="NombreUsuario"
                  header="Doctor"
                  body={(rowData) => (
                    <div className="text-gray-800">
                      {rowData.NombreUsuario || "—"}
                    </div>
                  )}
                  sortable
                  style={{ width: '10%' }}
                />
                
                <Column
                  field="NombreTratamiento"
                  header="Tratamiento"
                  body={(rowData) => (
                    <div className="font-medium text-gray-800">
                      {rowData.NombreTratamiento || "—"}
                    </div>
                  )}
                  sortable
                  style={{ width: '10%' }}
                />

                <Column
                  field="FechaEntrada"
                  header="Inicio"
                  body={(rowData) => (
                    <div className="flex items-center gap-1">
                      <i className="pi pi-calendar text-gray-400 text-xs" />
                      {rowData.FechaEntrada
                        ? formatDate(rowData.FechaEntrada)
                        : "—"}
                    </div>
                  )}
                  sortable
                  style={{ width: '15%' }}
                />
                
                <Column
                  field="FechaSalida"
                  header="Fin"
                  body={(rowData) => (
                    <div className="flex items-center gap-1">
                      <i className="pi pi-calendar text-gray-400 text-xs" />
                      {rowData.FechaSalida
                        ? formatDate(rowData.FechaSalida)
                        : "—"}
                    </div>
                  )}
                  sortable
                  style={{ width: '15%' }}
                />
                
                <Column
                  field="Razon"
                  header="Razón"
                  body={(rowData) => (
                    <div className="text-gray-800">
                      {rowData.Razon || "—"}
                    </div>
                  )}
                  sortable
                  style={{ width: '35%' }}
                />
              </DataTable>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <i className="pi pi-inbox text-3xl text-gray-400 mb-2" />
            <p className="text-gray-500 font-medium">No hay tratamientos registrados</p>
            <p className="text-gray-400 text-xs mt-1">
              Este animal no tiene tratamientos aplicados en su historial
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnimalTratamientos;