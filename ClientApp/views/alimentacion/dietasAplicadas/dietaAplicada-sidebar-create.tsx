import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { IDietaAplicadaCreate, IUnidadMedidaByAlimentoId } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchAlimentosEspecies, useFetchAnimales, useFetchUnidadMedidaByAlimentoId } from "ClientApp/hooks/useFetch";
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
    const { data: alimentoEspecies } = useFetchAlimentosEspecies();
    const createDieta = useCreateDietasAplicadas();

    const { control, handleSubmit, reset, watch, } = useForm<IDietaAplicadaCreate, FieldValues>({
        mode: "onChange",
        defaultValues: {
            AnimalId: undefined,
            AlimentoId: undefined,
            UnidadMedidaId: undefined,
            Cantidad: undefined,
            FechaAplicacion: null,
        },
    });
    const selectedAnimalId = watch("AnimalId");
    const selectedAlimentoId = watch("AlimentoId");

    const selectedAnimal = useMemo(() => {
        return animales?.find((a) => a.AnimalId === selectedAnimalId);
    }, [animales, selectedAnimalId]);

    const especieId = selectedAnimal?.EspecieId;

    const alimentosFiltrados = useMemo(() => {
        if (!especieId || !alimentoEspecies) return [];
        return alimentoEspecies.filter((t) => t.EspecieId === especieId);
    }, [alimentoEspecies, especieId]);

    const { data: UnidadByAlimento } = useFetchUnidadMedidaByAlimentoId(selectedAlimentoId);
    const [filteredUnidades, setFilteredUnidades] = useState<IUnidadMedidaByAlimentoId[]>([]);

    useEffect(() => {
        if (UnidadByAlimento) {
            setFilteredUnidades(Array.isArray(UnidadByAlimento) ? UnidadByAlimento : [UnidadByAlimento]);
        } else {
            setFilteredUnidades([]);
        }
    }, [UnidadByAlimento]);

    const onSubmit = async (data: IDietaAplicadaCreate) => {
        const payload = {
            AnimalId: Number(data.AnimalId),
            AlimentoId: Number(data.AlimentoId),
            UnidadMedidaId: Number(data.UnidadMedidaId),
            Cantidad: Number(data.Cantidad),
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
                className="w-full sm:w-8 md:w-6 lg:w-6 xl:w-3"
                header={<h1 className="font-semibold text-2xl text-900">Aplicar dieta</h1>}
            >
                <Form>
                    <FieldColumn label="Animal(codigo)" columns={{ sm: 12 }}>
                        <Dropdown
                            name="AnimalId"
                            control={control}
                            placeholder="Seleccione el codigo"
                            rules={{ required: "Campo obligatorio" }}
                            options={animales || []}
                            optionLabel="IdentificadorUnico"
                            optionValue="AnimalId" />
                    </FieldColumn>

                    <FieldColumn label="Alimento" columns={{ sm: 12 }}>
                        <Dropdown
                            name="AlimentoId"
                            control={control}
                            placeholder="Seleccione el alimentos"
                            rules={{ required: "Campo obligatorio" }}
                            options={alimentosFiltrados}
                            optionLabel="AlimentoNombre"
                            optionValue="AlimentoId"
                            disabled={!especieId} />
                    </FieldColumn>

                    <FieldColumn label="Unidad de medida">
                        <Dropdown
                            name="UnidadMedidaId"
                            control={control}
                            placeholder="Seleccione una Especie"
                            rules={{ required: "Campo obligatorio" }}
                            options={filteredUnidades || []}
                            optionLabel="UnidadMedida"
                            optionValue="UnidadMedidaId"
                            disabled={!selectedAlimentoId}
                        />
                    </FieldColumn>

                    <FieldColumn label="Cantidad" columns={{ sm: 12 }}>
                        <InputText
                            name="Cantidad"
                            control={control}
                            placeholder="Cantidad"
                            rules={{ required: "Campo obligatorio" }}
                        />
                    </FieldColumn>

                    <FieldColumn label="Fecha de aplicacion" columns={{ sm: 12 }}>
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