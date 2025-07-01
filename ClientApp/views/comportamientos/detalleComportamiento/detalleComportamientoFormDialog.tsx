import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { AppMutationHooks, AppQueryHooks } from "#hooks";
import toast from "react-hot-toast";
import { IDetalleComportamiento } from "#interfaces";

interface DetallesComportamientosFormDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

export const DetallesComportamientoFormDialog: React.FC<DetallesComportamientosFormDialogProps> = ({
  id,
  visible,
  onHide,
}) => {
  const isEditMode = id > 0;

  const {
    data: detalleComportamientoData
  } = AppQueryHooks.useFetchOneDetalleComportamiento(id);

  const createMutation = AppMutationHooks.useCreateDetalleComportamientos();
  const updateMutation = AppMutationHooks.useUpdateDetalleComportamientos();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IDetalleComportamiento>();

  useEffect(() => {
    if (isEditMode && detalleComportamientoData) {
      reset(detalleComportamientoData);
    } else {
      reset({ DetalleComportamientoId: 0, DetallesComportamiento: "" });
    }
  }, [detalleComportamientoData, isEditMode, reset]);

  const onSubmit = async (data: IDetalleComportamiento) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(data);
        toast.success("comportamiento actualizado correctamente");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Comportamiento creado correctamente");
      }
      onHide();
    } catch (error) {
      toast.error("Ocurrió un error al guardar el comportamiento");
    }
  };

  return (
    <Dialog
      header={isEditMode ? "Editar comportamientos" : "Crear comportamiento"}
      visible={visible}
      onHide={onHide}
      className="w-full sm:w-10 md:w-8 lg:w-6 xl:w-4"
      modal
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4">
        <div>
          <label htmlFor="Nombre" className="font-semibold block mb-2">
            Nombre del comportamiento
          </label>
          <InputText
            id="Nombre"
            {...register("DetallesComportamiento", {
              required: "El nombre del comportamiento es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            className={errors.DetallesComportamiento ? "p-invalid" : ""}
            autoFocus
          />
          {errors.DetallesComportamiento && (
            <small className="p-error">{errors.DetallesComportamiento.message}</small>
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
