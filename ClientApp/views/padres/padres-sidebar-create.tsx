import React, { useRef } from "react";
import { Calendar } from "primereact/calendar";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldValues } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import {
  Dropdown,
  InputText,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { Toast } from "primereact/toast";
import { useFetchEspecies } from "ClientApp/hooks/useFetch";
import { useCreatePadres } from "ClientApp/hooks/useMutation/useMutationPadres";
import { IPadreCreate } from "ClientApp/interfaces/padre";

interface IPadreSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  padreId: number | undefined;
}

const PadreSidebarCreate = ({ onHide, visible }: IPadreSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: especies } = useFetchEspecies();
  const createAnimal = useCreatePadres();

  const { control, handleSubmit, reset } = useForm<IPadreCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      PadreAlias: "",
      MadreAlias: "",
      EspecieId: undefined,
      FechaNacimientoCrias: null,
      NumeroCrias: undefined,
    },
  });

  const onSubmit = async (data: IPadreCreate) => {
    const payload = {
      PadreAlias: data.PadreAlias,
      MadreAlias: data.MadreAlias,
      EspecieId: Number(data.EspecieId), // Cambiado a EspecieId
      FechaNacimientoCrias: data.FechaNacimientoCrias?.toISOString() || null,
      NumeroCrias: Number(data.NumeroCrias)
    };

    console.log("Payload:", payload);
    // para mostrar mensajes
    try {
      const res = await createAnimal.mutateAsync(payload);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || "Padres creados correctamente.",
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
        header={<h1 className="font-semibold text-2xl text-900">Nuevos padres</h1>}
      >
        <Form>
          <FieldColumn label="Padre (Alias)" columns={{ sm: 6 }}>
            <InputText
              name="PadreAlias"
              control={control}
              placeholder="Alias"
              rules={{ required: "Campo obligatorio" }} />
          </FieldColumn>

          <FieldColumn label="Madre (Alias)" columns={{ sm: 6 }}>
            <InputText
              name="MadreAlias"
              control={control}
              placeholder="Madre alias"
              rules={{ required: "Campo obligatorio" }} />
          </FieldColumn>


          <FieldColumn label="Especie" columns={{ sm: 6 }}>
            <Dropdown
              name="EspecieId"
              control={control}
              placeholder="Selecciona la especie"
              rules={{ required: "Campo obligatorio" }}
              options={especies || []}
              optionLabel="NombreComun"
              optionValue="EspecieId" />
          </FieldColumn>

          <FieldColumn label="Fecha de Nacimiento" columns={{ sm: 6 }}>
            <Controller
              name="FechaNacimientoCrias"
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

          <FieldColumn label="Crias" columns={{ sm: 6 }}>
            <InputText
              name="NumeroCrias"
              control={control}
              placeholder="Crias"
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

export default PadreSidebarCreate;