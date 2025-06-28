import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Form, InputText, FieldColumn } from "#components";
import { Routes } from "#core";
import ControlledInputText from "ClientApp/components/inputs/input-text/input-text";
import { Toast } from "primereact/toast";
import { useLoginUsuario } from "ClientApp/hooks/useMutation/useMutationSignup";
import { LoginDatos } from "#interfaces";
import { useNavigate } from "react-router-dom";
import { Divider } from "primereact/divider";
import { ProgressSpinner } from "primereact/progressspinner";

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
      backgroundColor: "#B6E388",
    }}
    className="hidden md:flex flex-1 bg-no-repeat bg-cover justify-content-center align-items-center flex-column p-5 text-black"
  >
    <h1 className="text-7xl font-bold mb-4">Zoologic</h1>
    <p className="text-lg text-justify max-w-md mb-4">
      Zoologic es un sistema web integral diseñado para optimizar la gestión operativa del Parque Zoológico de Santo Domingo, en la República Dominicana. Esta plataforma permite a los empleados del zoológico gestionar de manera eficiente sus tareas diarias, desde el cuidado de los animales hasta la organización de sus rutinas. Además, Zoologic facilita el control y el seguimiento detallado de las especies que habitan en el zoológico, incluyendo su estado de salud, alimentación, reproducción y hábitats.    </p>
    <p className="text-lg text-justify max-w-md mb-4">
      El sistema busca mejorar la eficiencia operativa y fomentar la conservación de la biodiversidad. Zoologic está diseñado para garantizar un manejo adecuado de los recursos y contribuir al bienestar de las especies, al mismo tiempo que ofrece una experiencia más organizada y profesional para el personal del zoológico.    </p>
    <span className="text-xl font-semibold mb-4">"Protegiendo el futuro de la vida silvestre"</span>
    <div className="flex justify-content-center gap-4">
      <img src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1742418550/MEDIO-AMBIENTE_ftjbxt.png" alt="Logo 1" className="w-2 h-auto" />
      <img src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1742419070/zoodom_atpfei.png" alt="Logo 2" className="w-2 h-auto" />
    </div>
  </div>
);

const LoginCard = ({ children }: React.PropsWithChildren) => (
  <div className="surface-card p-4 shadow-2 border-round w-6 sm:w-8 md:w-6 lg:w-8 max-w-28rem relative">
    {children}
  </div>
);

const LoginHeader = () => (
  <div className="text-center mb-3 flex flex-column align-items-center">
    <img
      height={150}
      src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1748732918/Captura_de_pantalla_2025-03-14_133841-removebg-preview_ibdy4g_wakmup.png"
      alt="nubeteck"
      className="mb-6"
    />
    <div className="text-900 text-3xl font-bold mb-1">¡Bienvenido!</div>
    <span className="text-600 font-medium line-height-3 mb-3">Ingresa tus credenciales para acceder</span>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>();

  const toast = useRef<Toast>(null);
  const { mutate: loginUsuario } = useLoginUsuario();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const onSubmit = (data: LoginFormData) => {
    setIsLoadingLogin(true);

    const datos: LoginDatos = {
      Correo: data.Correo,
      Password: data.Password,
    };

    loginUsuario(datos, {
      onSuccess: (res: any) => {
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: res.mensaje || "Has iniciado sesión correctamente.",
        });

        const rol = res.RolId;

        setTimeout(() => {
          setIsLoadingLogin(false);
          if (rol === 2) {
            navigate(Routes.LANDING_ROUTE, { replace: true });
          } else {
            navigate(Routes.EMPLEADOS_ROUTE, { replace: true });
          }
        }, 2000);
      },
      onError: (error: any) => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.message || "Hubo un error al iniciar sesión.",
        });
        setIsLoadingLogin(false);
      },
    });
  };

  const handleSignupClick = () => {
    navigate(Routes.SIGNUP_ROUTE, { replace: true });
  };

  return (
    <div className="flex">
      <Toast ref={toast} />
      <LoginContainer>
        <LoginCard>
          {isLoadingLogin && (
            <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 z-10 flex justify-center items-center">
              <ProgressSpinner />
            </div>
          )}

          <LoginHeader />
          <div className="flex flex-column">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FieldColumn label="Correo">
                <ControlledInputText
                  name="Correo"
                  control={control}
                  rules={{
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Correo electrónico inválido",
                    },
                  }}
                  placeholder="ejemplo@correo.com"
                  className="w-full"
                  disabled={isLoadingLogin}
                />
              </FieldColumn>

              <FieldColumn label="Contraseña">
                <ControlledInputText
                  name="Password"
                  control={control}
                  rules={{
                    required: "La contraseña es obligatoria",
                  }}
                  placeholder="Ingrese su contraseña"
                  type="password"
                  className="w-full"
                  disabled={isLoadingLogin}
                />
              </FieldColumn>

              <Button
                className="w-full mt-3 p-button-rounded"
                loading={isLoadingLogin}
                label="Iniciar Sesión"
                type="submit"
                icon="pi pi-sign-in"
                severity="success"
                disabled={isLoadingLogin}
              />

              <Divider align="center" className="my-3">
                <span className="text-600 text-sm">O</span>
              </Divider>

              <Button
                className="w-full p-button-rounded p-button-outlined"
                label="Crear una nueva cuenta"
                type="button"
                onClick={handleSignupClick}
                icon="pi pi-user-plus"
                severity="secondary"
                disabled={isLoadingLogin}
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
