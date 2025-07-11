import React, { useEffect, useRef } from "react";
import { Calendar } from "primereact/calendar";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown, InputNumber, InputText, InputTextArea } from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IEmpleadoCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchCargos, useFetchDepartamentos, useFetchEstados, useFetchOneEmpleado } from "ClientApp/hooks/useFetch";
import { useCreateEmpleado, useUpdateEmpleado } from "ClientApp/hooks/useMutation/useMutationEmpleados";

interface IEmpleadoSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  animalId?: number;
}

const EmpleadoSidebarForm = ({ id, onHide, visible }: IEmpleadoSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: cargos } = useFetchCargos();
  const { data: departamentos } = useFetchDepartamentos();
  const { data: estados } = useFetchEstados();
  const { data: empleadoData } = useFetchOneEmpleado(id!);

  const createEmpleado = useCreateEmpleado();
  const updateEmpleado = useUpdateEmpleado();

  const { control, handleSubmit, reset } = useForm<IEmpleadoCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      Nombres: "",
      Apellidos: "",
      Cedula: "",
      FechaNacimiento: null,
      Sexo: "",
      Telefono: "",
      Nacionalidad: "",
      Direccion: "",
      FechaContratacion: null,
      CargoId: undefined,
      DepartamentoId: undefined,
      EstadoId: undefined
    },
  });

  // Prellenar el formulario si es edición
  useEffect(() => {
    if (id && empleadoData) {
      reset({
        Nombres: empleadoData.Nombres || "",
        Apellidos: empleadoData.Apellidos || "",
        Cedula: empleadoData.Cedula || "",
        FechaNacimiento: empleadoData.FechaNacimiento ? new Date(empleadoData.FechaNacimiento) : null,
        Sexo: empleadoData.Sexo || "",
        Telefono: empleadoData.Telefono || "",
        Nacionalidad: empleadoData.Nacionalidad || "",
        Direccion: empleadoData.Direccion || "",
        FechaContratacion: empleadoData.FechaContratacion ? new Date(empleadoData.FechaContratacion) : null,
        CargoId: empleadoData.CargoId || undefined,
        DepartamentoId: empleadoData.DepartamentoId || undefined,
        EstadoId: empleadoData.EstadoId || undefined,
      });
    } else if (!id) {
      // Si no hay id (crear nuevo), limpiar el formulario
      reset({
        Nombres: "",
        Apellidos: "",
        Cedula: "",
        FechaNacimiento: null,
        Sexo: "",
        Telefono: "",
        Nacionalidad: "",
        Direccion: "",
        FechaContratacion: null,
        CargoId: undefined,
        DepartamentoId: undefined,
        EstadoId: undefined,
      });
    }
  }, [id, empleadoData, reset]);


  const onSubmit = async (data: IEmpleadoCreate) => {
    const payload = {
      Nombres: data.Nombres,
      Apellidos: data.Apellidos,
      Cedula: data.Cedula,
      FechaNacimiento: data.FechaNacimiento?.toISOString() || null,
      Sexo: data.Sexo,
      Telefono: data.Telefono,
      Nacionalidad: data.Nacionalidad,
      Direccion: data.Direccion,
      FechaContratacion: data.FechaContratacion?.toISOString() || null,
      CargoId: Number(data.CargoId),
      DepartamentoId: Number(data.DepartamentoId),
      EstadoId: Number(data.EstadoId),
    };

    try {
      let res;
      if (id) {
        res = await updateEmpleado.mutateAsync({ EmpleadoId: id, ...payload });
      } else {
        res = await createEmpleado.mutateAsync(payload);
      }


      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || `Empleado ${id ? "actualizado" : "creado"} correctamente.`,
      });

      reset();
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || `Hubo un error al ${id ? "actualizar" : "crear"} el empleado.`,
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
        header={<h1 className="font-semibold text-2xl text-900">{id ? "Editar empleado" : "Nuevo empleado"}</h1>}
      >
        <Form>
          <FieldColumn label="Nombres" columns={{ sm: 6 }}>
            <InputText
              name="Nombres"
              control={control}
              placeholder="Nombres"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Apellidos" columns={{ sm: 6 }}>
            <InputText
              name="Apellidos"
              control={control}
              placeholder="Apellidos"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Cedula" columns={{ sm: 6 }}>
            <InputText
              name="Cedula"
              control={control}
              placeholder="Cedula"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Fecha de Nacimiento" columns={{ sm: 6 }}>
            <Controller
              name="FechaNacimiento"
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

          <FieldColumn label="Sexo" columns={{ sm: 6 }}>
            <Dropdown
              name="Sexo"
              control={control}
              placeholder="Seleccione sexo"
              rules={{ required: "Campo obligatorio" }}
              options={[
                { label: "Masculino", value: "Masculino" },
                { label: "Femenino", value: "Femenino" },
              ]}
            />
          </FieldColumn>

          <FieldColumn label="Telefono" columns={{ sm: 6 }}>
            <InputText
              name="Telefono"
              control={control}
              placeholder="Telefono"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Nacionalidad" columns={{ sm: 6 }}>
            <InputText
              name="Nacionalidad"
              control={control}
              placeholder="Nacionalidad"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Direccion" columns={{ sm: 6 }}>
            <InputText
              name="Direccion"
              control={control}
              placeholder="Direccion"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Fecha de contratacion" columns={{ sm: 6 }}>
            <Controller
              name="FechaContratacion"
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

          <FieldColumn label="Cargo" columns={{ sm: 6 }}>
            <Dropdown
              name="CargoId"
              control={control}
              placeholder="Seleccione un cargo"
              rules={{ required: "Campo obligatorio" }}
              options={cargos || []}
              optionLabel="Cargo"
              optionValue="CargoId"
            />
          </FieldColumn>

          <FieldColumn label="Departamento" columns={{ sm: 6 }}>
            <Dropdown
              name="DepartamentoId"
              control={control}
              placeholder="Seleccione un departamento"
              rules={{ required: "Campo obligatorio" }}
              options={departamentos || []}
              optionLabel="Nombre"
              optionValue="DepartamentoId"
            />
          </FieldColumn>

          <FieldColumn label="Estado" columns={{ sm: 6 }}>
            <Dropdown
              name="EstadoId"
              control={control}
              placeholder="Seleccione un cargo"
              rules={{ required: "Campo obligatorio" }}
              options={estados || []}
              optionLabel="NombreEstado"
              optionValue="EstadoId"
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

export default EmpleadoSidebarForm;
