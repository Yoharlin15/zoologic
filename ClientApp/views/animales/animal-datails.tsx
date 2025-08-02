"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { TabView, TabPanel, type TabViewTabChangeEvent } from "primereact/tabview"
import { Card } from "primereact/card"
import dayjs from "dayjs"
import { useFetchOneAnimal } from "ClientApp/hooks/useFetch/useFetchAnimales"
import { useFetchOneFoto } from "ClientApp/hooks/useFetch/useFetchEspecies"
import type { IAnimal, IEspecieFoto } from "#interfaces"
import AnimalTratamientos from "./animal-tratamientos"
import AnimalDietas from "./animal-dietas"

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
        <div className="h-22 w-22 border-3 border-green-500">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={animal.Alias}
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        {/* Animal Details */}
        <div className="space-y-2 text-sm md:text-sm">
          <div className="pt-2">
            <span className="font-bold">Codigo: </span>
            <span>{animal.IdentificadorUnico || "N/A"}</span>
          </div>
          <div className="pt-2">
            <span className="font-bold">Alias: </span>
            <span>{animal.Alias}</span>
          </div>
          <div className="pt-2">
            <span className="font-bold">Especie: </span>
            <span>{animal.NombreComun || "N/A"}</span>
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
            <div className="h-full overflow-hidden">
              <AnimalDietas animalId={animalId} />
            </div>
          </TabPanel>
          <TabPanel header="Tratamientos aplicados">
            <div className="h-full overflow-hidden">
              <AnimalTratamientos animalId={animalId} />
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
              <h2 className="text-xl font-bold mb-4">Comportamientos</h2>
              <div className="space-y-4">
                <p>Contenido de comportamientos...</p>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </Card>
    </div>
  )
}

export default AnimalDetail
