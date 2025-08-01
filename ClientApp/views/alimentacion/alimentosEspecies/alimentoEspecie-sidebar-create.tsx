import React, { useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldValues } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import {
    Dropdown,
  InputText,
  MultiSelect,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IAlimentoEspecieCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useCreateAlimentos } from "ClientApp/hooks/useMutation/useMutationAlimentos";
import { useFetchAlimentos, useFetchEspecies } from "ClientApp/hooks/useFetch";
import { useCreateAlimentosEspecies } from "ClientApp/hooks/useMutation/useMutationAlimentosEspecies";

interface IAlimentoEspecieSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  alimentoEspecieId: number | undefined;
}

const AlimentoEspecieSidebarCreate = ({ onHide, visible }: IAlimentoEspecieSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: alimentos } = useFetchAlimentos();
  const { data: especies } = useFetchEspecies();
  const createAlimento = useCreateAlimentosEspecies();

  const { control, handleSubmit, reset } = useForm<IAlimentoEspecieCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
        AlimentoId: undefined,
        EspecieId: undefined,
    },
  });

  const onSubmit = async (data: IAlimentoEspecieCreate) => {
    const payload = {
        AlimentoId: Number(data.AlimentoId),
        EspecieId: data.EspecieId,
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
        className="w-full sm:w-8 md:w-6 lg:w-6 xl:w-3"
        header={<h1 className="font-semibold text-2xl text-900">Nuevo alimento</h1>}
      >
        <Form>
          <FieldColumn label="Alimento" columns={{ sm: 12 }}>
            <Dropdown
              name="AlimentoId"
              control={control}
              placeholder="Seleccione un cargo"
              rules={{ required: "Campo obligatorio" }}
              options={alimentos || []}
              optionLabel="Nombre"
              optionValue="AlimentoId"
            />
          </FieldColumn>

          <FieldColumn label="Especie" columns={{ sm: 12 }}>
            <Dropdown
              name="EspecieId"
              control={control}
              placeholder="Seleccione un cargo"
              rules={{ required: "Campo obligatorio" }}
              options={especies || []}
              optionLabel="NombreComun"
              optionValue="EspecieId"
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
            }} />
          <Button
            label="Guardar"
            severity="success"
            onClick={handleSubmit(onSubmit)} />
        </div>
      </Sidebar></>
  );
};

export default AlimentoEspecieSidebarCreate;