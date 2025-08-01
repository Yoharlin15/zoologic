import React, { useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown, InputNumber, InputText } from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IInventarioCreate, IUnidadMedidaByAlimentoId } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchAlimentos, useFetchOneInventario, useFetchUnidadMedidaByAlimentoId } from "ClientApp/hooks/useFetch";
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext";
import { useCreateInventario, useUpdateInventario } from "ClientApp/hooks/useMutation/useMutationInventario";

interface IInventarioSidebarProps {
    id?: number;
    visible: boolean;
    onHide: () => void;
    inventarioId?: number;
}

const InventarioSidebarForm = ({ id, onHide, visible }: IInventarioSidebarProps) => {
    const toast = useRef<Toast>(null);
    const { data: alimentos } = useFetchAlimentos();
    const { data: inventarioData } = useFetchOneInventario(id!);
    const createInventario = useCreateInventario();
    const updateInventario = useUpdateInventario();

    const { usuarioId } = useAuth();

    const { control, handleSubmit, reset, watch } = useForm<IInventarioCreate, FieldValues>({
        mode: "onChange",
        defaultValues: {
            AlimentoId: undefined,
            Cantidad: undefined,
            UnidadMedidaId: undefined,
            CreadoPor: usuarioId
        },
    });
    const selectedAlimentoId = watch("AlimentoId");

    const { data: UnidadByAlimento } = useFetchUnidadMedidaByAlimentoId(selectedAlimentoId);
    const [filteredUnidades, setFilteredUnidades] = useState<IUnidadMedidaByAlimentoId[]>([]);

    useEffect(() => {
        if (UnidadByAlimento) {
            setFilteredUnidades(Array.isArray(UnidadByAlimento) ? UnidadByAlimento : [UnidadByAlimento]);
        } else {
            setFilteredUnidades([]);
        }
    }, [UnidadByAlimento]);

    // Prellenar el formulario si es edición
    useEffect(() => {
        if (inventarioData) {
            reset({
                AlimentoId: inventarioData.AlimentoId || undefined,
                UnidadMedidaId: inventarioData.UnidadMedidaId || undefined,
                Cantidad: inventarioData.Cantidad || undefined,
                CreadoPor: inventarioData.CreadoPor || usuarioId
            });
        }
    }, [inventarioData, reset]);

    useEffect(() => {
        if (!id && visible) {
            reset({
                AlimentoId: undefined,
                UnidadMedidaId: undefined,
                Cantidad: undefined,
                CreadoPor: usuarioId
            });
        }
    }, [id, visible, reset]);

    const onSubmit = async (data: IInventarioCreate) => {
        const payload = {
            AlimentoId: Number(data.AlimentoId),
            UnidadMedidaId: Number(data.UnidadMedidaId),
            Cantidad: Number(data.Cantidad),
            CreadoPor: data.CreadoPor || usuarioId
        };

        try {
            let res;
            if (id) {
                res = await updateInventario.mutateAsync({ InventarioId: id, ...payload });
            } else {
                res = await createInventario.mutateAsync(payload);
            }

            toast.current?.show({
                severity: "success",
                summary: "Éxito",
                detail: res?.mensaje || `Item ${id ? "actualizado" : "agregado"} correctamente.`,
            });

            reset();
            onHide();
        } catch (error: any) {
            console.error("Error:", error.response?.data || error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error.response?.data?.mensaje || `Hubo un error al ${id ? "actualizar" : "agregar"} el item.`,
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
                className="w-full sm:w-8 md:w-6 lg:w-3 xl:w-3"
                header={<h1 className="font-semibold text-2xl text-900">{id ? "Editar item" : "Nuevo item"}</h1>}
            >
                <Form>
                    <FieldColumn label="Alimento">
                        <Dropdown
                            name="AlimentoId"
                            control={control}
                            placeholder="Seleccione un alimento"
                            rules={{ required: "Campo obligatorio" }}
                            options={alimentos || []}
                            optionLabel="Nombre"
                            optionValue="AlimentoId"
                        />
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

                    <FieldColumn label="Cantidad">
                        <InputText
                            name="Cantidad"
                            control={control}
                            placeholder="Cantidad"
                            rules={{ required: "Campo obligatorio" }}
                        />
                    </FieldColumn>

                    <input type="hidden" name="CreadoPor" value={usuarioId!} />
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

export default InventarioSidebarForm;
