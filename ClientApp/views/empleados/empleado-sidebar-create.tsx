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
import { IEmpleadoCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchCargos, useFetchDepartamentos, useFetchUsuarios } from "ClientApp/hooks/useFetch";
import { useFetchEstados } from "ClientApp/hooks/useFetch/useFetchEstados";
import { useCreateEmpleado } from "ClientApp/hooks/useMutation/useMutationEmpleados";

interface IEmpleadoSidebarProps {
    id?: number;
    visible: boolean;
    onHide: () => void;
    empleadoId: number | undefined;
}

const EmpleadoSidebarCreate = ({ onHide, visible }: IEmpleadoSidebarProps) => {
    const toast = useRef<Toast>(null);
    const { data: cargos } = useFetchCargos();
    const { data: estados } = useFetchEstados();
    const { data: departamentos } = useFetchDepartamentos();
    const createEmpleado = useCreateEmpleado();


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
            CargoId: undefined,
            FechaContratacion: null,
            DepartamentoId: undefined,
            EstadoId: undefined
        },
    });

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
            CargoId: Number(data.CargoId),
            FechaContratacion: data.FechaContratacion?.toISOString() || null,
            DepartamentoId: Number(data.DepartamentoId),
            EstadoId: Number(data.EstadoId),
        };

        console.log("Payload:", payload);
        // para mostrar mensajes
        try {
            const res = await createEmpleado.mutateAsync(payload);
            toast.current?.show({
                severity: "success",
                summary: "Éxito",
                detail: res?.mensaje || "Empleado creado correctamente.",
            });
            reset();
            onHide();
        } catch (error: any) {
            console.error("Error:", error.response?.data || error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error.response?.data?.mensaje || "Hubo un error al crear el empleado.",
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
                header={<h1 className="font-semibold text-2xl text-900">Nuevo empleado</h1>}
            >
                <Form>
                    <FieldColumn label="Nombres" columns={{ sm: 6 }}>
                        <InputText
                            name="Nombres"
                            control={control}
                            placeholder="Nombres"
                            rules={{ required: "Campo obligatorio" }} />
                    </FieldColumn>

                    <FieldColumn label="Apellidos" columns={{ sm: 6 }}>
                        <InputText
                            name="Apellidos"
                            control={control}
                            placeholder="Apellidos"
                            rules={{ required: "Campo obligatorio" }} />
                    </FieldColumn>

                    <FieldColumn label="Cedula" columns={{ sm: 6 }}>
                        <InputText
                            name="Cedula"
                            control={control}
                            placeholder="Cedula"
                            rules={{ required: "Campo obligatorio" }} />
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
                                    required />
                            )} />
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
                                  ]} />
                              </FieldColumn>

                    <FieldColumn label="Telefono" columns={{ sm: 6 }}>
                        <InputText
                            name="Telefono"
                            control={control}
                            placeholder="Telefono"
                            rules={{ required: "Campo obligatorio" }} />
                    </FieldColumn>

                    <FieldColumn label="Nacionalidad" columns={{ sm: 6 }}>
                        <InputText
                            name="Nacionalidad"
                            control={control}
                            placeholder="Nacionalidad"
                            rules={{ required: "Campo obligatorio" }} />
                    </FieldColumn>

                    <FieldColumn label="Direccion" columns={{ sm: 6 }}>
                        <InputText
                            name="Direccion"
                            control={control}
                            placeholder="Direccion"
                            rules={{ required: "Campo obligatorio" }} />
                    </FieldColumn>

                    <FieldColumn label="Cargo" columns={{ sm: 6 }}>
                        <Dropdown
                            name="CargoId"
                            control={control}
                            placeholder="Seleccione el padre"
                            rules={{ required: "Campo obligatorio" }}
                            options={cargos || []}
                            optionLabel="Cargo"
                            optionValue="CargoId" />
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
                                    required />
                            )} />
                    </FieldColumn>

                    <FieldColumn label="Departamento" columns={{ sm: 6 }}>
                        <Dropdown
                            name="DepartamentoId"
                            control={control}
                            placeholder="Seleccione el departamento"
                            options={departamentos || []}
                            optionLabel="Nombre"
                            optionValue="DepartamentoId" />
                    </FieldColumn>

                    <FieldColumn label="Estado" columns={{ sm: 6 }}>
                        <Dropdown
                            name="EstadoId"
                            control={control}
                            placeholder="Seleccione una madre"
                            rules={{ required: "Campo obligatorio" }}
                            options={estados || []}
                            optionLabel="NombreEstado"
                            optionValue="EstadoId" />
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

export default EmpleadoSidebarCreate;