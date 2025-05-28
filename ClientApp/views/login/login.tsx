import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Form, InputText, FieldColumn } from "#components";
import { Routes } from "#core";
import ControlledInputText from "ClientApp/components/inputs/input-text/input-text";
import { Toast } from "primereact/toast";
import { useLoginUsuario } from "ClientApp/hooks/useMutation/useMutationSignup";
import { LoginDatos } from "#interfaces";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  Correo: string;
  Password: string;
}

const LoginContainer = ({ children }: React.PropsWithChildren) => (
  <div className="flex justify-content-center align-items-center h-screen flex-1 flex-column">
    {children}
  </div>
);

const LoginSideImage = () => (
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

const LoginCard = ({ children }: React.PropsWithChildren) => (
  <div className="surface-card p-4 border-1 border-300 border-round w-10 sm:w-8 md:w-10 lg:w-8 max-w-28rem">
    {children}
  </div>
);

const LoginHeader = () => (
  <div className="text-center mb-3 flex flex-column align-items-center">
    <img
      height={250}
      src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1741974209/Captura_de_pantalla_2025-03-14_133841-removebg-preview_ibdy4g.png"
      alt="nubeteck"
      className="mb-3"
    />
    <div className="text-800 text-xl font-bold">¡Bienvenido!</div>
    <span className="text-600 font-medium line-height-3">Zoologic</span>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>();

  const toast = useRef<Toast>(null); // para mostrar mensajes
  const { mutate: loginUsuario, isPending } = useLoginUsuario();

  const onSubmit = (data: LoginFormData) => {
    const datos: LoginDatos = {
      Correo: data.Correo,
      Password : data.Password,
    };

    loginUsuario(datos, {
      onSuccess: (res: any) => {
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: res.mensaje || "Has iniciado sesión correctamente.",
        });

      setTimeout(() => navigate(Routes.DASHBOARD_ROUTE, { replace: true }), 2000);
      },

      onError: (error: any) => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.message || "Hubo un error al iniciar sesión.",
        });
      },
    });
  };

  return (
    <div className="flex">
      <Toast ref={toast} />
      <LoginContainer>
        <LoginCard>
          <LoginHeader />
          <div className="flex flex-column">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FieldColumn label="Correo electrónico">
                <ControlledInputText
                  name="Correo"
                  control={control}
                  rules={{ required: "El correo es obligatorio" }}
                />
              </FieldColumn>
              <FieldColumn label="Contraseña">
                <ControlledInputText
                  name="Password"
                  type="password"
                  control={control}
                  rules={{ required: "La contraseña es obligatoria" }}
                />
              </FieldColumn>
              <Button
                className="flex-1 mt-3"
                loading={isSubmitting}
                label="Iniciar Sesión"
                type="submit"
              />
              <Button
                className="flex-1 mt-3 ml-3 p-button-outlined"
                label="Crear cuenta"
                type="button"
                onClick={() => (window.location.href = Routes.SIGNUP_ROUTE)}
              />
            </Form>
          </div>
        </LoginCard>
      </LoginContainer>
      <LoginSideImage />
    </div>
  );
};

export default Login;
