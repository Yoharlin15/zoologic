import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useRegistrarUsuario } from "../../hooks/useMutation/useMutationSignup";
import { RegistroDatos } from "#interfaces";
import { Routes } from "#core";

interface SignupFormData {
  Username: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  Rol: number;
}

const roles = [
  { label: "Administrador", value: 1 },
];

const Signup = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  const toast = useRef<Toast>(null);
  const { mutate: registrarUsuario, isPending } = useRegistrarUsuario();
  const password = watch("Password");

  const onSubmit = (data: SignupFormData) => {
    const datos: RegistroDatos = {
      Nombre: data.Username,
      Email: data.Email,
      Password: data.Password,
      RolId: data.Rol,
    };

    registrarUsuario(datos, {
      onSuccess: (res) => {
        toast.current?.show({
          severity: "success",
          summary: "Registro exitoso",
          detail: res?.data?.mensaje || "Usuario creado correctamente",
        });
      },
      onError: (error) => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error?.message || "Hubo un error al registrar",
        });
      },
    });
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen bg-gray-100">
      <Toast ref={toast} />
      <Card className="w-full sm:w-10 md:w-6 lg:w-4" style={{ maxWidth: '450px' }}>
        <h2 className="text-center mb-2" style={{ fontSize: '1.5rem' }}>Crear cuenta</h2>
        <p className="text-center text-600 mb-6" style={{ fontSize: '0.875rem' }}>Llena todos los campos requeridos</p>

        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid" style={{ padding: '0.5rem' }}>
          <div className="field mb-2">
            <label htmlFor="Username" className="block text-sm font-medium mb-1">Nombre de usuario</label>
            <Controller
              name="Username"
              control={control}
              rules={{ required: "El nombre de usuario es obligatorio" }}
              render={({ field }) => (
                <InputText 
                  id="Username" 
                  {...field} 
                  className={`w-full ${errors.Username ? "p-invalid" : ""}`}
                  style={{ padding: '0.5rem' }}
                />
              )}
            />
            {errors.Username && <small className="p-error block mt-1 text-xs">{errors.Username.message}</small>}
          </div>

          <div className="field mb-2">
            <label htmlFor="Email" className="block text-sm font-medium mb-1">Correo electrónico</label>
            <Controller
              name="Email"
              control={control}
              rules={{
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo electrónico no válido",
                },
              }}
              render={({ field }) => (
                <InputText 
                  id="Email" 
                  {...field} 
                  className={`w-full ${errors.Email ? "p-invalid" : ""}`}
                  style={{ padding: '0.5rem' }}
                />
              )}
            />
            {errors.Email && <small className="p-error block mt-1 text-xs">{errors.Email.message}</small>}
          </div>

          <div className="field mb-2">
            <label htmlFor="Password" className="block text-sm font-medium mb-1">Contraseña</label>
            <Controller
              name="Password"
              control={control}
              rules={{ required: "La contraseña es obligatoria" }}
              render={({ field }) => (
                <Password
                  id="Password"
                  {...field}
                  toggleMask
                  feedback={false}
                  className={`w-full ${errors.Password ? "p-invalid" : ""}`}
                  inputStyle={{ padding: '0.5rem', width: '100%' }}
                />
              )}
            />
            {errors.Password && <small className="p-error block mt-1 text-xs">{errors.Password.message}</small>}
          </div>

          <div className="field mb-2">
            <label htmlFor="ConfirmPassword" className="block text-sm font-medium mb-1">Confirmar contraseña</label>
            <Controller
              name="ConfirmPassword"
              control={control}
              rules={{
                required: "Por favor confirme la contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              }}
              render={({ field }) => (
                <Password
                  id="ConfirmPassword"
                  {...field}
                  toggleMask
                  feedback={false}
                  className={`w-full ${errors.ConfirmPassword ? "p-invalid" : ""}`}
                  inputStyle={{ padding: '0.5rem', width: '100%' }}
                />
              )}
            />
            {errors.ConfirmPassword && <small className="p-error block mt-1 text-xs">{errors.ConfirmPassword.message}</small>}
          </div>

          <div className="field mb-3">
            <label htmlFor="Rol" className="block text-sm font-medium ">Rol</label>
            <Controller
              name="Rol"
              control={control}
              rules={{ required: "El rol es obligatorio" }}
              render={({ field }) => (
                <Dropdown
                  id="Rol"
                  {...field}
                  options={roles}
                  optionLabel="label"
                  placeholder="Selecciona un rol"
                  className={`w-full ${errors.Rol ? "p-invalid" : ""}`}
                  style={{ width: '100%' }}
                />
              )}
            />
            {errors.Rol && <small className="p-error block mt-1 text-xs">{errors.Rol.message}</small>}
          </div>

          <Divider className="my-3" />

          <Button
            label="Crear cuenta"
            type="submit"
            loading={isPending || isSubmitting}
            className="w-full mb-2"
            icon="pi pi-user-plus"
          />

          <Button
            label="¿Ya tienes una cuenta? Inicia sesión"
            link
            severity="secondary"
            className="w-full text-sm"
            icon="pi pi-sign-in"
            type="button"
            onClick={() => (window.location.href = Routes.BASE_ROUTE)}
          />
        </form>
      </Card>
    </div>
  );
};

export default Signup;