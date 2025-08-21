import React, { useEffect, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown, InputTextArea } from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IComportamientoCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchAnimales, useFetchOneComportamiento } from "ClientApp/hooks/useFetch";
import { useCreateComportamiento, useUpdateComportamiento } from "ClientApp/hooks/useMutation/useMutationComportamientos";
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext";

interface IComportamientoSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  comportamientoId?: number;
}

const ComportamientoSidebarForm = ({ id, onHide, visible }: IComportamientoSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: comportamientoData } = useFetchOneComportamiento(id!);
  const { data: animales } = useFetchAnimales();
  const createComportamiento = useCreateComportamiento();
  const updateComportamiento = useUpdateComportamiento();
  const { usuarioId } = useAuth();
  const { control, handleSubmit, reset } = useForm<IComportamientoCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      AnimalId: undefined,
      Entrenamiento: "",
      Conducta: "",
      Observaciones: "",
      CreadoPor: usuarioId
    },
  });

  // Prellenar el formulario si es edición
  useEffect(() => {
    if (comportamientoData) {
      reset({
        AnimalId: comportamientoData.AnimalId || undefined,
        Entrenamiento: comportamientoData.Entrenamiento || "",
        Conducta: comportamientoData.Conducta || "",
        Observaciones: comportamientoData.Observaciones || "",
        CreadoPor: comportamientoData.CreadoPor || usuarioId
      });
    }
  }, [comportamientoData, reset]);

  useEffect(() => {
    if (!id && visible) {
      reset({
        AnimalId: undefined,
        Entrenamiento: "",
        Conducta: "",
        Observaciones: "",
        CreadoPor: usuarioId
      });
    }
  }, [id, visible, reset]);

  const onSubmit = async (data: IComportamientoCreate) => {
    const payload = {
      AnimalId: Number(data.AnimalId),
      Entrenamiento: data.Entrenamiento,
      Conducta: data.Conducta,
      Observaciones: data.Observaciones,
      CreadoPor: Number(data.CreadoPor)
    };

    try {
      let res;
      if (id) {
        res = await updateComportamiento.mutateAsync({ ComportamientoId: id, ...payload });
      } else {
        res = await createComportamiento.mutateAsync(payload);
      }

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || `Comportamiento ${id ? "actualizado" : "creado"} correctamente.`,
      });

      reset();
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || `Hubo un error al ${id ? "actualizar" : "crear"} el comportamiento.`,
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
        header={<h1 className="font-semibold text-2xl text-900">{id ? "Editar comportamiento" : "Nuevo comportamiento"}</h1>}
      >
        <Form>
          <FieldColumn label="Animal">
            <Dropdown
              name="AnimalId"
              control={control}
              placeholder="Animal"
              rules={{ required: "Campo obligatorio" }}
              options={animales || []}
              optionLabel="IdentificadorUnico"
              optionValue="AnimalId"
            />
          </FieldColumn>

          <FieldColumn label="Entrenamiento">
            <Dropdown
              name="Entrenamiento"
              control={control}
              placeholder="Entrenamiento"
              rules={{ required: "Campo obligatorio" }}
              options={[
                { label: "Entrenamiento medico", value: "Entrenamiento medico" },
                { label: "Entrenamiento Cognitivo", value: "Entrenamiento Cognitivo" },
                { label: "Entrenamiento adaptativo", value: "Entrenamiento adaptativo" },
              ]}
            />
          </FieldColumn>

          <FieldColumn label="Conducta">
            <Dropdown
              name="Conducta"
              control={control}
              placeholder="Seleccione"
              rules={{ required: "Campo obligatorio" }}
              options={[
                { label: "Buena", value: "Buena" },
                { label: "Regular", value: "Regular" },
                { label: "Mala", value: "Mala" },
              ]}
            />
          </FieldColumn>

          <FieldColumn label="Observaciones">
            <InputTextArea
              name="Observaciones"
              control={control}
              placeholder="Observaciones"
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

export default ComportamientoSidebarForm;
