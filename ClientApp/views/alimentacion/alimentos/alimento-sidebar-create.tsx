import React, { useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldValues } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import {
  InputText,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IAlimentoCreate, IAnimalCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useCreateAlimentos } from "ClientApp/hooks/useMutation/useMutationAlimentos";

interface IAlimentoSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  alimentoId: number | undefined;
}

const AlimentoSidebarCreate = ({ onHide, visible }: IAlimentoSidebarProps) => {
  const toast = useRef<Toast>(null);
  
  const createAlimento = useCreateAlimentos();

  const { control, handleSubmit, reset } = useForm<IAlimentoCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
        Nombre: "",
        Descripcion: "",
    },
  });

  const onSubmit = async (data: IAlimentoCreate) => {
    const payload = {
        Nombre: data.Nombre,
        Descripcion: data.Descripcion,
    };

    console.log("Payload:", payload);
    // para mostrar mensajes
    try {
      const res = await createAlimento.mutateAsync(payload);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || "Alimento creado correctamente.",
      });
      reset();
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || "Hubo un error al crear el alimento.",
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
        header={<h1 className="font-semibold text-2xl text-900">Nuevo alimento</h1>}
      >
        <Form>
          <FieldColumn label="Nombre" columns={{ sm: 6 }}>
            <InputText
              name="Nombre"
              control={control}
              placeholder="nombre del alimento"
              rules={{ required: "Campo obligatorio" }} />
          </FieldColumn>

          <FieldColumn label="Descripcion" columns={{ sm: 6 }}>
            <InputText
              name="Descripcion"
              control={control}
              placeholder="Descrpcion del alimento"
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

export default AlimentoSidebarCreate;