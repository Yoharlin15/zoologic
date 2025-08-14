import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { IProcedencia } from "#interfaces";
import { AppMutationHooks, AppQueryHooks } from "#hooks";
import toast from "react-hot-toast";
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext";

interface ProcedenciaFormDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

export const ProcedenciaFormDialog: React.FC<ProcedenciaFormDialogProps> = ({
  id,
  visible,
  onHide,
}) => {
  const isEditMode = id > 0;

  const {
    data: procedenciaData
  } = AppQueryHooks.useFetchOneRol(id);

  const createMutation = AppMutationHooks.useCreateProcedencias();
  const updateMutation = AppMutationHooks.useUpdateProcedencias();

  const { usuarioId } = useAuth();  // Obtenemos el usuarioId desde el contexto

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IProcedencia>();

  useEffect(() => {
    if (isEditMode && procedenciaData) {
      reset(procedenciaData);
    } else {
      reset({ ProcedenciaId: 0, ProcedenciaNombre: "" });
    }
  }, [procedenciaData, isEditMode, reset]);

  const onSubmit = async (data: IProcedencia) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(data);
        toast.success("Procedencia actualizada correctamente");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Procedencia creada correctamente");
      }
      onHide();
    } catch (error) {
      toast.error("Ocurrió un error al guardar");
    }
  };

  return (
    <Dialog
      header={isEditMode ? "Editar procedencia" : "Crear procedencia"}
      visible={visible}
      onHide={onHide}
      className="w-full sm:w-10 md:w-8 lg:w-6 xl:w-4"
      modal
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4">
        <div>
          <label htmlFor="Nombre" className="font-semibold block mb-2">
            Nombre de la procedencia
          </label>
          <InputText
            id="Nombre"
            {...register("ProcedenciaNombre", {
              required: "El nombre de la procedencia es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            className={errors.ProcedenciaNombre ? "p-invalid" : ""}
            autoFocus
          />
          {errors.ProcedenciaNombre && (
            <small className="p-error">{errors.ProcedenciaNombre.message}</small>
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
