"use client"

import React, { useState, useEffect } from "react"
import { TabView, TabPanel, type TabViewTabChangeEvent } from "primereact/tabview"
import { Card } from "primereact/card"
import { Tag } from "primereact/tag"
import dayjs from "dayjs"
import { useFetchOneAnimal } from "ClientApp/hooks/useFetch/useFetchAnimales"
import { useFetchOneFoto } from "ClientApp/hooks/useFetch/useFetchEspecies"
import { IAnimal, IEspecieFoto } from "#interfaces"

// Mock hook for demonstration
const useFetchOneDieta = (animalId: number) => ({
  data: null,
  isLoading: false,
})

type AnimalDetailProps = {
  animalId: number
  onEdit?: (animal: IAnimal) => void
}

const AnimalDetail: React.FC<AnimalDetailProps> = ({ animalId, onEdit }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { data: animal, isLoading: loadingAnimal, error: animalError } = useFetchOneAnimal(animalId)
  const { data: fotoData, isLoading: loadingFoto, error: fotoError } = useFetchOneFoto(animal?.EspecieId || 0)
  const { data: dieta, isLoading: loadingDieta } = useFetchOneDieta(animalId)

  useEffect(() => {
    if (animalError) {
      console.error("Error fetching animal data:", animalError)
    }
    if (fotoError) {
      console.error("Error fetching foto de especie:", fotoError)
    }
  }, [animalError, fotoError])

  const handleTabChange = (e: TabViewTabChangeEvent) => {
    setActiveIndex(e.index)
  }

  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A"
    return dayjs(date).format("DD/MM/YYYY")
  }

  const imageUrl =
    typeof fotoData === "object" && fotoData !== null && "FotoUrl" in fotoData
      ? (fotoData as IEspecieFoto).FotoUrl
      : "/placeholder.svg?height=200&width=300"

  if (loadingAnimal || loadingFoto) {
    return (
      <div className="flex justify-center items-center h-screen">
        <i className="pi pi-spin pi-spinner text-2xl text-teal-600"></i>
      </div>
    )
  }

  if (!animal) {
    return <p className="text-center text-red-600">No se pudo encontrar el animal.</p>
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4 gap-4 max-w-screen-xl mx-auto">
      {/* Animal Info Card */}
      <Card className="shadow-sm w-full max-w-md mx-auto">  
          <div>
            <img
              src={imageUrl}
              alt={animal.Alias}
              className="h-20 w-20 object-cover rounded-full"
            />
          </div>

          {/* Animal Details */}
          <div className="space-y-2 text-sm md:text-sm">
            <div className="pt-2">
              <span className="font-bold">Codigo: </span>
              <span>{animal.Codigo || "N/A"}</span>
            </div>

            <div className="pt-2">
              <span className="font-bold">Alias: </span>
              <span>{animal.Alias}</span>
            </div>

            <div className="pt-2">
              <span className="font-bold">Especie: </span>
              <span>{animal.NombreCientifico || "N/A"}</span>
            </div>

            <div className="pt-2">
              <span className="font-bold">Color: </span>
              <span>{animal.Color || "N/A"}</span>
            </div>

            <div className="pt-2">
              <span className="font-bold">Sexo: </span>
              <span>{animal.Sexo}</span>
            </div>

            <div className="pt-2">
              <span className="font-bold">Fecha de nacimiento: </span>
              <span>{formatDate(animal.FechaNacimiento)}</span>
            </div>

            <div className="pt-2">
              <span className="font-bold">Padre: </span>
              <span>{animal.Padre || "N/A"}</span>
            </div>

            <div className="pt-2">
              <span className="font-bold">Madre: </span>
              <span>{animal.Madre || "N/A"}</span>
            </div>

            {animal.Observaciones && (
              <div className="pt-2">
                <span className="font-bold">Observaciones: </span>
                <div className="mt-1">{animal.Observaciones}</div>
              </div>
            )}
          </div>
      </Card>

      {/* Tabs Section */}
      <Card className="shadow-sm w-full max-w-8xl mx-auto flex-grow">
        <TabView
          activeIndex={activeIndex}
          onTabChange={handleTabChange}
          className="h-full "
          panelContainerClassName="p-0 h-full"
        >
          <TabPanel header="Dietas aplicadas">
            <div className="h-full p-4">
              <h2 className="text-xl font-bold mb-4">Dietas aplicadas</h2>
              <div className="space-y-4">
                <p>Contenido de dietas aplicadas...</p>
              </div>
            </div>
          </TabPanel>

          <TabPanel header="Tratamientos aplicados">
            <div className="h-full p-4">
              <h2 className="text-xl font-bold mb-4">Tratamientos aplicados</h2>
              <div className="space-y-4">
                <p>Contenido de tratamientos aplicados...</p>
              </div>
            </div>
          </TabPanel>

          <TabPanel header="Trasladados">
            <div className="h-full p-4">
              <h2 className="text-xl font-bold mb-4">Trasladados</h2>
              <div className="space-y-4">
                <p>Contenido de trasladados...</p>
              </div>
            </div>
          </TabPanel>

          <TabPanel header="Comportamientos">
            <div className="h-full p-4">
              <h2 className="text-xl font-bold mb-4">Trasladados</h2>
              <div className="space-y-4">
                <p>Contenido de trasladados...</p>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </Card>
    </div>
  )
}

export default AnimalDetail
