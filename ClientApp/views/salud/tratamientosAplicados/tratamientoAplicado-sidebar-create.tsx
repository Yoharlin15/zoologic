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
import { ITratamientoAplicadoCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchAnimales, useFetchHabitats, useFetchTratamientos, useFetchUsuarios } from "ClientApp/hooks/useFetch";
import { useCreateTratamientosAplicados } from "ClientApp/hooks/useMutation/useMutationTratamientosAplicados";

interface ITratamientoAplicadoSidebarProps {
    id?: number;
    visible: boolean;
    onHide: () => void;
    especieId: number | undefined;
}

const TratamientoAplicadoSidebarCreate = ({ onHide, visible }: ITratamientoAplicadoSidebarProps) => {
    const toast = useRef<Toast>(null);
    const { data: tratamientos } = useFetchTratamientos();
    const { data: animales } = useFetchAnimales();
    const { data: habitats } = useFetchHabitats();
    const { data: usuarios } = useFetchUsuarios();
    const createTratamientoAplicado = useCreateTratamientosAplicados();


    const { control, handleSubmit, reset } = useForm<ITratamientoAplicadoCreate, FieldValues>({
        mode: "onChange",
        defaultValues: {
            TratamientoId: undefined,
            AnimalId: undefined,
            HabitatId: undefined,
            FechaEntrada: null,
            FechaSalida: null,
            UsuarioId: undefined,
            Razon: "",
        },
    });

    const onSubmit = async (data: ITratamientoAplicadoCreate) => {
        const payload = {
            TratamientoId : Number(data.TratamientoId),
            AnimalId: Number(data.AnimalId),
            HabitatId: Number(data.HabitatId),
            FechaEntrada: data.FechaEntrada?.toISOString() || null,
            FechaSalida: data.FechaSalida?.toISOString() || null,
            UsuarioId: Number(data.UsuarioId),
            Razon: data.Razon
        };

        console.log("Payload:", payload);
        // para mostrar mensajes
        try {
            const res = await createTratamientoAplicado.mutateAsync(payload);
            toast.current?.show({
                severity: "success",
                summary: "Éxito",
                detail: res?.mensaje || "Tratamiento aplicado creado correctamente.",
            });
            reset();
            onHide();
        } catch (error: any) {
            console.error("Error:", error.response?.data || error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error.response?.data?.mensaje || "Hubo un error al crear.",
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
                header={<h1 className="font-semibold text-2xl text-900">Nuevo tratamiento</h1>}
            >
                <Form>
                    <FieldColumn label="Tratamiento" columns={{ sm: 6 }}>
                        <Dropdown
                            name="TratamientoId"
                            control={control}
                            placeholder="Seleccione el tratamiento"
                            rules={{ required: "Campo obligatorio" }}
                            options={tratamientos || []}
                            optionLabel="NombreTratamiento"
                            optionValue="TratamientoId" />
                    </FieldColumn>

                    <FieldColumn label="Atendido por" columns={{ sm: 6 }}>
                        <Dropdown
                            name="UsuarioId"
                            control={control}
                            placeholder="Seleccione el usuario"
                            rules={{ required: "Campo obligatorio" }}
                            options={usuarios || []}
                            optionLabel="NombreUsuario"
                            optionValue="UsuarioId" />
                    </FieldColumn>

                     <FieldColumn label="Animal(alias)" columns={{ sm: 6 }}>
                        <Dropdown
                            name="AnimalId"
                            control={control}
                            placeholder="Seleccione el animal"
                            rules={{ required: "Campo obligatorio" }}
                            options={animales || []}
                            optionLabel="Alias"
                            optionValue="AnimalId" />
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

                    <FieldColumn label="Fecha de entrada" columns={{ sm: 6 }}>
                        <Controller
                            name="FechaEntrada"
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

                    <FieldColumn label="Fecha de salida" columns={{ sm: 6 }}>
                        <Controller
                            name="FechaSalida"
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

                    <FieldColumn label="Razon" columns={{ sm: 12 }}>
                        <InputTextArea
                            name="Razon"
                            control={control}
                            placeholder="Razon"
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

export default TratamientoAplicadoSidebarCreate;