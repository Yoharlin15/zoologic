import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import {IRoles } from "#interfaces";
import { AppMutationHooks, AppQueryHooks } from "#hooks";
import toast from "react-hot-toast";

interface RolesFormDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

export const RolesFormDialog: React.FC<RolesFormDialogProps> = ({
  id,
  visible,
  onHide,
}) => {
  const isEditMode = id > 0;

  const {
    data: estadoData
  } = AppQueryHooks.useFetchOneRol(id);

  const createMutation = AppMutationHooks.useCreateRoles();
  const updateMutation = AppMutationHooks.useUpdateRoles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IRoles>();

  useEffect(() => {
    if (isEditMode && estadoData) {
      reset(estadoData);
    } else {
      reset({ RolId: 0, Nombre: "" });
    }
  }, [estadoData, isEditMode, reset]);

  const onSubmit = async (data: IRoles) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(data);
        toast.success("Rol actualizado correctamente");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Rol creado correctamente");
      }
      onHide();
    } catch (error) {
      toast.error("Ocurrió un error al guardar el rol");
    }
  };

  return (
    <Dialog
      header={isEditMode ? "Editar Rol" : "Crear Rol"}
      visible={visible}
      onHide={onHide}
      className="w-full sm:w-10 md:w-8 lg:w-6 xl:w-4"
      modal
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4">
        <div>
          <label htmlFor="Nombre" className="font-semibold block mb-2">
            Nombre del Rol
          </label>
          <InputText
            id="Nombre"
            {...register("Nombre", {
              required: "El nombre del rol es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            className={errors.Nombre ? "p-invalid" : ""}
            autoFocus
          />
          {errors.Nombre && (
            <small className="p-error">{errors.Nombre.message}</small>
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
