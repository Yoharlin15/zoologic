import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { useForm, Controller } from "react-hook-form";
import { AppMutationHooks, AppQueryHooks } from "#hooks";
import toast from "react-hot-toast";

interface ITratamientoEspecieForm {
  EspecieId: number;
  TratamientoIdList: number[];
}

interface TratamientoEspecieFormDialogProps {
  id: number;
  visible: boolean;
  onHide: () => void;
}

export const TratamientoEspecieFormDialog: React.FC<TratamientoEspecieFormDialogProps> = ({
  id,
  visible,
  onHide,
}) => {
  const isEditMode = id > 0;

  const { data: tratamientoEspecieData } = AppQueryHooks.useFetchOneTratamientoEspecie(id);
  const { data: especies = [] } = AppQueryHooks.useFetchEspecies();
  const { data: tratamientos = [] } = AppQueryHooks.useFetchTratamientos();

  const createMutation = AppMutationHooks.useCreateTratamientoEspecie(); // <- cambia este hook si lo necesitas
  const updateMutation = AppMutationHooks.useUpdateTratamientoEspecie(); // puedes eliminar esto si no se editarán múltiples

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ITratamientoEspecieForm>();

  useEffect(() => {
    if (isEditMode && tratamientoEspecieData) {
      reset({
        EspecieId: tratamientoEspecieData.EspecieId,
        TratamientoIdList: [tratamientoEspecieData.TratamientoId], // si necesitas llenar uno solo
      });
    } else {
      reset({
        EspecieId: 0,
        TratamientoIdList: [],
      });
    }
  }, [tratamientoEspecieData, isEditMode, reset]);

  const onSubmit = async (data: ITratamientoEspecieForm) => {
    try {
      for (const tratamientoId of data.TratamientoIdList) {
        await createMutation.mutateAsync({
          EspecieId: data.EspecieId,
          TratamientoId: tratamientoId,
        });
      }

      toast.success("Tratamientos asignados correctamente");
      onHide();
    } catch (error) {
      toast.error("Error al asignar tratamientos");
    }
  };


  return (
    <Dialog
      header={isEditMode ? "Editar Relación Tratamiento - Especie" : "Asignar Tratamientos a Especie"}
      visible={visible}
      onHide={onHide}
      className="w-full sm:w-10 md:w-8 lg:w-6 xl:w-4"
      modal
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4">
        <div>
          <label className="block mb-2 font-semibold">Especie</label>
          <Controller
            name="EspecieId"
            control={control}
            rules={{ required: "Seleccione una especie" }}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={especies}
                optionLabel="NombreComun"
                optionValue="EspecieId"
                placeholder="Seleccione una especie"
                className={errors.EspecieId ? "p-invalid w-full" : "w-full"}
              />
            )}
          />
          {errors.EspecieId && (
            <small className="p-error">{errors.EspecieId.message}</small>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold mt-4">Tratamientos</label>
          <Controller
            name="TratamientoIdList"
            control={control}
            rules={{ required: "Seleccione al menos un tratamiento" }}
            render={({ field }) => (
              <MultiSelect
                {...field}
                options={tratamientos}
                optionLabel="NombreTratamiento"
                optionValue="TratamientoId"
                placeholder="Seleccione tratamientos"
                className={errors.TratamientoIdList ? "p-invalid w-full" : "w-full"}
                display="chip"
              />
            )}
          />
          {errors.TratamientoIdList && (
            <small className="p-error">{errors.TratamientoIdList.message}</small>
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
            loading={isSubmitting || createMutation.isPending}
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
};
