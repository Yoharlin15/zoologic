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
  empleadoId?: number;
}

const EmpleadoSidebarForm = ({ id, onHide, visible }: IEmpleadoSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: cargos } = useFetchCargos();
  const { data: departamentos } = useFetchDepartamentos();
  const { data: estados } = useFetchEstados();
  const { data: empleadoData } = useFetchOneEmpleado(id!);

  const createEmpleado = useCreateEmpleado();
  const updateEmpleado = useUpdateEmpleado();

  const countries = [
    { name: "República Dominicana", code: "DO" },
    { name: "Estados Unidos", code: "US" },
    { name: "México", code: "MX" },
    { name: "España", code: "ES" },
    { name: "Francia", code: "FR" },
    { name: "Alemania", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japón", code: "JP" },
    { name: "Haití", code: "HT" },
  ];

  const countryOptionTemplate = (option: { name: string; code: string } | null | undefined) => {
  if (!option) return <span className="text-500">Sin país</span>;

  return (
    <div className="flex align-items-center">
      <img
        alt={option.name}
        src={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png`}
        style={{ width: '20px', marginRight: '10px' }}
      />
      <span>{option.name}</span>
    </div>
  );
};


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
    const hoy = new Date();

    if (data.FechaNacimiento) {
    const edadMinima = new Date(
      hoy.getFullYear() - 18,
      hoy.getMonth(),
      hoy.getDate()
    );

  if (data.FechaNacimiento > edadMinima) {
      toast.current?.show({
        severity: "warn",
        summary: "Edad mínima",
        detail: "El empleado debe tener al menos 18 años",
      });
      return;
    }
  };

  if (data.FechaContratacion && data.FechaContratacion > hoy) {
    toast.current?.show({
      severity: "warn",
      summary: "Fecha inválida",
      detail: "La fecha de contratación no puede ser mayor al día actual",
    });
    return;
  }

    const payload = {
      Nombres: data.Nombres,
      Apellidos: data.Apellidos,
      Cedula: data.Cedula,
      FechaNacimiento: data.FechaNacimiento?.toISOString() || null,
      Sexo: data.Sexo,
      Telefono: data.Telefono,
      Nacionalidad: data.Nacionalidad, // Aquí guardamos el código del país (ej. "DO")
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
            <InputText name="Nombres" control={control} placeholder="Nombres" rules={{ required: "Campo obligatorio" }} />
          </FieldColumn>

          <FieldColumn label="Apellidos" columns={{ sm: 6 }}>
            <InputText name="Apellidos" control={control} placeholder="Apellidos" rules={{ required: "Campo obligatorio" }} />
          </FieldColumn>

          <FieldColumn label="Cedula" columns={{ sm: 6 }}>
            <InputText name="Cedula" control={control} placeholder="Cédula" rules={{ required: "Campo obligatorio" }} />
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
            <InputText name="Telefono" control={control} placeholder="Teléfono" rules={{ required: "Campo obligatorio" }} />
          </FieldColumn>

          <FieldColumn label="Nacionalidad" columns={{ sm: 6 }}>
            <Dropdown
              name="Nacionalidad"
              control={control}
              placeholder="Seleccione un país"
              rules={{ required: "Campo obligatorio" }}
              options={countries}
              optionLabel="name"
              optionValue="code"
              itemTemplate={countryOptionTemplate}
              valueTemplate={countryOptionTemplate}
              className="w-full"
            />
          </FieldColumn>

          <FieldColumn label="Direccion" columns={{ sm: 6 }}>
            <InputText name="Direccion" control={control} placeholder="Dirección" rules={{ required: "Campo obligatorio" }} />
          </FieldColumn>

          <FieldColumn label="Fecha de contratación" columns={{ sm: 6 }}>
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
        </Form>

        <div className="flex justify-content-end gap-2 mt-4">
          <Button label="Cancelar" severity="secondary" onClick={() => { reset(); onHide(); }} />
          <Button label="Guardar" severity="success" onClick={handleSubmit(onSubmit)} />
        </div>
      </Sidebar>
    </>
  );
};

export default EmpleadoSidebarForm;
