import React, { useRef } from "react";
import { Calendar } from "primereact/calendar";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldValues } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import {
  Dropdown,
  InputNumber,
  InputText,
  InputTextArea,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IAnimalCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useCreateAnimal } from "ClientApp/hooks/useMutation/useMutationAnimales";
import { useFetchEspecies, useFetchZonas } from "ClientApp/hooks/useFetch";

interface IAnimalSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  especieId: number | undefined;
}

const AnimalSidebarCreate = ({ onHide, visible }: IAnimalSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: zonas, isLoading } = useFetchZonas();
  const {data : especies } = useFetchEspecies(); // Moved inside the component
  const createAnimal = useCreateAnimal();

  const { control, handleSubmit, reset } = useForm<IAnimalCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      Alias: "",
      EspecieId: undefined,
      Sexo: "",
      FechaNacimiento: null,
      ZonaId: undefined,
      Observaciones: "",
    },
  });

  const onSubmit = async (data: IAnimalCreate) => {
    const payload = {
      Alias: data.Alias,
      EspecieId: Number(data.EspecieId),
      Sexo: data.Sexo,
      FechaNacimiento: data.FechaNacimiento?.toISOString() || null,
      ZonaId: Number(data.ZonaId),
      Observaciones: data.Observaciones
    };

    console.log("Payload:", payload);
    // para mostrar mensajes
    try {
      const res = await createAnimal.mutateAsync(payload);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || "Animal creado correctamente.",
      });
      reset();
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || "Hubo un error al crear el animal.",
      });
    }
  };

  return (
    <><Toast ref={toast} />
      <Sidebar
        position="right"
        visible={visible}
        onHide={() => {
          reset();
          onHide();
        }}
        className="w-full sm:w-8 md:w-6 lg:w-6 xl:w-4"
        header={<h1 className="font-semibold text-2xl text-900">Nuevo Animal</h1>}
      >
        <Form>
          <FieldColumn label="Alias" columns={{ sm: 6 }}>
            <InputText
              name="Alias"
              control={control}
              placeholder="Alias"
              rules={{ required: "Campo obligatorio" }} />
          </FieldColumn>

          <FieldColumn label="Especie" columns={{ sm: 6 }}>
            <Dropdown
              name="EspecieId"
              control={control}
              placeholder="Seleccione una Especie"
              rules={{ required: "Campo obligatorio" }}
              options={especies || []}
              optionLabel="NombreCientifico"
              optionValue="EspecieId" />
          </FieldColumn>

          <FieldColumn label="Sexo" columns={{ sm: 6 }}>
            <Dropdown
              name="Sexo"
              control={control}
              placeholder="Seleccione sexo"
              rules={{ required: "Campo obligatorio" }}
              options={[
                { label: "Hembra", value: "Hembra" },
                { label: "Macho", value: "Macho" },
              ]} />
          </FieldColumn>

          <FieldColumn label="Zona" columns={{ sm: 6 }}>
            <Dropdown
              name="ZonaId"
              control={control}
              placeholder="Seleccione una zona"
              rules={{ required: "Campo obligatorio" }}
              options={zonas || []}
              optionLabel="NombreZona"
              optionValue="ZonaId" />
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
                  required />
              )} />
          </FieldColumn>

          

          <FieldColumn label="Observaciones">
            <InputTextArea
              rows={3}
              name="Observaciones"
              control={control}
              placeholder="Observaciones"
              rules={{ required: "Campo obligatorio" }} />
          </FieldColumn>
        </Form>

        <div className="flex justify-content-end gap-2 mt-4">
          <Button
            label="Cancelar"
            severity="secondary"
            onClick={() => {
              reset();
              onHide();
            }} />
          <Button
            label="Guardar"
            severity="success"
            onClick={handleSubmit(onSubmit)} />
        </div>
      </Sidebar></>
  );
};

export default AnimalSidebarCreate;