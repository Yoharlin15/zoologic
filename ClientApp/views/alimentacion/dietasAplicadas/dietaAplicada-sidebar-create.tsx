import React, { useRef } from "react";
import { Calendar } from "primereact/calendar";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldValues } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import {
    Dropdown,
    InputNumber,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IDietaAplicadaCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchAlimentos, useFetchAnimales, useFetchDietas } from "ClientApp/hooks/useFetch";
import { useCreateDietasAplicadas } from "ClientApp/hooks/useMutation";

interface IDietaAplicadaSidebarProps {
    id?: number;
    visible: boolean;
    onHide: () => void;
    dietaAplicadaId: number | undefined;
}

const DietaAplicadaSidebarCreate = ({ onHide, visible }: IDietaAplicadaSidebarProps) => {
    const toast = useRef<Toast>(null);
    const { data: animales } = useFetchAnimales();
    const { data: alimentos } = useFetchAlimentos();

    const createDieta = useCreateDietasAplicadas();

    const { control, handleSubmit, reset } = useForm<IDietaAplicadaCreate, FieldValues>({
        mode: "onChange",
        defaultValues: {
            AnimalId: undefined,
            AlimentoId: undefined,
            UnidadMedidaId: undefined,
            FechaAplicacion: null,
        },
    });

    const onSubmit = async (data: IDietaAplicadaCreate) => {
        const payload = {
            AnimalId: Number(data.AnimalId),
            AlimentoId: Number(data.AlimentoId),
            UnidadMedidaId: Number(data.UnidadMedidaId),
            FechaAplicacion: data.FechaAplicacion?.toISOString() || null,
        };
        console.log("Payload:", payload);
        // para mostrar mensajes
        try {
            const res = await createDieta.mutateAsync(payload);
            toast.current?.show({
                severity: "success",
                summary: "Éxito",
                detail: res?.mensaje || "Dieta aplicada correctamente.",
            });
            reset();
            onHide();
        } catch (error: any) {
            console.error("Error:", error.response?.data || error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error.response?.data?.mensaje || "Hubo un error al aplicar la dieta.",
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
                header={<h1 className="font-semibold text-2xl text-900">Aplicar dieta</h1>}
            >
                <Form>
                    <FieldColumn label="Animal(codigo)" columns={{ sm: 6 }}>
                        <Dropdown
                            name="AnimalId"
                            control={control}
                            placeholder="Seleccione el codigo"
                            rules={{ required: "Campo obligatorio" }}
                            options={animales || []}
                            optionLabel="IdentificadorUnico"
                            optionValue="AnimalId" />
                    </FieldColumn>

                    <FieldColumn label="Alimento" columns={{ sm: 6 }}>
                        <Dropdown
                            name="AlimentoId"
                            control={control}
                            placeholder="Seleccione el alimentos"
                            rules={{ required: "Campo obligatorio" }}
                            options={alimentos || []}
                            optionLabel="Nombre"
                            optionValue="DietaId" />
                    </FieldColumn>

                    <FieldColumn label="Cantidad" columns={{ sm: 6 }}>
                        <InputNumber
                            name="Cantidad"
                            control={control}
                            placeholder="Cantidad"
                            rules={{ required: "Campo obligatorio" }}
                        />
                    </FieldColumn>

                    <FieldColumn label="Unidad de medida" columns={{ sm: 6 }}>
                        <Dropdown
                            name="UnidadMedida"
                            control={control}
                            placeholder="Seleccione"
                            rules={{ required: "Campo obligatorio" }}
                            options={[
                                { label: "Kilogramo", value: 1 },
                                { label: "Tonelda", value: 2 },
                            ]}
                        />
                    </FieldColumn>

                    <FieldColumn label="Fecha de aplicacion" columns={{ sm: 6 }}>
                        <Controller
                            name="FechaAplicacion"
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

export default DietaAplicadaSidebarCreate;