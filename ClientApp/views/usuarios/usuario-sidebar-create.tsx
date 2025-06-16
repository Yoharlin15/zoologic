import React, { useRef } from "react";
import { Calendar } from "primereact/calendar";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldValues } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import {
  Dropdown,
  InputNumber,
  InputText,
  InputTextArea,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IAnimalCreate, RegistroDatos } from "#interfaces";
import { Toast } from "primereact/toast";
import { useCreateAnimal } from "ClientApp/hooks/useMutation/useMutationAnimales";
import { useFetchEspecies, useFetchHabitats, useFetchPadres, useFetchRoles, useFetchZonas } from "ClientApp/hooks/useFetch";
import { useRegistrarUsuario } from "ClientApp/hooks/useMutation/useMutationSignup";
import { Password } from "primereact/password";

interface IUsuarioSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  especieId: number | undefined;
}

const UsuarioSidebarCreate = ({ onHide, visible }: IUsuarioSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: roles } = useFetchRoles();

  const createUser = useRegistrarUsuario();

  const { control, handleSubmit, reset } = useForm<RegistroDatos, FieldValues>({
    mode: "onChange",
    defaultValues: {
      Nombre: "",
      Email: "",
      Password: "",
      RolId: undefined
    },
  });

  const onSubmit = async (data: RegistroDatos) => {
    const payload = {
      Nombre: data.Nombre,
      Email: data.Email,
      RolId: Number(data.RolId),
      Password: data.Password,
    };

    console.log("Payload:", payload);
    // para mostrar mensajes
    try {
      const res = await createUser.mutateAsync(payload);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.data?.mensaje || "Usuario creado correctamente.",
      });
      reset();
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || "Hubo un error al crear el usuario.",
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
        header={<h1 className="font-semibold text-2xl text-900">Nuevo usuario</h1>}
      >
        <Form>
          <FieldColumn label="Nombre de usuario" columns={{ sm: 6 }}>
            <InputText
              name="NombreUsuario"
              control={control}
              placeholder="Usuario"
              rules={{ required: "Campo obligatorio" }} />
          </FieldColumn>

          <FieldColumn label="Email" columns={{ sm: 6 }}>
            <InputText
              name="Email"
              control={control}
              placeholder="Email"
              rules={{ required: "Campo obligatorio" }} />
          </FieldColumn>

          <FieldColumn label="Rol" columns={{ sm: 6 }}>
            <Dropdown
              name="RolId"
              control={control}
              placeholder="Seleccione un habitat"
              rules={{ required: "Campo obligatorio" }}
              options={roles || []}
              optionLabel="Nombre"
              optionValue="RolId" />
          </FieldColumn>

          <FieldColumn label="Contraseña" columns={{ sm: 6 }}>
            <InputText
              name="Password"
              control={control}
              placeholder="Contraseña"
              rules={{ required: "Campo obligatorio" }} />
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

export default UsuarioSidebarCreate;