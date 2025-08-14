import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import {IClase, IFamilia } from "#interfaces";
import { AppMutationHooks, AppQueryHooks } from "#hooks";
import toast from "react-hot-toast";
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext";

interface ClaseFormDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

export const ClaseFormDialog: React.FC<ClaseFormDialogProps> = ({
  id,
  visible,
  onHide,
}) => {
  const isEditMode = id > 0;

  const {
    data: claseData
  } = AppQueryHooks.useFetchOneRol(id);

  const createMutation = AppMutationHooks.useCreateClases();
  const updateMutation = AppMutationHooks.useUpdateClases();

  const { usuarioId } = useAuth();  // Obtenemos el usuarioId desde el contexto
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IClase>();

  useEffect(() => {
    if (isEditMode && claseData) {
      reset(claseData);
    } else {
      reset({ ClaseId: 0, ClaseNombre: "" });
    }
  }, [claseData, isEditMode, reset]);

  const onSubmit = async (data: IClase) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(data);
        toast.success("Clase actualizada correctamente");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Clase creada correctamente");
      }
      onHide();
    } catch (error) {
      toast.error("Ocurrió un error al guardar");
    }
  };

  return (
    <Dialog
      header={isEditMode ? "Editar clase" : "Crear clase"}
      visible={visible}
      onHide={onHide}
      className="w-full sm:w-10 md:w-8 lg:w-6 xl:w-4"
      modal
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4">
        <div>
          <label htmlFor="Nombre" className="font-semibold block mb-2">
            Nombre de la clase
          </label>
          <InputText
            id="Nombre"
            {...register("ClaseNombre", {
              required: "El nombre de la clase es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            className={errors.ClaseNombre ? "p-invalid" : ""}
            autoFocus
          />
          {errors.ClaseNombre && (
            <small className="p-error">{errors.ClaseNombre.message}</small>
          )}
        </div>

        {/* Campo oculto para "CreadoPor" */}
        <input type="hidden" {...register("CreadoPor")} value={usuarioId!} />

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
