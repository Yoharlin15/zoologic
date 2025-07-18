import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import {ITratamiento } from "#interfaces";
import { AppMutationHooks, AppQueryHooks } from "#hooks";
import toast from "react-hot-toast";

interface TratamientosFormDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

export const TratamientosFormDialog: React.FC<TratamientosFormDialogProps> = ({
  id,
  visible,
  onHide,
}) => {
  const isEditMode = id > 0;

  const {
    data: tratamientoData
  } = AppQueryHooks.useFetchOneRol(id);

  const createMutation = AppMutationHooks.useCreateTratamientos();
  const updateMutation = AppMutationHooks.useUpdateTratamientos();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ITratamiento>();

  useEffect(() => {
    if (isEditMode && tratamientoData) {
      reset(tratamientoData);
    } else {
      reset({ TratamientoId: 0, NombreTratamiento: "" });
    }
  }, [tratamientoData, isEditMode, reset]);

  const onSubmit = async (data: ITratamiento) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(data);
        toast.success("Tratamiento actualizado correctamente");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Tratamiento creado correctamente");
      }
      onHide();
    } catch (error) {
      toast.error("Ocurrió un error al guardar el tratamiento");
    }
  };

  return (
    <Dialog
      header={isEditMode ? "Editar tratamiento" : "Crear tratamiento"}
      visible={visible}
      onHide={onHide}
      className="w-full sm:w-10 md:w-8 lg:w-6 xl:w-4"
      modal
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4">
        <div>
          <label htmlFor="Nombre" className="font-semibold block mb-2">
            Nombre del tratamiento
          </label>
          <InputText
            id="Nombre"
            {...register("NombreTratamiento", {
              required: "El nombre del rol es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            className={errors.NombreTratamiento ? "p-invalid" : ""}
            autoFocus
          />
          {errors.NombreTratamiento && (
            <small className="p-error">{errors.NombreTratamiento.message}</small>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            label="Cancelar"
            icon="pi pi-times"
            className="p-button-secondary"
            onClick={onHide}
            type="button"
          />
          <Button
            label={isEditMode ? "Actualizar" : "Guardar"}
            icon="pi pi-check"
            loading={isSubmitting || createMutation.isPending || updateMutation.isPending}
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
};
