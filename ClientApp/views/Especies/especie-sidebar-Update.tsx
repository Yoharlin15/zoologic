import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import {
  InputText,
  InputTextArea,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IEspecieCreate } from "#interfaces";
import toast from "react-hot-toast";
import { useUpdateEspecie } from "ClientApp/hooks/useMutation"; // Importa solo el hook de actualización

interface IEspecieSidebarProps {
  visible: boolean;
  onHide: () => void;
  especieId: number | undefined; // ID de la especie a actualizar (obligatorio)
  especie?: IEspecieCreate; // Datos de la especie existente
}

const EspecieSidebarUpdate = ({ onHide, visible, especieId, especie }: IEspecieSidebarProps) => {
  const updateEspecie = useUpdateEspecie(); // Hook para actualizar la especie

  const { control, handleSubmit, reset } = useForm<IEspecieCreate>({
    mode: "onChange",
    defaultValues: especie || {
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

  const onSubmit = async (data: IEspecieCreate) => {
    try {
      // Llama a la función de actualización con el ID y los datos actualizados
      const { EspecieId, ...restData } = data;
      const response = await updateEspecie.mutateAsync({ EspecieId: especieId, ...restData });
      if (response) {
        toast.success("Especie actualizada exitosamente!");
        reset(); // Resetear el formulario
        onHide(); // Cerrar el sidebar
      }
    } catch (error) {
      toast.error("Error al actualizar la especie.");
    }
  };

  return (
    <Sidebar
      position="right"
      visible={visible}
      onHide={() => {
        reset();
        onHide();
      }}
      className="w-full sm:w-8 md:w-6 lg:w-6 xl:w-4"
      header={<h1 className="font-semibold text-2xl text-900">Editar Especie</h1>}
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
            placeholder="Nombre Comun"
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
            defaultValue={null}
            rules={{ required: "Campo obligatorio" }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Seleccione fecha y hora"
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(date)}
                showTimeSelect
                dateFormat="Pp"
                timeFormat="HH:mm"
              />
            )}
          />
        </FieldColumn>

        <FieldColumn label="Procedencia" columns={{ sm: 6 }}>
          <InputText
            name="Procedencia"
            control={control}
            placeholder="Procedencia"
            rules={{ required: "Campo obligatorio" }}
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
          label="Actualizar"
          severity="success"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </Sidebar>
  );
};

export default EspecieSidebarUpdate;