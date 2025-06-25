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
} from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IInventarioCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useCreateInventario } from "ClientApp/hooks/useMutation/useMutationInventario";
import { useFetchAlimentos, useFetchInventario } from "ClientApp/hooks/useFetch";

interface IInventarioSidebarProps {
    id?: number;
    visible: boolean;
    onHide: () => void;
    inventarioId: number | undefined;
}

const InventarioSidebarCreate = ({ onHide, visible }: IInventarioSidebarProps) => {
    const toast = useRef<Toast>(null);


    const { data: alimentos } = useFetchAlimentos();
    const createInventario = useCreateInventario();

    const { control, handleSubmit, reset } = useForm<IInventarioCreate, FieldValues>({
        mode: "onChange",
        defaultValues: {
            AlimentoId: undefined,
            Cantidad: undefined,
        },
    });

    const onSubmit = async (data: IInventarioCreate) => {
        const payload = {
            AlimentoId: Number(data.AlimentoId),
            Cantidad: Number(data.Cantidad),
        };

        console.log("Payload:", payload);
        // para mostrar mensajes
        try {
            const res = await createInventario.mutateAsync(payload);
            toast.current?.show({
                severity: "success",
                summary: "Éxito",
                detail: res?.mensaje || "Item agregado correctamente.",
            });
            reset();
            onHide();
        } catch (error: any) {
            console.error("Error:", error.response?.data || error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error.response?.data?.mensaje || "Hubo un error al agregar el Item.",
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
                header={<h1 className="font-semibold text-2xl text-900">Nuevo item</h1>}
            >
                <Form>
                    <FieldColumn label="Alimento" columns={{ sm: 6 }}>
                        <Dropdown
                            name="AlimentoId"
                            control={control}
                            placeholder="Seleccione el padre"
                            rules={{ required: "Campo obligatorio" }}
                            options={alimentos || []}
                            optionLabel="Nombre"
                            optionValue="AlimentoId" />
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

export default InventarioSidebarCreate;