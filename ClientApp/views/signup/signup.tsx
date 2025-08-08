"use client"

import { useRef, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Toast } from "primereact/toast"
import { Divider } from "primereact/divider"
import { ProgressSpinner } from "primereact/progressspinner"
import { useNavigate } from "react-router-dom"
import { Routes } from "#core"
import { Form, FieldColumn } from "#components"
import { useRegistrarUsuario } from "ClientApp/hooks/useMutation/useMutationSignup"
import { RegistroDatos } from "#interfaces"

interface SignupFormData {
  NombreUsuario: string
  Correo: string
  Password: string
  ConfirmPassword: string
}

const Signup = () => {
  const navigate = useNavigate()
  const toast = useRef<Toast>(null)
  const { handleSubmit, control, formState: { errors }, getValues } = useForm<SignupFormData>()
  const { mutate: registerCliente } = useRegistrarUsuario()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data: SignupFormData) => {
    setIsLoading(true)

    const registroData: RegistroDatos = {
      Nombre: data.NombreUsuario,
      Email: data.Correo,
      Password: data.Password,
      RolId: 2, // Por ejemplo, si "2" es el rol de cliente
      EmpleadoId: null, // o 0, dependiendo de tu backend
    }

    registerCliente(registroData, {
      onSuccess: () => {
        toast.current?.show({
          severity: "success",
          summary: "Registro exitoso",
          detail: "Tu cuenta ha sido creada correctamente.",
        })
        setTimeout(() => {
          setIsLoading(false)
          navigate(Routes.login_ROUTE, { replace: true })
        }, 2000)
      },
      onError: (error: any) => {
        toast.current?.show({
          severity: "error",
          summary: "Error al registrar",
          detail: error?.response?.data?.mensaje || "Ocurrió un error. Inténtalo de nuevo.",
        })
        setIsLoading(false)
      },
    })
  }


  const handleLoginRedirect = () => {
    navigate(Routes.login_ROUTE)
  }

  return (
    <div className="flex">
      <Toast ref={toast} />
      <div className="flex justify-content-center align-items-center h-screen flex-1 flex-column px-4 md:px-0 bg-gray-100">
        <div className="surface-card p-4 shadow-2 border-round w-full max-w-sm sm:w-8 md:w-6 lg:w-8 md:max-w-28rem relative mx-auto">
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 z-10 flex justify-center items-center">
              <ProgressSpinner />
            </div>
          )}
          <div className="text-center mb-3 flex flex-column align-items-center">
            <div className="text-900 text-2xl md:text-3xl font-bold mb-4">¡Regístrate!</div>
            <span className="text-600 font-medium line-height-3 text-sm md:text-base">
              Crea tu cuenta para acceder a Zoologic
            </span>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FieldColumn label="Nombre completo">
              <Controller
                name="NombreUsuario"
                control={control}
                rules={{ required: "El nombre es obligatorio" }}
                render={({ field, fieldState }) => (
                  <>
                    <InputText {...field} placeholder="Ej: Juan Pérez" className={`w-full ${fieldState.invalid ? "p-invalid" : ""}`} disabled={isLoading} />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </FieldColumn>

            <FieldColumn label="Correo electrónico">
              <Controller
                name="Correo"
                control={control}
                rules={{
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo inválido",
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <InputText {...field} placeholder="ejemplo@correo.com" className={`w-full ${fieldState.invalid ? "p-invalid" : ""}`} disabled={isLoading} />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </FieldColumn>

            <FieldColumn label="Contraseña">
              <Controller
                name="Password"
                control={control}
                rules={{ required: "La contraseña es obligatoria" }}
                render={({ field, fieldState }) => (
                  <>
                    <InputText
                      {...field}
                      type="password"
                      placeholder="Contraseña"
                      className={`w-full ${fieldState.invalid ? "p-invalid" : ""}`}
                      disabled={isLoading}
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </FieldColumn>

            <FieldColumn label="Confirmar contraseña">
              <Controller
                name="ConfirmPassword"
                control={control}
                rules={{
                  required: "Confirma tu contraseña",
                  validate: value => value === getValues("Password") || "Las contraseñas no coinciden",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <InputText
                      {...field}
                      type="password"
                      placeholder="Repite tu contraseña"
                      className={`w-full ${fieldState.invalid ? "p-invalid" : ""}`}
                      disabled={isLoading}
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </FieldColumn>

            <Button
              className="w-full mt-3 p-button-rounded"
              loading={isLoading}
              label="Registrarse"
              type="submit"
              icon="pi pi-user-plus"
              severity="success"
              disabled={isLoading}
            />

            <Divider align="center" className="my-3">
              <span className="text-600 text-sm">O</span>
            </Divider>

            <Button
              className="w-full p-button-rounded p-button-outlined"
              label="¿Ya tienes cuenta? Inicia sesión"
              type="button"
              onClick={handleLoginRedirect}
              icon="pi pi-sign-in"
              severity="secondary"
              disabled={isLoading}
            />
          </Form>
        </div>
      </div>

      {/* Imagen lateral reutilizada */}
      <div
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b")`,
          backgroundColor: "hsla(110, 67%, 66%, 1.00)",
        }}
        className="hidden md:flex flex-1 bg-no-repeat bg-cover justify-content-center align-items-center flex-column p-5 text-black"
      >
        <h1 className="text-5xl md:text-8xl font-bold mb-4 text-green-900">Zoologic</h1>
        <p className="text-sm md:text-lg text-justify max-w-md mb-4 text-green-800 font-bold">
          Zoologic es un sistema web integral diseñado para optimizar la gestión operativa del Parque Zoológico de Santo
          Domingo, en la República Dominicana. Esta plataforma permite a los empleados del zoológico gestionar de manera
          eficiente sus tareas diarias, desde el cuidado de los animales hasta la organización de sus rutinas.
        </p>
        <p className="text-sm md:text-lg text-justify max-w-md mb-4 text-green-800 font-bold">
          El sistema busca mejorar la eficiencia operativa y fomentar la conservación de la biodiversidad. Zoologic está diseñado para garantizar un manejo adecuado de los recursos y contribuir al bienestar de las especies, al mismo tiempo que ofrece una experiencia más organizada y profesional para el personal del zoológico.
        </p>
        <span className="text-lg md:text-xl font-semibold mb-4 text-green-900 font-bold">"Protegiendo el futuro de la vida silvestre"</span>
        <div className="flex justify-content-center gap-4">
          <img src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1742418550/MEDIO-AMBIENTE_ftjbxt.png" alt="Logo 1" className="w-6rem md:w-8rem h-auto" />
          <img src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1742419070/zoodom_atpfei.png" alt="Logo 2" className="w-6rem md:w-8rem h-auto" />
        </div>
      </div>
    </div>
  )
}

export default Signup
