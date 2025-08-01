import React, { useEffect, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown, InputNumber, InputText, InputTextArea } from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IHabitatCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchEspecies, useFetchEstados, useFetchOneHabitat } from "ClientApp/hooks/useFetch";
import { useCreateHabitats, useUpdateHabitats } from "ClientApp/hooks/useMutation/useMutationHabitats";

interface IHabitatSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  especieId?: number;
}

const HabitatSidebarForm = ({ id, onHide, visible }: IHabitatSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: estados } = useFetchEstados();
  const { data: especies } = useFetchEspecies();
  const { data: habitatData } = useFetchOneHabitat(id!);

  const createHabitat = useCreateHabitats();
  const updateHabitat = useUpdateHabitats();

  const { control, handleSubmit, reset } = useForm<IHabitatCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      Nombre: "",
      CantidadAnimales: undefined,
      EstadoId: undefined,
      Descripcion: undefined,
      EspecieId: undefined,
      Tamaño: undefined,
    },
  });

  // Prellenar el formulario si es edición
  useEffect(() => {
    if (habitatData) {
      reset({
        Nombre: habitatData.Nombre || "",
        CantidadAnimales: habitatData.CantidadAnimales || undefined,
        EstadoId: habitatData.EstadoId || undefined,
        Descripcion: habitatData.Descripcion || "",
        EspecieId: habitatData.EspecieId || undefined,
        Tamaño: habitatData.Tamaño || undefined,
      });
    }
  }, [habitatData, reset]);

  useEffect(() => {
    if (!id && visible) {
      reset({
        Nombre: "",
        CantidadAnimales: undefined,
        EstadoId: undefined,
        EspecieId: undefined,
        Descripcion: "",
        Tamaño: undefined,
      });
    }
  }, [id, visible, reset]);

  const onSubmit = async (data: IHabitatCreate) => {
    const payload = {
      Nombre: data.Nombre,
      CantidadAnimales: data.CantidadAnimales,
      EstadoId: Number(data.EstadoId),
      Descripcion: data.Descripcion,
      EspecieId: Number(data.EspecieId),
      Tamaño: data.Tamaño
    };

    try {
      let res;
      if (id) {
        res = await updateHabitat.mutateAsync({ HabitatId: id, ...payload });
      } else {
        res = await createHabitat.mutateAsync(payload);
      }

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || `Habitat ${id ? "actualizado" : "creado"} correctamente.`,
      });

      reset();
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || `Hubo un error al ${id ? "actualizar" : "crear"} el habitat.`,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Sidebar
        position="right"
        visible={visible}
        onHide={() => {
          reset();
          onHide();
        }}
        className="w-full sm:w-8 md:w-6 lg:w-3 xl:w-3"
        header={<h1 className="font-semibold text-2xl text-900">{id ? "Editar habitat" : "Nuevo habitat"}</h1>}
      >
        <Form>
          <FieldColumn label="Nombre">
            <InputText
              name="Nombre"
              control={control}
              placeholder="Nombre"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="CantidadAnimales">
            <InputNumber
              name="CantidadAnimales"
              control={control}
              placeholder="CantidadAnimales"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Especie">
            <Dropdown
              name="EspecieId"
              control={control}
              placeholder="Seleccione una Especie"
              rules={{ required: "Campo obligatorio" }}
              options={especies || []}
              optionLabel="NombreComun"
              optionValue="EspecieId"
            />
          </FieldColumn>

          <FieldColumn label="Tamaño (MT2)">
            <InputNumber
              name="Tamaño"
              control={control}
              placeholder="Tamaño"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          {id && (
            <FieldColumn label="Estado">
              <Dropdown
                name="EstadoId"
                control={control}
                placeholder="Seleccione un Estado"
                rules={{ required: "Campo obligatorio" }}
                options={estados || []}
                optionLabel="NombreEstado"
                optionValue="EstadoId" 
              />
            </FieldColumn>
          )}


          <FieldColumn label="Descripcion">
            <InputTextArea
              name="Descripcion"
              control={control}
              placeholder="Descripcion"
              rules={{ required: "Campo obligatorio" }}
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
      </Sidebar>
    </>
  );
};

export default HabitatSidebarForm;
