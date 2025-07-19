import React, { useEffect, useMemo, useRef, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import {
    Dropdown,
    InputTextArea,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IHabitaByAnimal, ITratamientoAplicadoCreate, IUsuario } from "#interfaces";

import {
    useFetchAnimales,
    useFetchUsuarios,
    useFetchHabitatByAnimalId,
    useFetchTratamientoEspecie,
} from "ClientApp/hooks/useFetch";
import { useCreateTratamientosAplicados } from "ClientApp/hooks/useMutation/useMutationTratamientosAplicados";

interface ITratamientoAplicadoSidebarProps {
    id?: number;
    visible: boolean;
    onHide: () => void;
    especieId: number | undefined;
}

const TratamientoAplicadoSidebarCreate = ({ onHide, visible }: ITratamientoAplicadoSidebarProps) => {
    const toast = useRef<Toast>(null);

    const { data: animales } = useFetchAnimales();
    const { data: usuarios } = useFetchUsuarios();
    const { data: tratamientosEspecie } = useFetchTratamientoEspecie();

    const usuariosFiltrados = (usuarios ?? []).filter((u: IUsuario) => u.RolId === 3);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        getValues,
        setValue,
    } = useForm<ITratamientoAplicadoCreate, FieldValues>({
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

    const selectedAnimalId = watch("AnimalId");
    const fechaEntrada = watch("FechaEntrada");

    const selectedAnimal = useMemo(() => {
        return animales?.find((a) => a.AnimalId === selectedAnimalId);
    }, [animales, selectedAnimalId]);

    const especieId = selectedAnimal?.EspecieId;

    const { data: habitatByAnimal } = useFetchHabitatByAnimalId(selectedAnimalId);
    const [filteredHabitats, setFilteredHabitats] = useState<IHabitaByAnimal[]>([]);

    const tratamientosFiltrados = useMemo(() => {
        if (!especieId || !tratamientosEspecie) return [];
        return tratamientosEspecie.filter((t) => t.EspecieId === especieId);
    }, [tratamientosEspecie, especieId]);

    useEffect(() => {
        if (habitatByAnimal) {
            setFilteredHabitats(Array.isArray(habitatByAnimal) ? habitatByAnimal : [habitatByAnimal]);
        } else {
            setFilteredHabitats([]);
        }
    }, [habitatByAnimal]);

    const createTratamientoAplicado = useCreateTratamientosAplicados();

    const onSubmit = async (data: ITratamientoAplicadoCreate) => {
        const payload = {
            TratamientoId: Number(data.TratamientoId),
            AnimalId: Number(data.AnimalId),
            HabitatId: Number(data.HabitatId),
            FechaEntrada: data.FechaEntrada?.toISOString() || null,
            FechaSalida: data.FechaSalida?.toISOString() || null,
            UsuarioId: Number(data.UsuarioId),
            Razon: data.Razon,
        };

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
                header={<h1 className="font-semibold text-2xl text-900">Nuevo tratamiento</h1>}
            >
                <Form>
                    <FieldColumn label="Animal (código)" columns={{ sm: 6 }}>
                        <Dropdown
                            name="AnimalId"
                            control={control}
                            placeholder="Seleccione el animal"
                            rules={{ required: "Campo obligatorio" }}
                            options={animales || []}
                            optionLabel="IdentificadorUnico"
                            optionValue="AnimalId"
                        />
                    </FieldColumn>

                    <FieldColumn label="Atendido por" columns={{ sm: 6 }}>
                        <Dropdown
                            name="UsuarioId"
                            control={control}
                            placeholder="Seleccione el usuario"
                            rules={{ required: "Campo obligatorio" }}
                            options={usuariosFiltrados}
                            optionLabel="NombreUsuario"
                            optionValue="UsuarioId"
                        />
                    </FieldColumn>

                    <FieldColumn label="Tratamiento" columns={{ sm: 6 }}>
                        <Dropdown
                            name="TratamientoId"
                            control={control}
                            placeholder="Seleccione el tratamiento"
                            rules={{ required: "Campo obligatorio" }}
                            options={tratamientosFiltrados}
                            optionLabel="NombreTratamiento"
                            optionValue="TratamientoId"
                            disabled={!especieId}
                        />
                    </FieldColumn>

                    <FieldColumn label="Hábitat" columns={{ sm: 6 }}>
                        <Dropdown
                            name="HabitatId"
                            control={control}
                            placeholder="Seleccione el hábitat"
                            rules={{ required: "Campo obligatorio" }}
                            options={filteredHabitats || []}
                            optionLabel="Nombre"
                            optionValue="HabitatId"
                            disabled={!selectedAnimalId}
                        />
                    </FieldColumn>

                    <FieldColumn label="Fecha de entrada" columns={{ sm: 6 }}>
                        <Controller
                            name="FechaEntrada"
                            control={control}
                            rules={{ required: "Campo obligatorio" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Calendar
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        showIcon
                                        dateFormat="dd/mm/yy"
                                        placeholder="Seleccione una fecha"
                                        className="w-full"
                                        showButtonBar
                                    />
                                    {fieldState.error && (
                                        <small className="p-error">{fieldState.error.message}</small>
                                    )}
                                </>
                            )}
                        />
                    </FieldColumn>

                    <FieldColumn label="Fecha de salida" columns={{ sm: 6 }}>
                        <Controller
                            name="FechaSalida"
                            control={control}
                            rules={{
                                required: "Campo obligatorio",
                                validate: (fechaSalida) => {
                                    const entrada = getValues("FechaEntrada");
                                    if (entrada && fechaSalida && fechaSalida < entrada) {
                                        return "La fecha de salida no puede ser menor a la de entrada";
                                    }
                                    return true;
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <Calendar
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        showIcon
                                        dateFormat="dd/mm/yy"
                                        placeholder="Seleccione una fecha"
                                        className="w-full"
                                        showButtonBar
                                        minDate={fechaEntrada || undefined}
                                    />
                                    {fieldState.error && (
                                        <small className="p-error">{fieldState.error.message}</small>
                                    )}
                                </>
                            )}
                        />
                    </FieldColumn>

                    <FieldColumn label="Razón" columns={{ sm: 12 }}>
                        <InputTextArea
                            name="Razon"
                            control={control}
                            placeholder="Razón del tratamiento"
                            rules={{ required: "Campo obligatorio" }}
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

export default TratamientoAplicadoSidebarCreate;
