import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { IZona } from "#interfaces";
import { AppMutationHooks, AppQueryHooks } from "#hooks";
import toast from "react-hot-toast";

interface ZonasFormDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

export const ZonasFormDialog: React.FC<ZonasFormDialogProps> = ({
  id,
  visible,
  onHide,
}) => {
  const isEditMode = id > 0;

  const {
    data: zonaData
  } = AppQueryHooks.useFetchOneRol(id);

  const createMutation = AppMutationHooks.useCreateZonas();
  const updateMutation = AppMutationHooks.useUpdateZonas();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IZona>();

  useEffect(() => {
    if (isEditMode && zonaData) {
      reset(zonaData);
    } else {
      reset({ ZonaId: 0, NombreZona: "" });
    }
  }, [zonaData, isEditMode, reset]);

  const onSubmit = async (data: IZona) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(data);
        toast.success("Zona actualizada correctamente");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Zona creada correctamente");
      }
      onHide();
    } catch (error) {
      toast.error("Ocurrió un error al guardar la zona");
    }
  };

  return (
    <Dialog
      header={isEditMode ? "Editar zona" : "Crear zona"}
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
            {...register("NombreZona", {
              required: "El nombre del rol es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            className={errors.NombreZona ? "p-invalid" : ""}
            autoFocus
          />
          {errors.NombreZona && (
            <small className="p-error">{errors.NombreZona.message}</small>
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
