import React, { useEffect, useRef } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { Dropdown, InputText } from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IUsuarioUpdate } from "#interfaces";

import {
    useFetchEmpleados,
    useFetchRoles,
    useFetchOneUsuario,
} from "ClientApp/hooks/useFetch";
import { useUpdateUsuarios } from "ClientApp/hooks/useMutation/useMutationUsuarios";

interface IUsuarioSidebarProps {
    visible: boolean;
    onHide: () => void;
    usuarioId: number;
    onUpdateSuccess?: () => void;
}

const UsuarioSidebarUpdate = ({
    visible,
    onHide,
    usuarioId,
    onUpdateSuccess,
}: IUsuarioSidebarProps) => {
    const toast = useRef<Toast>(null);
    const { data: roles } = useFetchRoles();
    const { data: empleados } = useFetchEmpleados();
    const { data: usuario, isSuccess } = useFetchOneUsuario(usuarioId);

    const updateUsuario = useUpdateUsuarios();

    const {
        control,
        handleSubmit,
        reset,
        setValue,
    } = useForm<IUsuarioUpdate, FieldValues>({
        mode: "onChange",
        defaultValues: {
            UsuarioId: usuarioId,
            NombreUsuario: "",
            RolId: undefined,
            EmpleadoId: undefined,
        },
    });

    useEffect(() => {
        if (usuario && isSuccess) {
            setValue("UsuarioId", usuario.UsuarioId); 
            setValue("NombreUsuario", usuario.NombreUsuario);
            setValue("RolId", usuario.RolId);
            setValue("EmpleadoId", usuario.EmpleadoId);
        }
    }, [usuario, isSuccess, setValue]);

    const onSubmit = async (data: IUsuarioUpdate) => {
        try {
            const res = await updateUsuario.mutateAsync(data);
            toast.current?.show({
                severity: "success",
                summary: "Éxito",
                detail: res?.mensaje || "Usuario actualizado correctamente.",
            });
            reset();
            onHide();
            onUpdateSuccess?.();
        } catch (error: any) {
            console.error("Error:", error.response?.data || error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error.response?.data?.mensaje || "Hubo un error al actualizar el usuario.",
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
                className="w-full sm:w-8 md:w-6 lg:w-6 xl:w-3"
                header={<h1 className="font-semibold text-2xl text-900">Editar usuario</h1>}
            >
                <Form>
                    <FieldColumn label="Nombre de usuario">
                        <InputText
                            name="NombreUsuario"
                            control={control}
                            placeholder="Usuario"
                            rules={{ required: "Campo obligatorio" }}
                        />
                    </FieldColumn>

                    <FieldColumn label="Rol">
                        <Dropdown
                            name="RolId"
                            control={control}
                            placeholder="Seleccione un rol"
                            rules={{ required: "Campo obligatorio" }}
                            options={roles || []}
                            optionLabel="Nombre"
                            optionValue="RolId"
                        />
                    </FieldColumn>

                    <FieldColumn label="Empleado">
                        <Dropdown
                            name="EmpleadoId"
                            control={control}
                            placeholder="Seleccione un empleado"
                            rules={{ required: "Campo obligatorio" }}
                            options={empleados || []}
                            optionLabel="Nombres"
                            optionValue="EmpleadoId"
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
                        label="Actualizar"
                        severity="success"
                        onClick={handleSubmit(onSubmit)}
                    />
                </div>
            </Sidebar>
        </>
    );
};

export default UsuarioSidebarUpdate;
