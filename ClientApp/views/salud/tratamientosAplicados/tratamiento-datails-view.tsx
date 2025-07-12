import React from "react";
import { useParams } from "react-router-dom";
import TratamientoDetalles from "./tratamientoDetalle";


const TratamientoDetalleWrapper: React.FC = () => {
  const { animalId } = useParams<{ animalId: string }>();

  if (!animalId) return <p>ID no válido</p>;

  return <TratamientoDetalles animalId={parseInt(animalId)} />;
};

export default TratamientoDetalleWrapper;

