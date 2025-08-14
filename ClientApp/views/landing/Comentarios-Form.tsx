// TODO: ajusta los paths de import según tu estructura real
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useCreateCompra } from 'ClientApp/hooks/useMutation/useMutationCompra';
import { useCreateComentarios } from 'ClientApp/hooks/useMutation/useMutationComentarios';
import { ICreateComentario } from 'ClientApp/interfaces/comentario';

type TipoComentario = 'positivo' | 'sugerencia' | 'problema';

export interface ComentariosFormProps {
  className?: string;
  cardTitle?: string;
  onSuccess?: () => void;
  // Prefills opcionales (por si quieres usar datos del usuario autenticado)
  defaultNombre?: string;
  defaultCorreo?: string;
  defaultTelefono?: string;
}

const tiposComentario = [
  { label: 'Comentario positivo', value: 'positivo' as TipoComentario },
  { label: 'Sugerencia', value: 'sugerencia' as TipoComentario },
  { label: 'Reportar problema', value: 'problema' as TipoComentario },
];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const ComentariosForm: React.FC<ComentariosFormProps> = ({
  className,
  cardTitle = 'Tu opinión nos importa',
  onSuccess,
  defaultNombre = '',
  defaultCorreo = '',
  defaultTelefono = '',
}) => {
  const [nombre, setNombre] = useState(defaultNombre);
  const [correo, setCorreo] = useState(defaultCorreo);
  const [telefono, setTelefono] = useState(defaultTelefono);
  const [tipoComentario, setTipoComentario] = useState<TipoComentario | null>(null);
  const [comentario, setComentario] = useState('');

  const { mutate: crearComentario, isPending } = useCreateComentarios();

  const reset = () => {
    setNombre(defaultNombre || '');
    setCorreo(defaultCorreo || '');
    setTelefono(defaultTelefono || '');
    setTipoComentario(null);
    setComentario('');
  };

  const handleSubmit = () => {
    if (!nombre.trim()) return alert('El nombre es obligatorio.');
    if (!correo.trim() || !isEmail(correo)) return alert('Correo no válido.');
    if (!telefono.trim()) return alert('El teléfono es obligatorio.');
    if (!tipoComentario) return alert('Selecciona un tipo de comentario.');
    if (!comentario.trim()) return alert('Escribe tu mensaje.');

    const payload: ICreateComentario = {
      Tipo: tipoComentario,
      Comentario: comentario.trim(),
      Nombre: nombre.trim(),
      Correo: correo.trim(),
      Telefono: telefono.trim(),
      // FechaCreacion: new Date().toISOString(), // ← solo si tu API lo requiere
    };

    crearComentario(payload, {
      onSuccess: () => {
        alert('¡Gracias! Hemos recibido tu comentario.');
        setTimeout(() => {
          window.dispatchEvent(new Event("comments:new"));
        }, 0); // se dispara en el siguiente ciclo de render
        reset();
        onSuccess?.();
      },
      onError: (err: any) => {
        console.error(err);
        alert('No se pudo enviar el comentario. Intenta de nuevo.');
      },
    });
  };

  return (
    <div className={className}>
      <Card
        title={cardTitle}
        className="shadow-md border border-gray-200 rounded-lg w-full max-w-md bg-gray-300"
      >
        <div className="gap-4 px-4 py-2">
          {/* Nombre */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-900">
              Nombre completo <span className="text-red-500 ml-1">*</span>
            </label>
            <InputText
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribe tu nombre completo..."
              className="w-full text-sm border-gray-300 rounded-md"
              disabled={isPending}
            />
          </div>

          {/* Correo */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-900">
              Correo electrónico <span className="text-red-500 ml-1">*</span>
            </label>
            <InputText
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ej: ejemplo@correo.com"
              className="w-full text-sm border-gray-300 rounded-md"
              disabled={isPending}
            />
          </div>

          {/* Teléfono */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-900">
              Teléfono <span className="text-red-500 ml-1">*</span>
            </label>
            <InputText
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ej: +1 809 000 0000"
              className="w-full text-sm border-gray-300 rounded-md"
              disabled={isPending}
            />
          </div>

          {/* Tipo de comentario */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-900">
              Tipo de comentario <span className="text-red-500 ml-1">*</span>
            </label>
            <Dropdown
              value={tipoComentario}
              onChange={(e) => setTipoComentario(e.value)}
              options={tiposComentario}
              placeholder="Selecciona..."
              className="w-full text-sm border-gray-300 rounded-md"
              panelClassName="shadow-md text-sm border border-gray-200"
              disabled={isPending}
            />
          </div>

          {/* Mensaje */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Tu mensaje <span className="text-red-500 ml-1">*</span>
            </label>
            <InputTextarea
              autoResize
              rows={3}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Escribe tu comentario..."
              className="w-full text-sm border-gray-300 rounded-md"
              disabled={isPending}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="mt-3 mb-3 flex justify-end gap-2 px-4">
          <Button
            label={isPending ? 'Enviando...' : 'Enviar'}
            icon={isPending ? 'pi pi-spin pi-spinner' : 'pi pi-send'}
            iconPos="right"
            className="p-button-sm bg-green-600 hover:bg-green-700 border-green-600 text-xs disabled:opacity-70"
            onClick={handleSubmit}
            disabled={isPending}
          />
        </div>
      </Card>
    </div>
  );
};

export default ComentariosForm;
