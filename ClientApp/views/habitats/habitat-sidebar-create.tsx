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
    InputTextArea,

} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IEmpleadoCreate, IHabitatCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchCargos, useFetchUsuarios } from "ClientApp/hooks/useFetch";
import { useFetchEstados } from "ClientApp/hooks/useFetch/useFetchEstados";
import { useCreateEmpleado } from "ClientApp/hooks/useMutation/useMutationEmpleados";
import { useCreateHabitats } from "ClientApp/hooks/useMutation/useMutationHabitats";

interface IHabitatSidebarProps {
    id?: number;
    visible: boolean;
    onHide: () => void;
    especieId: number | undefined;
}

const HabitatSidebarCreate = ({ onHide, visible }: IHabitatSidebarProps) => {
    const toast = useRef<Toast>(null);
    const { data: estados } = useFetchEstados();
    const createHabitat = useCreateHabitats();


    const { control, handleSubmit, reset } = useForm<IHabitatCreate, FieldValues>({
        mode: "onChange",
        defaultValues: {
           Nombre: "",
           CantidadAnimales: undefined,
           EstadoId: undefined,
           Descripcion: ""
        },
    });

    const onSubmit = async (data: IHabitatCreate) => {
        const payload = {
            Nombre: data.Nombre,
            CantidadAnimales: Number(data.CantidadAnimales),
            EstadoId: Number(data.EstadoId),
            Descripcion: data.Descripcion
        };

        console.log("Payload:", payload);
        // para mostrar mensajes
        try {
            const res = await createHabitat.mutateAsync(payload);
            toast.current?.show({
                severity: "success",
                summary: "Éxito",
                detail: res?.mensaje || "Habitat creado correctamente.",
            });
            reset();
            onHide();
        } catch (error: any) {
            console.error("Error:", error.response?.data || error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error.response?.data?.mensaje || "Hubo un error al crear el habitat.",
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
                header={<h1 className="font-semibold text-2xl text-900">Nuevo habitat</h1>}
            >
                <Form>
                    <FieldColumn label="Nombre" columns={{ sm: 12 }}>
                        <InputText
                            name="Nombre"
                            control={control}
                            placeholder="Nombre"
                            rules={{ required: "Campo obligatorio" }} />
                    </FieldColumn>

                    <FieldColumn label="Cantidad de animales" columns={{ sm: 6 }}>
                        <InputText
                            name="CantidadAnimales"
                            control={control}
                            placeholder="Cantidad"
                            rules={{ required: "Campo obligatorio" }} />
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

                    <FieldColumn label="Decripcion" columns={{ sm: 12 }}>
                        <InputTextArea
                            name="Descripcion"
                            control={control}
                            placeholder="Descripcion"
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

export default HabitatSidebarCreate;