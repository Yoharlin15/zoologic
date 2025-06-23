import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import {IRoles } from "#interfaces";
import { AppMutationHooks, AppQueryHooks } from "#hooks";
import toast from "react-hot-toast";
import { ICargo } from "ClientApp/interfaces/cargos";

interface CargosFormDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

export const CargosFormDialog: React.FC<CargosFormDialogProps> = ({
  id,
  visible,
  onHide,
}) => {
  const isEditMode = id > 0;

  const {
    data: estadoData
  } = AppQueryHooks.useFetchOneRol(id);

  const createMutation = AppMutationHooks.useCreateCargos();
  const updateMutation = AppMutationHooks.useUpdateCargos();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ICargo>();

  useEffect(() => {
    if (isEditMode && estadoData) {
      reset(estadoData);
    } else {
      reset({ CargoId: 0, Cargo: "" });
    }
  }, [estadoData, isEditMode, reset]);

  const onSubmit = async (data: ICargo) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(data);
        toast.success("Cargo actualizado correctamente");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Cargo creado correctamente");
      }
      onHide();
    } catch (error) {
      toast.error("Ocurrió un error al guardar el cargo");
    }
  };

  return (
    <Dialog
      header={isEditMode ? "Editar cargo" : "Crear cargo"}
      visible={visible}
      onHide={onHide}
      className="w-full sm:w-10 md:w-8 lg:w-6 xl:w-4"
      modal
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4">
        <div>
          <label htmlFor="Nombre" className="font-semibold block mb-2">
            Nombre del cargo
          </label>
          <InputText
            id="Nombre"
            {...register("Cargo", {
              required: "El nombre del cargo es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            className={errors.Cargo ? "p-invalid" : ""}
            autoFocus
          />
          {errors.Cargo && (
            <small className="p-error">{errors.Cargo.message}</small>
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
