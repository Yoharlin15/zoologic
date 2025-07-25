import React, { useMemo, useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { IRolesPermisos, IUpdateRolesPermisos } from "#interfaces";
import { Toast } from 'primereact/toast';
import { useFetchPermisosByRolId } from "ClientApp/hooks/useFetch";
import { useUpdateRolesPermisos } from "ClientApp/hooks/useMutation";
import { ProgressSpinner } from "primereact/progressspinner";

interface Props {
  visible: boolean;
  onHide: () => void;
  rolId: number;
}

const acciones = ["Ver", "Crear", "Editar", "Eliminar"];

export const PermisosDialog = ({ visible, onHide, rolId }: Props) => {
  const toastRef = useRef<Toast>(null);  // Usamos la referencia aquí
  const { data, isLoading } = useFetchPermisosByRolId(rolId);
  const { mutate: updatePermisos } = useUpdateRolesPermisos();
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<IUpdateRolesPermisos[]>([]);

  const permisosPorModulo = useMemo(() => {
    const grouped: Record<number, { nombre: string; acciones: Record<string, boolean> }> = {};
    data?.forEach((permiso: IRolesPermisos) => {
      if (!grouped[permiso.ModuloId]) {
        grouped[permiso.ModuloId] = {
          nombre: permiso.ModuloNombre,
          acciones: { Ver: false, Crear: false, Editar: false, Eliminar: false },
        };
      }

      Object.entries(permiso.Acciones).forEach(([accion, valor]) => {
        const accionNombre = accion.charAt(0).toUpperCase() + accion.slice(1).toLowerCase();
        if (acciones.includes(accionNombre) && valor) {
          grouped[permiso.ModuloId].acciones[accionNombre] = true;
        }
      });
    });
    return grouped;
  }, [data]);

  const handleToggle = (moduloId: number, accion: string) => {
    setSelected(prev => {
      const accionId = acciones.indexOf(accion) + 1;
      const existing = prev.find(p => p.ModuloId === moduloId && p.AccionId === accionId);
      if (existing) {
        return prev.filter(p => !(p.ModuloId === moduloId && p.AccionId === accionId));
      }
      return [...prev, { RolId: rolId, ModuloId: moduloId, AccionId: accionId }];
    });
  };

  const isChecked = (moduloId: number, accion: string): boolean => {
    const inOriginal = permisosPorModulo[moduloId]?.acciones[accion];
    const inChanges = selected.find(p => p.ModuloId === moduloId && p.AccionId === acciones.indexOf(accion) + 1);
    return inChanges ? !inOriginal : inOriginal;
  };

  type AccionNombre = "Ver" | "Crear" | "Editar" | "Eliminar";

  const mapToApiFormat = (): IRolesPermisos[] => {
    const baseAcciones = {
      Ver: false,
      Crear: false,
      Editar: false,
      Eliminar: false,
    };

    const result: IRolesPermisos[] = [];

    Object.entries(permisosPorModulo).forEach(([moduloIdStr, modulo]) => {
      const moduloId = Number(moduloIdStr);
      const accionesEstado = { ...baseAcciones };

      acciones.forEach((accion) => {
        const inOriginal = modulo.acciones[accion];
        const accionId = acciones.indexOf(accion) + 1;
        const inChanges = selected.find(p => p.ModuloId === moduloId && p.AccionId === accionId);
        accionesEstado[accion as AccionNombre] = inChanges ? !inOriginal : inOriginal;
      });

      result.push({
        RolId: rolId,
        ModuloId: moduloId,
        ModuloNombre: modulo.nombre,
        Acciones: accionesEstado,
      });
    });

    return result;
  };

  const handleSave = () => {
    const payload = mapToApiFormat();

    if (payload.length === 0) {
      toastRef.current?.show({
        severity: "warn",
        summary: "Sin cambios",
        detail: "No hay modificaciones para guardar",
        life: 3000
      });
      return;
    }

    setSaving(true);

    updatePermisos(payload, {
      onSuccess: () => {
        toastRef.current?.show({
          severity: "success",
          summary: "Guardado",
          detail: "Permisos actualizados correctamente",
          life: 3000
        });
        // Retrasa el cierre para permitir ver el toast
        setTimeout(() => {
          setSaving(false);
          onHide();
        }, 1000);
      },
      onError: () => {
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al guardar permisos",
          life: 3000
        });
        setSaving(false);
      }
    });
  };

  const handleActivateAll = () => {
    const all: IUpdateRolesPermisos[] = [];

    Object.keys(permisosPorModulo).forEach(moduloIdStr => {
      const moduloId = Number(moduloIdStr);
      acciones.forEach((accion, index) => {
        const isAlreadyOn = permisosPorModulo[moduloId]?.acciones[accion];
        if (!isAlreadyOn) {
          all.push({ RolId: rolId, ModuloId: moduloId, AccionId: index + 1 });
        }
      });
    });

    setSelected(all);
  };

  const handleDeactivateAll = () => {
    setSelected([]); // Desactiva todos los permisos
  };

  return (
    <Dialog
      header="Permisos Roles de Usuario"
      visible={visible}
      style={{ width: "65vw", maxWidth: "1000px" }}
      onHide={onHide}
      className="p-0"
      closable={!saving}
      dismissableMask
      draggable={false}
    >
      <Toast ref={toastRef} />  {/* Agregar el Toast aquí */}

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <ProgressSpinner />
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg shadow-sm text-sm">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wide">
                <tr>
                  <th className="p-2 border text-center">#</th>
                  <th className="p-2 border text-left">Módulo</th>
                  {acciones.map((accion) => (
                    <th key={accion} className="p-2 border text-center">{accion}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {Object.entries(permisosPorModulo).map(([moduloId, modulo], idx) => (
                  <tr key={moduloId} className="hover:bg-gray-50 transition">
                    <td className="p-2 border text-center">{idx + 1}</td>
                    <td className="p-2 border font-medium">{modulo.nombre}</td>
                    {acciones.map((accion) => {
                      const checked = isChecked(Number(moduloId), accion);
                      return (
                        <td key={accion} className="p-2 border text-center">
                          <Button
                            onClick={() => handleToggle(Number(moduloId), accion)}
                            className={`text-xs font-semibold rounded-full px-3 py-1 transition-colors duration-200 border-none
                            ${checked ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
                          >
                            {checked ? "ON" : "OFF"}
                          </Button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              label="Activar Todos"
              icon="pi pi-check-square"
              onClick={handleActivateAll}
              className="bg-blue-500 hover:bg-blue-600 text-white border-none px-4 py-2 rounded-md shadow-sm"
              disabled={saving}
            />
            <Button
              label="Desactivar Todos"
              icon="pi pi-times-circle"
              onClick={handleDeactivateAll}
              className="bg-red-500 hover:bg-red-600 text-white border-none px-4 py-2 rounded-md shadow-sm"
              disabled={saving}
            />
            <Button
              label={saving ? "Guardando..." : "Guardar"}
              icon={saving ? undefined : "pi pi-check"}
              onClick={handleSave}
              disabled={saving || selected.length === 0}
              className="bg-green-600 hover:bg-green-700 text-white border-none px-5 py-2 rounded-md shadow-sm flex items-center gap-2"
            >
              {saving && <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="4" />}
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
};
