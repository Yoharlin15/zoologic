import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown, InputText, InputTextArea } from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IAnimalCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useCreateAnimal } from "ClientApp/hooks/useMutation/useMutationAnimales";
import { useFetchAnimalByEspecieId, useFetchEspecies, useFetchOneAnimal } from "ClientApp/hooks/useFetch";
import { useUpdateAnimal } from "ClientApp/hooks/useMutation/useMutationAnimales"; // Importar el hook de los animales filtrados por especie


interface IAnimalSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  especieId?: number;
}

const AnimalSidebarForm = ({ id, onHide, visible }: IAnimalSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: especies } = useFetchEspecies();
  const { data: animalData } = useFetchOneAnimal(id!);

  const createAnimal = useCreateAnimal();
  const updateAnimal = useUpdateAnimal();

  const [padres, setPadres] = useState([]);
  const { control, handleSubmit, reset, setValue, watch } = useForm<IAnimalCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      IdentificadorUnico: "",
      TipoIdentificador: "",
      Alias: "",
      EspecieId: undefined,
      Sexo: "",
      FechaNacimiento: null,
      PadreId: undefined,
      MadreId: undefined,
      Color: "",
      Observaciones: "",
    },
  });

  // Prellenar el formulario si es edición
  useEffect(() => {
    if (animalData) {
      reset({
        IdentificadorUnico: animalData.IdentificadorUnico || "",
        TipoIdentificador: animalData.TipoIdentificador || "",
        Alias: animalData.Alias || "",
        EspecieId: animalData.EspecieId,
        Sexo: animalData.Sexo || "",
        FechaNacimiento: animalData.FechaNacimiento ? new Date(animalData.FechaNacimiento) : null,
        PadreId: animalData.PadreId || undefined,
        MadreId: animalData.MadreId || undefined,
        Color: animalData.Color || "",
        Observaciones: animalData.Observaciones || "",
      });
    }
  }, [animalData, reset]);

  useEffect(() => {
    if (!id && visible) {
      reset({
        IdentificadorUnico: "",
        TipoIdentificador: "",
        Alias: "",
        EspecieId: undefined,
        Sexo: "",
        FechaNacimiento: null,
        PadreId: undefined,
        MadreId: undefined,
        Color: "",
        Observaciones: "",
      });
    }
  }, [id, visible, reset]);

  const selectedEspecieId = watch("EspecieId");

  // Hook para obtener los animales filtrados por especie
  const { data: filteredPadres } = useFetchAnimalByEspecieId(selectedEspecieId);

  useEffect(() => {
    // Cuando se seleccione una especie, actualizamos los padres
    if (filteredPadres) {
      setPadres(filteredPadres);
    }
  }, [filteredPadres]);

  const onSubmit = async (data: IAnimalCreate) => {
    const payload = {
      IdentificadorUnico: data.IdentificadorUnico,
      TipoIdentificador: data.TipoIdentificador,
      Alias: data.Alias,
      EspecieId: Number(data.EspecieId),
      Sexo: data.Sexo,
      FechaNacimiento: data.FechaNacimiento?.toISOString() || null,
      PadreId: Number(data.PadreId),
      MadreId: Number(data.MadreId),
      Color: data.Color,
      Observaciones: data.Observaciones,
    };

    try {
      let res;
      if (id) {
        res = await updateAnimal.mutateAsync({ AnimalId: id, ...payload });
      } else {
        res = await createAnimal.mutateAsync(payload);
      }

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || `Animal ${id ? "actualizado" : "creado"} correctamente.`,
      });

      reset();
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || `Hubo un error al ${id ? "actualizar" : "crear"} el animal.`,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Sidebar
        position="right"
        visible={visible}
        onHide={() => {
          reset();
          onHide();
        }}
        className="w-full sm:w-8 md:w-6 lg:w-6 xl:w-4"
        header={<h1 className="font-semibold text-2xl text-900">{id ? "Editar Animal" : "Nuevo Animal"}</h1>}
      >
        <Form>
          <FieldColumn label="Código" columns={{ sm: 6 }}>
            <InputText
              name="IdentificadorUnico"
              control={control}
              placeholder="Código"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Identificador" columns={{ sm: 6 }}>
            <Dropdown
              name="TipoIdentificador"
              control={control}
              placeholder="Seleccione"
              rules={{ required: "Campo obligatorio" }}
              options={[
                { label: "Microchip", value: "Microchip" },
                { label: "Arete-plastico", value: "Arete-plastico" },
                { label: "Arete-metal", value: "Arete-metal" },
              ]}
            />
          </FieldColumn>

          <FieldColumn label="Alias" columns={{ sm: 6 }}>
            <InputText
              name="Alias"
              control={control}
              placeholder="Alias"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Especie" columns={{ sm: 6 }}>
            <Dropdown
              name="EspecieId"
              control={control}
              placeholder="Seleccione una Especie"
              rules={{ required: "Campo obligatorio" }}
              options={especies || []}
              optionLabel="NombreComun"
              optionValue="EspecieId"
              onChange={(e) => setValue("EspecieId", e.value)} // Cambiar valor de especie
            />
          </FieldColumn>

          <FieldColumn label="Sexo" columns={{ sm: 6 }}>
            <Dropdown
              name="Sexo"
              control={control}
              placeholder="Seleccione un Sexo"
              rules={{ required: "Campo obligatorio" }}
              options={[
                { label: "Macho", value: "Macho" },
                { label: "Hembra", value: "Hembra" },
              ]}
            />
          </FieldColumn>

          <FieldColumn label="Color" columns={{ sm: 6 }}>
            <Dropdown
              name="Color"
              control={control}
              placeholder="Color"
              rules={{ required: "Campo obligatorio" }}
              options={[
                { label: "Negro", value: "Negro" },
                { label: "Blanco", value: "Blanco" },
                { label: "Marrón", value: "Marrón" },
              ]}
            />
          </FieldColumn>

          <FieldColumn label="Padre" columns={{ sm: 6 }}>
            <Dropdown
              name="PadreId"
              control={control}
              placeholder="Seleccione un padre"
              options={padres.filter((animal: any) => animal.Sexo === "Macho") || []}
              optionLabel="IdentificadorUnico"
              optionValue="AnimalId"
            />
          </FieldColumn>

          <FieldColumn label="Madre" columns={{ sm: 6 }}>
            <Dropdown
              name="MadreId"
              control={control}
              placeholder="Seleccione una madre"
              options={padres.filter((animal: any) => animal.Sexo === "Hembra")  || []}
              optionLabel="IdentificadorUnico"
              optionValue="AnimalId"
            />
          </FieldColumn>

          <FieldColumn label="Fecha de Nacimiento" columns={{ sm: 12 }}>
            <Controller
              name="FechaNacimiento"
              control={control}
              render={({ field }) => (
                <Calendar
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  showIcon
                  dateFormat="dd/mm/yy"
                  placeholder="Seleccione una fecha"
                  className="w-full"
                  showButtonBar
                  required
                />
              )}
            />
          </FieldColumn>

          <FieldColumn label="Observaciones">
            <InputTextArea
              rows={3}
              name="Observaciones"
              control={control}
              placeholder="Observaciones"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>
        </Form>

        <div className="flex justify-content-end gap-2 mt-4">
          <Button
            label="Cancelar"
            severity="secondary"
            onClick={() => {
              reset();
              onHide();
            }}
          />
          <Button
            label="Guardar"
            severity="success"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </Sidebar>
    </>
  );
};

export default AnimalSidebarForm;
