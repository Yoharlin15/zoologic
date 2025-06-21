import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import {IFamilia } from "#interfaces";
import { AppMutationHooks, AppQueryHooks } from "#hooks";
import toast from "react-hot-toast";

interface FamiliaFormDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

export const FamiliaFormDialog: React.FC<FamiliaFormDialogProps> = ({
  id,
  visible,
  onHide,
}) => {
  const isEditMode = id > 0;

  const {
    data: familiaData
  } = AppQueryHooks.useFetchOneRol(id);

  const createMutation = AppMutationHooks.useCreateFamilias();
  const updateMutation = AppMutationHooks.useUpdateFamilias();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFamilia>();

  useEffect(() => {
    if (isEditMode && familiaData) {
      reset(familiaData);
    } else {
      reset({ FamiliaId: 0, FamiliaNombre: "" });
    }
  }, [familiaData, isEditMode, reset]);

  const onSubmit = async (data: IFamilia) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(data);
        toast.success("familia actualizado correctamente");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("familia creado correctamente");
      }
      onHide();
    } catch (error) {
      toast.error("Ocurrió un error al guardar");
    }
  };

  return (
    <Dialog
      header={isEditMode ? "Editar familia" : "Crear familia"}
      visible={visible}
      onHide={onHide}
      className="w-full sm:w-10 md:w-8 lg:w-6 xl:w-4"
      modal
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4">
        <div>
          <label htmlFor="Nombre" className="font-semibold block mb-2">
            Nombre de la familia
          </label>
          <InputText
            id="Nombre"
            {...register("FamiliaNombre", {
              required: "El nombre de la familia es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            className={errors.FamiliaNombre ? "p-invalid" : ""}
            autoFocus
          />
          {errors.FamiliaNombre && (
            <small className="p-error">{errors.FamiliaNombre.message}</small>
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
