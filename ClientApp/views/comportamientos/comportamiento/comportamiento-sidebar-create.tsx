import React, { useRef } from "react";
import { Calendar } from "primereact/calendar";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldValues } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import {
  Dropdown,
  InputText,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IComportamientoCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchAnimales, useFetchHabitats, useFetchUsuarios } from "ClientApp/hooks/useFetch";
import { useFetchDetalleComportamiento } from "ClientApp/hooks/useFetch/useFetchDetalleComportamiento";
import { useCreateComportamientos } from "ClientApp/hooks/useMutation/useMutationComportamientos";

interface IComportamientoSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  especieId: number | undefined;
}

const ComportamientoSidebarCreate = ({ onHide, visible }: IComportamientoSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: animales } = useFetchAnimales();
  const { data: usuarios } = useFetchUsuarios();
  const { data: habitats } = useFetchHabitats(); // Assuming this fetches habitats, adjust if necessary
  const { data: detalleComportamientos } = useFetchDetalleComportamiento(); // Moved inside the component
  const createComportamiento = useCreateComportamientos();

  const { control, handleSubmit, reset } = useForm<IComportamientoCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      AnimalId: undefined,
      UsuarioId: undefined,
      HabitatId: undefined,
      Fecha: null,
      DetalleComportamientoId: undefined,
    },
  });

  const onSubmit = async (data: IComportamientoCreate) => {
    const payload = {
      AnimalId: Number(data.AnimalId),
      HabitatId: Number(data.HabitatId),
      UsuarioId: Number(data.UsuarioId),
      Fecha: data.Fecha?.toISOString() || null,
      DetalleComportamientoId: data.DetalleComportamientoId,
    };

    console.log("Payload:", payload);
    // para mostrar mensajes
    try {
      const res = await createComportamiento.mutateAsync(payload);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || "Animal creado correctamente.",
      });
      reset();
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || "Hubo un error al crear el animal.",
      });
    }
  };

  return (
    <><Toast ref={toast} />
      <Sidebar
        position="right"
        visible={visible}
        onHide={() => {
          reset();
          onHide();
        }}
        className="w-full sm:w-8 md:w-6 lg:w-6 xl:w-4"
        header={<h1 className="font-semibold text-2xl text-900">Nuevo reporte</h1>}
      >
        <Form>

          <FieldColumn label="Animal" columns={{ sm: 6 }}>
            <Dropdown
              name="AnimalId"
              control={control}
              placeholder="Seleccione una Especie"
              rules={{ required: "Campo obligatorio" }}
              options={animales || []}
              optionLabel="Alias"
              optionValue="AnimalId" />
          </FieldColumn>


          <FieldColumn label="Usuario" columns={{ sm: 6 }}>
            <Dropdown
              name="UsuarioId"
              control={control}
              placeholder="Seleccione el usuario"
              rules={{ required: "Campo obligatorio" }}
              options={usuarios || []}
              optionLabel="NombreUsuario"
              optionValue="UsuarioId" />
          </FieldColumn>



          <FieldColumn label="Habitat" columns={{ sm: 6 }}>
            <Dropdown
              name="HabitatId"
              control={control}
              placeholder="Seleccione el habitat"
              rules={{ required: "Campo obligatorio" }}
              options={habitats || []}
              optionLabel="Nombre"
              optionValue="HabitatId" />
          </FieldColumn>

          <FieldColumn label="Comportamiento" columns={{ sm: 6 }}>
            <Dropdown
              name="DetalleComportamientoId"
              control={control}
              placeholder="Seleccione el habitat"
              rules={{ required: "Campo obligatorio" }}
              options={detalleComportamientos || []}
              optionLabel="DetallesComportamiento"
              optionValue="DetalleComportamientoId" />
          </FieldColumn>

          <FieldColumn label="Fecha de registro" columns={{ sm: 12 }}>
            <Controller
              name="Fecha"
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
                  required />
              )} />
          </FieldColumn>

        </Form>
        <div className="flex justify-content-end gap-2 mt-4">
          <Button
            label="Cancelar"
            severity="secondary"
            onClick={() => {
              reset();
              onHide();
            }} />
          <Button
            label="Guardar"
            severity="success"
            onClick={handleSubmit(onSubmit)} />
        </div>
      </Sidebar></>
  );
};

export default ComportamientoSidebarCreate;