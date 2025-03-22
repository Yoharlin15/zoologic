import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { Controller, FieldValues } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import {
  Dropdown,
  InputText,
  InputTextArea,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IEspecieCreate } from "#interfaces";
import toast from "react-hot-toast";
import { useCreateEspecie } from "ClientApp/hooks/useMutation";

interface IEspecieSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  especieId: number | undefined;
}

const EspecieSidebarCreate = ({ onHide, visible }: IEspecieSidebarProps) => {

  const createEspecie = useCreateEspecie();
  const onSubmit = async (data: IEspecieCreate) => {
    try {
      const response = await createEspecie.mutateAsync(data);
      if (response) {
        toast.success("Especie guardada exitosamente!");
        reset();  // Resetear el formulario
        onHide(); // Cerrar el sidebar
      }
    } catch (error) {
      toast.error("Error al guardar la especie");
    }
  };
  const { control, handleSubmit, reset } = useForm<IEspecieCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      NombreCientifico: "",
      NombreComun: "",
      Familia: "",
      Clase: "",
      Sexo: "",
      Peso: "",
      FechaLlegada: null,
      Procedencia: "",
      Observaciones: "",
    },
  });

  return (
    <Sidebar
      position="right"
      visible={visible}
      onHide={() => {
        reset();
        onHide();
      }}
      className="w-full sm:w-8 md:w-6 lg:w-6 xl:w-4"
      header={<h1 className="font-semibold text-2xl text-900">Nueva Especie</h1>}
    >
      <Form>
        <FieldColumn label="Nombre Cientifico" columns={{ sm: 8 }}>
          <InputText
            name="NombreCientifico"
            control={control}
            placeholder="Nombre Cientifico"
            rules={{ required: "Campo obligatorio" }}
          />
        </FieldColumn>

        <FieldColumn label="Nombre Comun" columns={{ sm: 6 }}>
          <InputText
            name="NombreComun"
            control={control}
            placeholder="Nombre Cientifico"
            rules={{ required: "Campo obligatorio" }}
          />
        </FieldColumn>

        <FieldColumn label="Familia" columns={{ sm: 6 }}>
          <InputText
            name="Familia"
            control={control}
            placeholder="Familia"
            rules={{ required: "Campo obligatorio" }}
          />
        </FieldColumn>

        <FieldColumn label="Clase" columns={{ sm: 6 }}>
          <InputText
            name="Clase"
            control={control}
            placeholder="Clase"
            rules={{ required: "Campo obligatorio" }}
          />
        </FieldColumn>

        <FieldColumn label="Sexo" columns={{ sm: 6 }}>
          <InputText
            name="Sexo"
            control={control}
            placeholder="Sexo"
            rules={{ required: "Campo obligatorio" }}
          />
        </FieldColumn>

        <FieldColumn label="Fecha de Llegada" columns={{ sm: 6 }}>
          <Controller
            name="FechaLlegada"
            control={control}
            defaultValue={null}  // Valor inicial
            rules={{ required: "Campo obligatorio" }}
            render={({ field }) => (
          <DatePicker
            placeholderText="Seleccione fecha y hora"
            selected={field.value ? new Date(field.value) : null}  // Convertir el valor si es necesario
            onChange={(date) => field.onChange(date)}  // Actualiza el valor al seleccionar una fecha
            showTimeSelect  // Esto habilita la selección de hora
            dateFormat="Pp"  // Formato que incluye fecha y hora
            timeFormat="HH:mm"  // Formato de hora
            />
          )}
          />
        </FieldColumn>


      <FieldColumn label="Procedencia" columns={{ sm: 6 }}>
          <InputText
            name="Procedencia"
            control={control}
            placeholder="Procedencia"
            rules={{ required: "Procedencia" }}
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
  );
};

export default EspecieSidebarCreate;
