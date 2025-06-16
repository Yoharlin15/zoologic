import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { useRegistrarUsuario } from "../../hooks/useMutation/useMutationSignup";
import { RegistroDatos } from "#interfaces";
import { Routes } from "#core";
import { login_ROUTE } from "ClientApp/core/routes";

interface SignupFormData {
  Username: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  Rol: number;
}

const roles = [
  { label: "Cliente", value: 1 },
];

const Signup = () => {
  const navigate = useNavigate();
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

  const handleLoginClick = () => {
    navigate(Routes.login_ROUTE, { replace: true });
  };

  const SignupSideImage = () => (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b")`,
        backgroundColor: "#B6E388"
      }}
      className="hidden md:flex flex-1 bg-no-repeat bg-cover justify-content-center align-items-center flex-column p-5 text-black"
    >
      <h1 className="text-7xl font-bold mb-4">Zoologic</h1>
      <p className="text-lg text-justify max-w-md mb-4">
        Zoologic es un sistema web integral diseñado para optimizar la gestión operativa del Parque Zoológico de Santo Domingo, en la República Dominicana. Esta plataforma permite a los empleados del zoológico gestionar de manera eficiente sus tareas diarias, desde el cuidado de los animales hasta la organización de sus rutinas. Además, Zoologic facilita el control y el seguimiento detallado de las especies que habitan en el zoológico, incluyendo su estado de salud, alimentación, reproducción y hábitats.
      </p>
      <p className="text-lg text-justify max-w-md mb-4">
        El sistema busca mejorar la eficiencia operativa y fomentar la conservación de la biodiversidad. Zoologic está diseñado para garantizar un manejo adecuado de los recursos y contribuir al bienestar de las especies, al mismo tiempo que ofrece una experiencia más organizada y profesional para el personal del zoológico.
      </p>
      <span className="text-xl font-semibold mb-4">"Protegiendo el futuro de la vida silvestre"</span>
      <div className="flex justify-content-center gap-4">
        <img src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1742418550/MEDIO-AMBIENTE_ftjbxt.png" alt="Logo 1" className="w-2 h-auto" />
        <img src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1742419070/zoodom_atpfei.png" alt="Logo 2" className="w-2 h-auto" />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Toast ref={toast} />
      
      {/* Formulario de registro */}
      <div className="flex justify-content-center align-items-center flex-1 p-4">
        <Card className="w-full" style={{ maxWidth: '420px', minWidth: '350px' }}>
          <h2 className="text-center mb-2" style={{ fontSize: '1.25rem' }}>Crear cuenta</h2>
          <p className="text-center text-600 mb-3" style={{ fontSize: '0.8rem' }}>Llena todos los campos requeridos</p>

          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid" style={{ padding: '1rem' }}>
            <div className="field mb-2">
              <label htmlFor="Username" className="block text-xs font-medium mb-1">Nombre de usuario</label>
              <Controller
                name="Username"
                control={control}
                rules={{ required: "El nombre de usuario es obligatorio" }}
                render={({ field }) => (
                  <InputText 
                    id="Username" 
                    {...field} 
                    placeholder="Ej: JuanPerez"
                    className={`w-full ${errors.Username ? "p-invalid" : ""}`}
                    style={{ padding: '0.5rem' }}
                  />
                )}
              />
              {errors.Username && <small className="p-error block mt-1 text-xs">{errors.Username.message}</small>}
            </div>

            <div className="field mb-2">
              <label htmlFor="Email" className="block text-xs font-medium mb-1">Correo electrónico</label>
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
                    placeholder="Ej: JuanPerez@correo.com"
                    className={`w-full ${errors.Email ? "p-invalid" : ""}`}
                    style={{ padding: '0.5rem' }}
                  />
                )}
              />
              {errors.Email && <small className="p-error block mt-1 text-xs">{errors.Email.message}</small>}
            </div>

            <div className="field mb-2">
              <label htmlFor="Password" className="block text-xs font-medium mb-1">Contraseña</label>
              <Controller
                name="Password"
                control={control}
                rules={{ required: "La contraseña es obligatoria" }}
                render={({ field }) => (
                  <Password
                    id="Password"
                    {...field}
                    placeholder="Mínimo 8 caracteres"
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
              <label htmlFor="ConfirmPassword" className="block text-xs font-medium mb-1">Confirmar contraseña</label>
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
                    placeholder="Repite la contraseña anterior"
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
              <label htmlFor="Rol" className="block text-xs font-medium mb-1">Rol</label>
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
                    placeholder="Selecciona tu rol en el sistema"
                    className={`w-full ${errors.Rol ? "p-invalid" : ""}`}
                    style={{ width: '100%' }}
                  />
                )}
              />
              {errors.Rol && <small className="p-error block mt-1 text-xs">{errors.Rol.message}</small>}
            </div>

            <Divider className="my-2" />

            <Button
              label="Crear cuenta"
              type="submit"
              loading={isPending || isSubmitting}
              className="w-full mb-2"
              icon="pi pi-user-plus"
              size="small"
            />

            <Button
              label="¿Ya tienes una cuenta? Inicia sesión"
              link
              severity="secondary"
              className="w-full text-xs"
              icon="pi pi-sign-in"
              type="button"
              size="small"
              onClick={handleLoginClick}
            />
          </form>
        </Card>
      </div>

      {/* Imagen lateral */}
      <SignupSideImage />
    </div>
  );
};

export default Signup;