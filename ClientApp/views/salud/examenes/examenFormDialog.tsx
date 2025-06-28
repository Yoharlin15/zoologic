import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { IExamen } from "#interfaces";
import { AppMutationHooks, AppQueryHooks } from "#hooks";
import toast from "react-hot-toast";

interface ExamenesFormDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

export const ExamenesFormDialog: React.FC<ExamenesFormDialogProps> = ({
  id,
  visible,
  onHide,
}) => {
  const isEditMode = id > 0;

  const {
    data: examenData
  } = AppQueryHooks.useFetchOneExamen(id);

  const createMutation = AppMutationHooks.useCreateExamenes();
  const updateMutation = AppMutationHooks.useUpdateExamenes();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IExamen>();

  useEffect(() => {
    if (isEditMode && examenData) {
      reset(examenData);
    } else {
      reset({ ExamenId: 0, Examen: "" });
    }
  }, [examenData, isEditMode, reset]);

  const onSubmit = async (data: IExamen) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(data);
        toast.success("Examen actualizado correctamente");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Examen creado correctamente");
      }
      onHide();
    } catch (error) {
      toast.error("Ocurrió un error al guardar el examen");
    }
  };

  return (
    <Dialog
      header={isEditMode ? "Editar examen" : "Crear examen"}
      visible={visible}
      onHide={onHide}
      className="w-full sm:w-10 md:w-8 lg:w-6 xl:w-4"
      modal
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4">
        <div>
          <label htmlFor="Examen" className="font-semibold block mb-2">
            Nombre del examen
          </label>
          <InputText
            id="Nombre"
            {...register("Examen", {
              required: "El nombre del examen es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            className={errors.Examen ? "p-invalid" : ""}
            autoFocus
          />
          {errors.Examen && (
            <small className="p-error">{errors.Examen.message}</small>
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
