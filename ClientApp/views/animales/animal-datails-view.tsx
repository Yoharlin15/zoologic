// src/views/AnimalDetailView.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { AppQueryHooks } from "#hooks";
import AnimalDetail from "./animal-datails"; // Asegúrate de que la ruta sea correcta

const AnimalDetailView = () => {
  const { id } = useParams<{ id: string }>();

  const animalId = Number(id);

  const { data: animal, isLoading, isError } = AppQueryHooks.useFetchOneAnimal(animalId);

  if (isLoading) return <p>Cargando...</p>;
  if (isError || !animal) return <p>Error cargando animal.</p>;

  return <AnimalDetail animal={animal} />;
};

export default AnimalDetailView;
