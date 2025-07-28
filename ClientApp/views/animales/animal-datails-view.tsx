// src/views/AnimalDetailView.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { AppQueryHooks } from "#hooks";
import AnimalDetail from "./animal-datails";
 // Asegúrate de que la ruta sea correcta

const AnimalDetailView = () => {
  const { id } = useParams<{ id: string }>();

  const animalId = Number(id); // Convertir el ID de string a número

  const { data: animal, isLoading, isError } = AppQueryHooks.useFetchOneAnimal(animalId);

  if (isLoading) return <p>Cargando...</p>;
  if (isError || !animal) return <p>Error cargando animal.</p>;

  return <AnimalDetail animalId={animalId} />;  // Pasar solo el animalId
};

export default AnimalDetailView;
