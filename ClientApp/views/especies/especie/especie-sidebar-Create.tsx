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
import { IEspecieCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchClases, useFetchFamilias, useFetchProcedencias } from "ClientApp/hooks/useFetch";
import { useCreateEspecie } from "ClientApp/hooks/useMutation";

interface IEspecieSidebarProps {
    id?: number;
    visible: boolean;
    onHide: () => void;
    especieId: number | undefined;
}

const EspecieSidebarCreate = ({ onHide, visible }: IEspecieSidebarProps) => {
    const toast = useRef<Toast>(null);
    const { data: familias } = useFetchFamilias();
    const { data: clases } = useFetchClases();
    const { data: procedencias } = useFetchProcedencias();
    const createEspecie = useCreateEspecie();


    const { control, handleSubmit, reset } = useForm<IEspecieCreate, FieldValues>({
        mode: "onChange",
        defaultValues: {
            NombreCientifico: "",
            NombreComun: "",
            FamiliaId: 0,
            ClaseId: 0,
            ProcedenciaId: 0,
        },
    });

    const onSubmit = async (data: IEspecieCreate) => {
        const payload = {
            NombreCientifico: data.NombreCientifico,
            NombreComun: data.NombreComun,
            FamiliaId: Number(data.FamiliaId),
            ClaseId: Number(data.ClaseId),
            ProcedenciaId: Number(data.ProcedenciaId),
        };

        console.log("Payload:", payload);
        // para mostrar mensajes
        try {
            const res = await createEspecie.mutateAsync(payload);
            toast.current?.show({
                severity: "success",
                summary: "Éxito",
                detail: res?.mensaje || "Especie creada correctamente.",
            });
            reset();
            onHide();
        } catch (error: any) {
            console.error("Error:", error.response?.data || error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error.response?.data?.mensaje || "Hubo un error al crear la especie.",
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
                header={<h1 className="font-semibold text-2xl text-900">Nueva especie</h1>}
            >
                <Form>
                    <FieldColumn label="Nombre cientifico" columns={{ sm: 6 }}>
                        <InputText
                            name="NombreCientifico"
                            control={control}
                            placeholder="Nombre Cientifico"
                            rules={{ required: "Campo obligatorio" }} />
                    </FieldColumn>

                    <FieldColumn label="Nombre comun" columns={{ sm: 6 }}>
                        <InputText
                            name="NombreComun"
                            control={control}
                            placeholder="Apellidos"
                            rules={{ required: "Campo obligatorio" }} />
                    </FieldColumn>

                    <FieldColumn label="Familia" columns={{ sm: 6 }}>
                        <Dropdown
                            name="FamiliaId"
                            control={control}
                            placeholder="Seleccione el padre"
                            rules={{ required: "Campo obligatorio" }}
                            options={familias || []}
                            optionLabel="FamiliaNombre"
                            optionValue="FamiliaId" />
                    </FieldColumn>

                    <FieldColumn label="Clase" columns={{ sm: 6 }}>
                        <Dropdown
                            name="ClaseId"
                            control={control}
                            placeholder="Seleccione el padre"
                            rules={{ required: "Campo obligatorio" }}
                            options={clases || []}
                            optionLabel="ClaseNombre"
                            optionValue="ClaseId" />
                    </FieldColumn>

                    <FieldColumn label="Procedencia" columns={{ sm: 6 }}>
                        <Dropdown
                            name="ProcedenciaId"
                            control={control}
                            placeholder="Seleccione el padre"
                            rules={{ required: "Campo obligatorio" }}
                            options={procedencias || []}
                            optionLabel="ProcedenciaNombre"
                            optionValue="ProcedenciaId" />
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

export default EspecieSidebarCreate;