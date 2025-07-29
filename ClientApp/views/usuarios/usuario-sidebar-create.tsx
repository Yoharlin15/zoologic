import React, { useEffect, useRef } from "react";
import { Controller, FieldValues, useForm, useWatch } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";

import {
  Dropdown,
  InputText,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { RegistroDatos } from "#interfaces";

import { useRegistrarUsuario } from "ClientApp/hooks/useMutation/useMutationSignup";
import {
  useCheckEmailExistence,
  useFetchEmpleados,
  useFetchRoles,
} from "ClientApp/hooks/useFetch";
import { watch } from "fs/promises";

interface IUsuarioSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  usuarioId: number | undefined;
  onCreateSuccess?: () => void;
}

const UsuarioSidebarCreate = ({ onHide, visible, onCreateSuccess }: IUsuarioSidebarProps) => {
  const toast = useRef<Toast>(null);
  const { data: roles } = useFetchRoles();
  const { data: empleados } = useFetchEmpleados();

  const createUser = useRegistrarUsuario();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<RegistroDatos & { ConfirmPassword: string }, FieldValues>({
    mode: "onChange",
    defaultValues: {
      Nombre: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      RolId: undefined,
    },
  });

  const passwordValue = useWatch({ control, name: "Password" });

  const { data: emailExistente, isLoading, isError } = useCheckEmailExistence(
    watch("Email")  // Verificamos el email cada vez que cambie
  );

  useEffect(() => {
    if (emailExistente) {
      setValue("Email", "");  // Limpiar email si ya existe
    }
  }, [emailExistente, setValue]);

  const onSubmit = async (data: RegistroDatos & { ConfirmPassword: string }) => {
    const payload = {
      Nombre: data.Nombre,
      Email: data.Email,
      RolId: Number(data.RolId),
      Password: data.Password,
      EmpleadoId: Number(data.EmpleadoId),
    };

    try {
      const res = await createUser.mutateAsync(payload);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.data?.mensaje || "Usuario creado correctamente.",
      });
      reset();
      onHide();
      onCreateSuccess?.();
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
        header={<h1 className="font-semibold text-2xl text-900">Nuevo usuario</h1>}
      >
        <Form>
          <FieldColumn label="Nombre de usuario" columns={{ sm: 6 }}>
            <InputText
              name="Nombre"
              control={control}
              placeholder="Usuario"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Email" columns={{ sm: 6 }}>
            <InputText
              name="Email"
              control={control}
              placeholder="Email"
              rules={{
                required: "Campo obligatorio",
                validate: (value) => {
                  if (emailExistente) {
                    return "Este email ya está registrado";
                  }
                  return true;
                },
              }}
            />
            {isLoading && <small>Verificando email...</small>}
            {isError && <small>Hubo un error al verificar el email.</small>}
            {emailExistente && <small style={{ color: "red" }}>Este email ya está registrado.</small>}
          </FieldColumn>

          <FieldColumn label="Rol" columns={{ sm: 6 }}>
            <Dropdown
              name="RolId"
              control={control}
              placeholder="Seleccione un rol"
              rules={{ required: "Campo obligatorio" }}
              options={roles || []}
              optionLabel="Nombre"
              optionValue="RolId"
            />
          </FieldColumn>

          <FieldColumn label="Empleado" columns={{ sm: 6 }}>
            <Dropdown
              name="EmpleadoId"
              control={control}
              placeholder="Seleccione un empleado"
              rules={{ required: "Campo obligatorio" }}
              options={empleados || []}
              optionLabel="Nombres"
              optionValue="EmpleadoId"
            />
          </FieldColumn>

          <FieldColumn label="Contraseña" columns={{ sm: 6 }}>
            <Controller
              name="Password"
              control={control}
              rules={{ required: "Campo obligatorio" }}
              render={({ field, fieldState }) => (
                <Password
                  {...field}
                  placeholder="Contraseña"
                  toggleMask
                  feedback
                  className={fieldState.error ? "p-invalid" : ""}
                />
              )}
            />
          </FieldColumn>

          <FieldColumn label="Confirmar contraseña" columns={{ sm: 6 }}>
            <Controller
              name="ConfirmPassword"
              control={control}
              rules={{
                required: "Campo obligatorio",
                validate: (value) =>
                  value === passwordValue || "Las contraseñas no coinciden",
              }}
              render={({ field, fieldState }) => (
                <Password
                  {...field}
                  placeholder="Confirmar contraseña"
                  toggleMask
                  feedback={false}
                  className={fieldState.error ? "p-invalid" : ""}
                />
              )}
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

export default UsuarioSidebarCreate;
