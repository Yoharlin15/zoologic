import React, { useEffect, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown, InputText, InputTextArea } from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IAlimentoCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import {useFetchOneAlimento, useFetchUnidadesMedidas } from "ClientApp/hooks/useFetch";
import { useCreateAlimentos, useUpdateAlimentos } from "ClientApp/hooks/useMutation";
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext";

interface IAlimentoSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  alimentoId?: number;
}

const AlimentoSidebarForm = ({ id, onHide, visible }: IAlimentoSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: medidas } = useFetchUnidadesMedidas();
  const { data: alimentoData } = useFetchOneAlimento(id!);

  const createAlimentos = useCreateAlimentos();
  const updateAlimentos = useUpdateAlimentos();

  const { usuarioId } = useAuth();

  const { control, handleSubmit, reset } = useForm<IAlimentoCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      Nombre: "",
      UnidadMedidaId: undefined,
      Descripcion: undefined,
      CreadoPor: usuarioId
    },
  });

  // Prellenar el formulario si es edición
  useEffect(() => {
    if (alimentoData) {
      reset({
        Nombre: alimentoData.Nombre || "",
        UnidadMedidaId: alimentoData.CantidadAnimales || undefined,
        Descripcion: alimentoData.Descripcion || "",
        CreadoPor: alimentoData.CreadoPor || usuarioId
      });
    }
  }, [alimentoData, reset]);

  useEffect(() => {
    if (!id && visible) {
      reset({
        Nombre: "",
        UnidadMedidaId: undefined,
        Descripcion: "",
        CreadoPor: usuarioId
      });
    }
  }, [id, visible, reset]);

  const onSubmit = async (data: IAlimentoCreate) => {
    const payload = {
      Nombre: data.Nombre,
      Descripcion: data.Descripcion,
      UnidadMedidaId: Number(data.UnidadMedidaId),
      CreadoPor: data.CreadoPor || usuarioId
    };

    try {
      let res;
      if (id) {
        res = await updateAlimentos.mutateAsync({ AlimentoId: id, ...payload });
      } else {
        res = await createAlimentos.mutateAsync(payload);
      }

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || `Alimento ${id ? "actualizado" : "creado"} correctamente.`,
      });

      reset();
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || `Hubo un error al ${id ? "actualizar" : "crear"} el alimento.`,
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
        className="w-full sm:w-8 md:w-6 lg:w-3 xl:w-3"
        header={<h1 className="font-semibold text-2xl text-900">{id ? "Editar alimento" : "Nuevo alimento"}</h1>}
      >
        <Form>
          <FieldColumn label="Nombre">
            <InputText
              name="Nombre"
              control={control}
              placeholder="Nombre"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Unidad de medida">
            <Dropdown
              name="UnidadMedidaId"
              control={control}
              placeholder="Seleccione una Especie"
              rules={{ required: "Campo obligatorio" }}
              options={medidas || []}
              optionLabel="UnidadMedida"
              optionValue="UnidadMedidaId"
            />
          </FieldColumn>

          <FieldColumn label="Descripcion">
            <InputTextArea
              name="Descripcion"
              control={control}
              placeholder="Descripcion"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <input type="hidden" name="CreadoPor" value={usuarioId!} />
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

export default AlimentoSidebarForm;
