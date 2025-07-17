import React, { useEffect, useRef, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown, InputText } from "ClientApp/components/inputs";
import { FieldColumn, Form } from "ClientApp/components/form";
import { IEspecieCreate } from "#interfaces";
import { Toast } from "primereact/toast";
import { useFetchClases, useFetchFamilias, useFetchHabitats, useFetchOneEspecie, useFetchProcedencias } from "ClientApp/hooks/useFetch";
import { useCreateEspecie, useUpdateEspecie } from "ClientApp/hooks/useMutation";
import { FileUpload } from "primereact/fileupload";


interface IEmpleadoSidebarProps {
  id?: number;
  visible: boolean;
  onHide: () => void;
  especieId?: number;
}

const EspecieSidebarForm = ({ id, onHide, visible }: IEmpleadoSidebarProps) => {
  const toast = useRef<Toast>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { data: familias } = useFetchFamilias();
  const { data: clases } = useFetchClases();
  const { data: procedencias } = useFetchProcedencias();
  const { data: habitats } = useFetchHabitats();
  const { data: especieData } = useFetchOneEspecie(id!);

  const createEspecie = useCreateEspecie();
  const updateEspecie = useUpdateEspecie();

  const { control, handleSubmit, reset, setValue } = useForm<IEspecieCreate, FieldValues>({
    mode: "onChange",
    defaultValues: {
      NombreComun: "",
      NombreCientifico: "",
      FamiliaId: undefined,
      ClaseId: undefined,
      ProcedenciaId: undefined,
      FotoUrl: "",
    },
  });

  useEffect(() => {
    if (id && especieData) {
      reset({
        NombreCientifico: especieData.NombreCientifico || "",
        NombreComun: especieData.NombreComun || "",
        FamiliaId: especieData.FamiliaId || undefined,
        ClaseId: especieData.ClaseId || undefined,
        ProcedenciaId: especieData.ProcedenciaId || undefined,
        FotoUrl: especieData.FotoUrl || "",
      });
    } else if (!id) {
      reset({
        NombreCientifico: "",
        NombreComun: "",
        FamiliaId: undefined,
        ClaseId: undefined,
        ProcedenciaId: undefined,
        FotoUrl: "",
      });
      setSelectedImage(null);
    }
  }, [id, especieData, reset]);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default_unsigned");

    const res = await fetch("https://api.cloudinary.com/v1_1/dlbb3qssp/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.secure_url.includes("/upload/")) {
      throw new Error("URL inesperada de Cloudinary");
    }

    if (!data.secure_url) throw new Error("Error al subir imagen a Cloudinary");

    // Generamos una URL redimensionada: 258x177 con crop "fill"
    const transformedUrl = data.secure_url.replace(
      "/upload/",
      "/upload/w_258,h_177,c_fill/"
    );

    return transformedUrl;
  };

  const onSubmit = async (data: IEspecieCreate) => {
    try {

      console.log("Datos antes del submit:", data);
      console.log("Imagen seleccionada:", selectedImage);

      let fotoUrl = data.FotoUrl;

      if (selectedImage) {
        fotoUrl = await uploadToCloudinary(selectedImage);
      }

      const payload = {
        NombreCientifico: data.NombreCientifico,
        NombreComun: data.NombreComun,
        FamiliaId: Number(data.FamiliaId),
        ClaseId: Number(data.ClaseId),
        ProcedenciaId: Number(data.ProcedenciaId),
        FotoUrl: fotoUrl || "",
      };

      console.log("Payload a enviar:", payload);

      let res;
      if (id) {
        res = await updateEspecie.mutateAsync({ EspecieId: id, ...payload });
      } else {
        res = await createEspecie.mutateAsync(payload);
      }

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: res?.mensaje || `Especie ${id ? "actualizada" : "creada"} correctamente.`,
      });

      reset();
      setSelectedImage(null);
      onHide();
    } catch (error: any) {
      console.error("Error:", error.response?.data || error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.mensaje || `Hubo un error al ${id ? "actualizar" : "crear"} la especie.`,
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
          setSelectedImage(null);
          onHide();
        }}
        className="w-full sm:w-8 md:w-6 lg:w-6 xl:w-4"
        header={<h1 className="font-semibold text-2xl text-900">{id ? "Editar especie" : "Nueva especie"}</h1>}
      >
        <Form>
          <FieldColumn label="Nombre cientifico" columns={{ sm: 6 }}>
            <InputText
              name="NombreCientifico"
              control={control}
              placeholder="Nombre cientifico"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Nombre comun" columns={{ sm: 6 }}>
            <InputText
              name="NombreComun"
              control={control}
              placeholder="Nombre comun"
              rules={{ required: "Campo obligatorio" }}
            />
          </FieldColumn>

          <FieldColumn label="Familia" columns={{ sm: 6 }}>
            <Dropdown
              name="FamiliaId"
              control={control}
              placeholder="Seleccione una familia"
              rules={{ required: "Campo obligatorio" }}
              options={familias || []}
              optionLabel="FamiliaNombre"
              optionValue="FamiliaId"
            />
          </FieldColumn>

          <FieldColumn label="Clase" columns={{ sm: 6 }}>
            <Dropdown
              name="ClaseId"
              control={control}
              placeholder="Seleccione una clase"
              rules={{ required: "Campo obligatorio" }}
              options={clases || []}
              optionLabel="ClaseNombre"
              optionValue="ClaseId"
            />
          </FieldColumn>

          <FieldColumn label="Procedencia" columns={{ sm: 6 }}>
            <Dropdown
              name="ProcedenciaId"
              control={control}
              placeholder="Seleccione una procedencia"
              rules={{ required: "Campo obligatorio" }}
              options={procedencias || []}
              optionLabel="ProcedenciaNombre"
              optionValue="ProcedenciaId"
            />
          </FieldColumn>

          <FieldColumn label="Habitat" columns={{ sm: 6 }}>
            <Dropdown
              name="HabitatId"
              control={control}
              placeholder="Seleccione un habitat"
              rules={{ required: "Campo obligatorio" }}
              options={habitats || []}
              optionLabel="Nombre"
              optionValue="HabitatId"
            />
          </FieldColumn>

          <FieldColumn label="Imagen de la especie" columns={{ sm: 6 }}>
            <FileUpload
              name="file"
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              customUpload
              chooseLabel="Seleccionar imagen"
              onSelect={(e) => {
                const file = e.files?.[0];
                if (!file) return;

                setSelectedImage(file);

                toast.current?.show({
                  severity: "info",
                  summary: "Imagen seleccionada",
                  detail: "La imagen se subirá al guardar.",
                });

                console.log("Imagen seleccionada:", file);
              }}
            />
          </FieldColumn>
        </Form>

        <div className="flex justify-content-end gap-2 mt-4">
          <Button
            label="Cancelar"
            severity="secondary"
            onClick={() => {
              reset();
              setSelectedImage(null);
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

export default EspecieSidebarForm;
