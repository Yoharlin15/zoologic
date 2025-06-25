import React, { useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldValues } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import {
    Dropdown,
    InputNumber,
    InputText,
    MultiSelect,
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IDietaCreate, IInventarioCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchAlimentos } from "ClientApp/hooks/useFetch";
import { useCreateDietas } from "ClientApp/hooks/useMutation";

interface IDietaSidebarProps {
    id?: number;
    visible: boolean;
    onHide: () => void;
    dietaId: number | undefined;
}

const DietaSidebarCreate = ({ onHide, visible }: IDietaSidebarProps) => {
    const toast = useRef<Toast>(null);


    const { data: alimentos } = useFetchAlimentos();
    const createDieta = useCreateDietas();

    const { control, handleSubmit, reset } = useForm<IDietaCreate, FieldValues>({
        mode: "onChange",
        defaultValues: {
            Nombre: "",
            Descripcion: "",
            AlimentoId: [],
            Cantidad: undefined,
        },
    });

    const onSubmit = async (data: IDietaCreate) => {
        const payload = {
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
            Alimentos: data.AlimentoId.map((id) => ({
                AlimentoId: Number(data.AlimentoId),
                Cantidad: Number(data.Cantidad),
            })),
        };


        console.log("Payload:", payload);
        // para mostrar mensajes
        try {
            const res = await createDieta.mutateAsync(payload);
            toast.current?.show({
                severity: "success",
                summary: "Éxito",
                detail: res?.mensaje || "Dieta registrada correctamente.",
            });
            reset();
            onHide();
        } catch (error: any) {
            console.error("Error:", error.response?.data || error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error.response?.data?.mensaje || "Hubo un error al registrar la dieta.",
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
                header={<h1 className="font-semibold text-2xl text-900">Nueva dieta</h1>}
            >
                <Form>
                    <FieldColumn label="Dieta" columns={{ sm: 6 }}>
                        <InputText
                            name="Nombre"
                            control={control}
                            placeholder="Nombre de la dieta"
                            rules={{ required: "Campo obligatorio" }} />
                    </FieldColumn>

                    <FieldColumn label="Descripcion" columns={{ sm: 6 }}>
                        <InputText
                            name="Descripcion"
                            control={control}
                            placeholder="Descripcion de la dieta"
                            rules={{ required: "Campo obligatorio" }} />
                    </FieldColumn>

                    <FieldColumn label="Alimentos" columns={{ sm: 6 }}>
                        <MultiSelect
                            name="AlimentoId"
                            control={control}
                            placeholder="Seleccione los alimentos"
                            rules={{ required: "Campo obligatorio" }}
                            options={alimentos || []}
                            optionLabel="Nombre" // ✅ este se ignoraba antes
                            optionValue="AlimentoId"
                        />
                    </FieldColumn>

                    <FieldColumn label="Cantidad" columns={{ sm: 6 }}>
                        <InputNumber
                            name="Cantidad"
                            control={control}
                            placeholder="Cantidad"
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

export default DietaSidebarCreate;