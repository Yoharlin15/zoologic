import React from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

type DietasListProps = {
  dieta?: any;
  loading?: boolean;
  onAssignDiet?: () => void; // Nueva prop para manejar el click del botón
};

const DietasList: React.FC<DietasListProps> = ({ dieta, loading, onAssignDiet }) => {
  if (loading) {
    return (
      <Card className="shadow-1">
        <div className="flex flex-column gap-2">
          <Skeleton width="200px" height="1.5rem" />
          <Divider />
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} width="100px" height="1.2rem" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (!dieta) {
    return (
      <Card className="shadow-1">
        <div className="text-center p-4">
          <i className="pi pi-info-circle text-2xl mb-2 text-blue-500" />
          <p className="text-gray-600">No hay dieta registrada para este animal.</p>
          <Button 
            label="Asignar Dieta" 
            icon="pi pi-plus" 
            className="mt-3 p-button-sm"
            onClick={onAssignDiet}
          />
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={
        <div className="flex align-items-center justify-content-between">
          <span>Dieta Asignada</span>
          <Button 
            label="Asignar Dieta" 
            icon="pi pi-plus" 
            className="p-button-sm"
            onClick={onAssignDiet}
          />
        </div>
      }
      className="shadow-1"
    >
      <div className="flex align-items-center gap-2 flex-wrap">
        {dieta.alimentos?.map((item: any, index: number) => (
          <React.Fragment key={item.alimentoId}>
            <div className="flex align-items-center gap-2">
              <i className="pi pi-circle-fill text-xs text-primary" />
              <span className="text-gray-700">{item.Nombre}</span>
            </div>
            {index < dieta.alimentos.length - 1 && (
              <Divider layout="vertical" className="h-1rem" />
            )}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export default DietasList;