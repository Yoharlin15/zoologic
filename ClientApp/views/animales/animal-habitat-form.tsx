import React, { useRef, useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import {
  Dropdown,
  InputText,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IAnimalHabitatUpdate } from "#interfaces";
import { useFetchHabitats } from "ClientApp/hooks/useFetch";
import { useUpdateAnimalHabitat } from "ClientApp/hooks/useMutation/useMutationAnimales";

interface IHabitatModalUpdateProps {
  idAnimal: number | undefined; // ID del animal a actualizar
  visible: boolean;
  onHide: () => void;
}

const HabitatModalUpdate = ({ visible, onHide, idAnimal }: IHabitatModalUpdateProps) => {
  const toast = useRef<Toast>(null);
  const { data: habitats } = useFetchHabitats();
  const updateHabitat = useUpdateAnimalHabitat(); // mutation para actualizar

  const { control, handleSubmit, reset } = useForm<IAnimalHabitatUpdate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      AnimalId: idAnimal,
      HabitatId: undefined,
    },
  });

  // Si cambia el ID, resetea el form con el nuevo valor
  useEffect(() => {
    reset({ AnimalId: idAnimal, HabitatId: undefined });
  }, [idAnimal]);

  const onSubmit = async (data: IAnimalHabitatUpdate) => {
    const payload: IAnimalHabitatUpdate = {
      AnimalId: idAnimal!,
      HabitatId: Number(data.HabitatId),
    };

    try {
      const res = await updateHabitat.mutateAsync(payload);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || "Hábitat asignado correctamente.",
      });
      reset();
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || "Hubo un error al actualizar el hábitat.",
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Asignar Hábitat"
        visible={visible}
        onHide={() => {
          reset();
          onHide();
        }}
        style={{ width: "30rem" }}
        modal
        closable
        draggable={false}
        className="p-fluid"
      >
        <Form>
          <FieldColumn label="Hábitat" columns={{ sm: 12 }}>
            <Dropdown
              name="HabitatId"
              control={control}
              placeholder="Seleccione el hábitat"
              rules={{ required: "Campo obligatorio" }}
              options={habitats || []}
              optionLabel="Nombre"
              optionValue="HabitatId"
            />
          </FieldColumn>
        </Form>

        <div className="flex justify-content-end gap-2 mt-4">
          <Button
            label="Cancelar"
            severity="secondary"
            onClick={() => {
              reset();
              onHide();
            }}
          />
          <Button
            label="Guardar"
            severity="success"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </Dialog>
    </>
  );
};

export default HabitatModalUpdate;
