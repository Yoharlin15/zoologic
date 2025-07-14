import React, { useEffect, useRef } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown, InputText } from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IEspecieCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchClases, useFetchFamilias, useFetchOneEspecie, useFetchProcedencias } from "ClientApp/hooks/useFetch";
import { useCreateEspecie, useUpdateEspecie } from "ClientApp/hooks/useMutation";

interface IEmpleadoSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  especieId?: number;
}

const EspecieSidebarForm = ({ id, onHide, visible }: IEmpleadoSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: familias } = useFetchFamilias();
  const { data: clases } = useFetchClases();
  const { data: procedencias } = useFetchProcedencias();
  const { data: especieData } = useFetchOneEspecie(id!);

  const createEspecie = useCreateEspecie();
  const updateEspecie = useUpdateEspecie();

  const { control, handleSubmit, reset } = useForm<IEspecieCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      NombreComun: "",
      NombreCientifico: "",
      FamiliaId: undefined,
      ClaseId: undefined,
      ProcedenciaId: undefined
    },
  });

  // Prellenar el formulario si es edición
  useEffect(() => {
    if (id && especieData) {
      reset({
        NombreCientifico: especieData.NombreCientifico || "",
        NombreComun: especieData.NombreComun || "",
        FamiliaId: especieData.FamiliaId || undefined,
        ClaseId: especieData.ClaseId || undefined,
        ProcedenciaId: especieData.ProcedenciaId || undefined,
      });
    } else if (!id) {
      // Si no hay id (crear nuevo), limpiar el formulario
      reset({
        NombreCientifico: "",
        NombreComun: "",
        FamiliaId: undefined,
        ClaseId: undefined,
        ProcedenciaId: undefined,
      });
    }
  }, [id, especieData, reset]);


  const onSubmit = async (data: IEspecieCreate) => {
    const payload = {
      NombreCientifico: data.NombreCientifico,
      NombreComun: data.NombreComun,
      FamiliaId: Number(data.FamiliaId),
      ClaseId: Number(data.ClaseId),
      ProcedenciaId: Number(data.ProcedenciaId),
    };

    try {
      let res;
      if (id) {
        res = await updateEspecie.mutateAsync({ EspecieId: id, ...payload });
      } else {
        res = await createEspecie.mutateAsync(payload);
      }


      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || `Especie ${id ? "actualizado" : "creado"} correctamente.`,
      });

      reset();
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || `Hubo un error al ${id ? "actualizar" : "crear"} la especie.`,
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
        className="w-full sm:w-8 md:w-6 lg:w-6 xl:w-4"
        header={<h1 className="font-semibold text-2xl text-900">{id ? "Editar especie" : "Nueva especie"}</h1>}
      >
        <Form>
          <FieldColumn label="Nombre cientifico" columns={{ sm: 6 }}>
            <InputText
              name="NombreCientifico"
              control={control}
              placeholder="Nombre cientifico"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Nombre comun" columns={{ sm: 6 }}>
            <InputText
              name="NombreComun"
              control={control}
              placeholder="Nombre comun"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Familia" columns={{ sm: 6 }}>
            <Dropdown
              name="FamiliaId"
              control={control}
              placeholder="Seleccione una familia"
              rules={{ required: "Campo obligatorio" }}
              options={familias || []}
              optionLabel="FamiliaNombre"
              optionValue="FamiliaId"
            />
          </FieldColumn>

          <FieldColumn label="Clase" columns={{ sm: 6 }}>
            <Dropdown
              name="ClaseId"
              control={control}
              placeholder="Seleccione una clase"
              rules={{ required: "Campo obligatorio" }}
              options={clases || []}
              optionLabel="ClaseNombre"
              optionValue="ClaseId"
            />
          </FieldColumn>

          <FieldColumn label="Procedencia" columns={{ sm: 6 }}>
            <Dropdown
              name="ProcedenciaId"
              control={control}
              placeholder="Seleccione una procedencia"
              rules={{ required: "Campo obligatorio" }}
              options={procedencias || []}
              optionLabel="ProcedenciaNombre"
              optionValue="ProcedenciaId"
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

export default EspecieSidebarForm;
