import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import toast from "react-hot-toast";
import { IPermiso } from "ClientApp/interfaces/permisos";
import { AppMutationHooks, AppQueryHooks } from "#hooks";

interface PermisosFormDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

const moduloOptions = [
  { label: "Empleados", value: "Empleados" },
  { label: "Animales", value: "Animales" },
  { label: "Tratamientos", value: "Tratamientos" },
  { label: "Dietas", value: "Dietas" },
  { label: "Reportes", value: "Reportes" },
];

const accionesOptions = [
  { label: "Ver", value: "Ver" },
  { label: "Editar", value: "Editar" },
  { label: "Crear", value: "Crear" },
  { label: "Eliminar", value: "Eliminar" },
];

export const PermisosFormDialog: React.FC<PermisosFormDialogProps> = ({
  id,
  visible,
  onHide,
}) => {
  const isEditMode = id > 0;

  const { data: estadoData } = AppQueryHooks.useFetchOnePermiso(id);
  const createMutation = AppMutationHooks.useCreatePermisos();
  const updateMutation = AppMutationHooks.useUpdatePermisos();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IPermiso>();

  useEffect(() => {
    if (isEditMode && estadoData) {
      reset(estadoData);
    } else {
      reset({
        PermisoId: 0,
        Modulo: [],
        Accion: [],
        Descripcion: "",
      });
    }
  }, [estadoData, isEditMode, reset]);

  const onSubmit = async (data: IPermiso) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(data);
        toast.success("Permiso actualizado correctamente");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Permiso creado correctamente");
      }
      onHide();
    } catch (error) {
      toast.error("Ocurrió un error al guardar el permiso");
    }
  };

  return (
    <Dialog
      header={isEditMode ? "Editar Permiso" : "Crear Permiso"}
      visible={visible}
      onHide={onHide}
      className="w-full sm:w-10 md:w-8 lg:w-6 xl:w-4"
      modal
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4">
        {/* Módulo */}
        <div>
          <label htmlFor="Modulo" className="font-semibold block mb-2">
            Módulo(s)
          </label>
          <Controller
            name="Modulo"
            control={control}
            rules={{ required: "Debe seleccionar al menos un módulo" }}
            render={({ field }) => (
              <MultiSelect
                id="Modulo"
                value={field.value}
                options={moduloOptions}
                onChange={(e) => field.onChange(e.value)}
                placeholder="Seleccionar módulo(s)"
                display="chip"
                className={errors.Modulo ? "p-invalid w-full" : "w-full"}
              />
            )}
          />
          {errors.Modulo && (
            <small className="p-error">{errors.Modulo.message}</small>
          )}
        </div>

        {/* Acciones */}
        <div>
          <label htmlFor="Accion" className="font-semibold block mb-2 mt-4">
            Acción(es)
          </label>
          <Controller
            name="Accion"
            control={control}
            rules={{ required: "Debe seleccionar al menos una acción" }}
            render={({ field }) => (
              <MultiSelect
                id="Accion"
                value={field.value}
                options={accionesOptions}
                onChange={(e) => field.onChange(e.value)}
                placeholder="Seleccionar acción(es)"
                display="chip"
                className={errors.Accion ? "p-invalid w-full" : "w-full"}
              />
            )}
          />
          {errors.Accion && (
            <small className="p-error">{errors.Accion.message}</small>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="Descripcion" className="font-semibold block mb-2 mt-4">
            Descripción
          </label>
          <InputText
            id="Descripcion"
            {...register("Descripcion", {
              required: "La descripción es obligatoria",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
            })}
            className={errors.Descripcion ? "p-invalid w-full" : "w-full"}
          />
          {errors.Descripcion && (
            <small className="p-error">{errors.Descripcion.message}</small>
          )}
        </div>

        {/* Botones */}
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
