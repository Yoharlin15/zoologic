import React from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { useFetchOneAnimal, useFetchTratamientosAplicadosByAnimalId } from "ClientApp/hooks/useFetch";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";

interface AnimalDetailProps {
  animalId: number;
}

const TratamientoDetalles: React.FC<AnimalDetailProps> = ({ animalId }) => {
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
    <div className="p-6 md:p-4 mx-auto text-sm" style={{ maxWidth: '95vw' }}>
      {/* Header compacto */}
      <div className="mb-2">
        <h1 className="text-2xl md:text-2xl font-bold text-gray-800">
          {isLoadingAnimal ? <Skeleton width="200px" /> : animal?.Alias || "Animal"}
        </h1>
      </div>

      <Divider className="my-2" />

      {/* Sección 1: Información del Animal - Card más compacto */}
      <Card 
        title={<span className="text-lg font-semibold text-gray-700">Información del Animal</span>}
        className="shadow-sm rounded-lg border border-gray-100 w-full mb-2"
      >
        {isLoadingAnimal ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton width="40%" height="1rem" />
                  <Skeleton width="80%" height="1.5rem" />
                </div>
              ))}
            </div>
          </div>
        ) : animal ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <div className="space-y-0">
              <p className="text-gray-500 text-xs font-medium">Alias</p>
              <p className="text-gray-800 text-sm">{animal.Alias || "—"}</p>
            </div>
            
            <div className="space-y-0">
              <p className="text-gray-500 text-xs font-medium">Codigo</p>
              <p className="text-gray-800 text-sm">{animal.IdentificadorUnico || "—"}</p>
            </div>
            
            <div className="space-y-0">
              <p className="text-gray-500 text-xs font-medium">Identificador</p>
              <p className="text-gray-800 text-sm">{animal.TipoIdentificador || "—"}</p>
            </div>
            
            <div className="space-y-0">
              <p className="text-gray-500 text-xs font-medium">Especie</p>
              <p className="text-gray-800 text-sm">{animal.NombreComun || "—"}</p>
            </div>
            
            <div className="space-y-0">
              <p className="text-gray-500 text-xs font-medium">Sexo</p>
              <p className="text-gray-800 text-sm">
                {animal.Sexo === 'M' ? 'Macho' : 'Hembra'}
              </p>
            </div>
            
            <div className="space-y-0">
              <p className="text-gray-500 text-xs font-medium">Color</p>
              <p className="text-gray-800 text-sm">{animal.Color || "—"}</p>
            </div>
            
            <div className="space-y-0">
              <p className="text-gray-500 text-xs font-medium">Fecha nacimiento</p>
              <p className="text-gray-800 text-sm">
                {animal.FechaNacimiento ? formatDate(animal.FechaNacimiento) : "—"}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <i className="pi pi-exclamation-circle text-3xl text-red-400 mb-2" />
            <p className="text-red-500 font-medium">No se encontró el animal</p>
          </div>
        )}
      </Card>

      {/* Sección 2: Tabla de tratamientos - Card más compacto */}
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

export default TratamientoDetalles;