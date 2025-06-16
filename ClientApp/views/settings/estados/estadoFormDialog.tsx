import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { IEstados } from "#interfaces";
import { AppMutationHooks, AppQueryHooks } from "#hooks";
import toast from "react-hot-toast";

interface EstadoFormDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

export const EstadoFormDialog: React.FC<EstadoFormDialogProps> = ({
  id,
  visible,
  onHide,
}) => {
  const isEditMode = id > 0;

  const {
    data: estadoData
  } = AppQueryHooks.useFetchOneEstado(id);

  const createMutation = AppMutationHooks.useCreateEstados();
  const updateMutation = AppMutationHooks.useUpdateEstados();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IEstados>();

  useEffect(() => {
    if (isEditMode && estadoData) {
      reset(estadoData);
    } else {
      reset({ EstadoId: 0, NombreEstado: "" });
    }
  }, [estadoData, isEditMode, reset]);

  const onSubmit = async (data: IEstados) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(data);
        toast.success("Estado actualizado correctamente");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Estado creado correctamente");
      }
      onHide();
    } catch (error) {
      toast.error("Ocurrió un error al guardar el estado");
    }
  };

  return (
    <Dialog
      header={isEditMode ? "Editar Estado" : "Crear Estado"}
      visible={visible}
      onHide={onHide}
      className="w-full sm:w-10 md:w-8 lg:w-6 xl:w-4"
      modal
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4">
        <div>
          <label htmlFor="Nombre" className="font-semibold block mb-2">
            Nombre del Estado
          </label>
          <InputText
            id="Nombre"
            {...register("NombreEstado", {
              required: "El nombre del estado es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            className={errors.NombreEstado ? "p-invalid" : ""}
            autoFocus
          />
          {errors.NombreEstado && (
            <small className="p-error">{errors.NombreEstado.message}</small>
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
