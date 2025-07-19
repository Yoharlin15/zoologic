import React, { useEffect, useRef } from "react";
import { Calendar } from "primereact/calendar";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown, InputTextArea } from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { INecropsiaCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchAnimales, useFetchOneNecropsia, useFetchUsuarios } from "ClientApp/hooks/useFetch";
import { useCreateNecropsias, useUpdateNecropsias } from "ClientApp/hooks/useMutation/useMutationNecropsias";

interface INecropsiaSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  especieId?: number;
}

const NecropsiaSidebarForm = ({ id, onHide, visible }: INecropsiaSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: animales } = useFetchAnimales();
  const { data: usuarios } = useFetchUsuarios();
  const { data: necropsiaData } = useFetchOneNecropsia(id!);

  const createNecropsia = useCreateNecropsias();
  const updateNecropsia = useUpdateNecropsias();

  const { control, handleSubmit, reset } = useForm<INecropsiaCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      AnimalId: undefined,
      CausaMuerte: "",
      FechaMuerte: null,
      FechaNecropsia: null,
      UsuarioId: undefined,
    },
  });

  // Prellenar el formulario si es edición
  useEffect(() => {
    if (necropsiaData) {
      reset({
        AnimalId: necropsiaData.AnimalId || undefined,
        CausaMuerte: necropsiaData.CausaMuerte || "",
        FechaMuerte: necropsiaData.FechaMuerte || null,
        FechaNecropsia: necropsiaData.FechaNecrosia || null,
        UsuarioId: necropsiaData.UsuarioId || undefined,
      });
    }
  }, [necropsiaData, reset]);

  useEffect(() => {
    if (!id && visible) {
      reset({
        AnimalId: undefined,
        CausaMuerte: "",
        FechaMuerte: null,
        FechaNecropsia: null,
        UsuarioId: undefined,
      });
    }
  }, [necropsiaData, reset]);

  useEffect(() => {
    if (!id && visible) {
      reset({
        AnimalId: undefined,
        CausaMuerte: "",
        FechaMuerte: null,
        FechaNecropsia: null,
        UsuarioId: undefined,
      });
    }
  }, [id, visible, reset]);


  const onSubmit = async (data: INecropsiaCreate) => {
    const payload = {
      AnimalId: Number(data.AnimalId),
      CausaMuerte: data.CausaMuerte,
      FechaMuerte: data.FechaMuerte,
      FechaNecrosia: data.FechaNecropsia,
      UsuarioId: Number(data.UsuarioId),
    };

    try {
      let res;
      if (id) {
        res = await updateNecropsia.mutateAsync({ NecropsiaId: id, ...payload });
      } else {
        res = await createNecropsia.mutateAsync(payload);
      }

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || `Necropsia ${id ? "actualizada" : "creada"} correctamente.`,
      });

      reset();
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || `Hubo un error al ${id ? "actualizar" : "crear"} la necropsia.`,
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
        className="w-full sm:w-8 md:w-6 lg:w-4 xl:w-3"
        header={<h1 className="font-semibold text-2xl text-900">{id ? "Editar necropsia" : "Nueva necropsia"}</h1>}
      >
        <Form>
          <FieldColumn label="Animal">
            <Dropdown
              name="AnimalId"
              control={control}
              placeholder="Seleccione un Animal"
              rules={{ required: "Campo obligatorio" }}
              options={animales || []}
              optionLabel="IdentificadorUnico"
              optionValue="AnimalId"
            />
          </FieldColumn>

          <FieldColumn label="Fecha de muerte">
            <Controller
              name="FechaMuerte"
              control={control}
              render={({ field }) => (
                <Calendar
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  showIcon
                  dateFormat="dd/mm/yy"
                  placeholder="Seleccione una fecha"
                  className="w-full"
                  showButtonBar
                  required
                />
              )}
            />
          </FieldColumn>

          <FieldColumn label="Fecha Necropsia">
            <Controller
              name="FechaNecropsia"
              control={control}
              render={({ field }) => (
                <Calendar
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  showIcon
                  dateFormat="dd/mm/yy"
                  placeholder="Seleccione una fecha"
                  className="w-full"
                  showButtonBar
                  required
                />
              )}
            />
          </FieldColumn>

          <FieldColumn label="Realizada por">
            <Dropdown
              name="UsuarioId"
              control={control}
              placeholder="Seleccione un veterinario"
              rules={{ required: "Campo obligatorio" }}
              options={usuarios || []}
              optionLabel="NombreUsuario"
              optionValue="UsuarioId"
            />
          </FieldColumn>

          <FieldColumn label="Causa de muerte">
            <InputTextArea
              name="CausaMuerte"
              control={control}
              placeholder="Causa de muerte"
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

export default NecropsiaSidebarForm;
