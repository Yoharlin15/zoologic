import React, { useMemo, useState } from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";
import { Routes } from "#core";
import { useFetchComentarios } from "ClientApp/hooks/useFetch/useFetchComentarios";
import { IComentario } from "ClientApp/interfaces/comentario";


export interface ComentariosDialogProps {
  visible?: boolean;
  onHide?: () => void;
}

const formatDate = (iso?: string) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return new Intl.DateTimeFormat("es-DO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

const getTipoSeverity = (tipo?: string) => {
  switch ((tipo || "").toLowerCase()) {
    case "positivo": return "success" as const;
    case "sugerencia": return "info" as const;
    case "problema": return "danger" as const;
    default: return "secondary" as const;
  }
};

const ComentariosDialog: React.FC<ComentariosDialogProps> = ({ visible, onHide }) => {
  const navigate = useNavigate();
  const isRouteMode = typeof visible === "undefined";
  const [open, setOpen] = useState(true);
  const actuallyVisible = isRouteMode ? open : !!visible;

  const { data, isLoading, isError, refetch, isFetching } = useFetchComentarios();
  const [searchText, setSearchText] = useState("");

  const comentarios: IComentario[] = Array.isArray(data) ? data : [];

  const filtered = useMemo(() => {
    const text = searchText.trim().toLowerCase();
    if (!text) return comentarios;
    return comentarios.filter((c) =>
      c.Comentario?.toLowerCase().includes(text) ||
      c.Nombre?.toLowerCase().includes(text) ||
      c.Correo?.toLowerCase().includes(text) ||
      String(c.Telefono || "").toLowerCase().includes(text) ||
      String(c.Tipo || "").toLowerCase().includes(text)
    );
  }, [comentarios, searchText]);

  const header = (
    <div className="flex align-items-center gap-3 w-full">
      <span className="p-input-icon-left w-full">
        <InputText
          className="w-full"
          placeholder="Buscar por nombre, correo, teléfono o texto..."
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
        />
      </span>
      <Button
        label="Recargar"
        icon="pi pi-refresh"
        onClick={() => refetch()}
        loading={isFetching}
        outlined
      />
    </div>
  );

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Cerrar"
        onClick={() => {
          if (isRouteMode) {
            setOpen(false);
            setTimeout(() => {
              if (window.history.length > 1) navigate(-1);
              else navigate(Routes.LANDING_ROUTE);
            }, 0);
          } else {
            onHide?.();
          }
        }}
        className="p-button-text"
      />
    </div>
  );

  return (
    <Dialog
      header={
        <div className="flex align-items-center justify-content-between w-full">
          <div className="font-semibold text-xl">Comentarios de Clientes</div>
          <div className="text-600 text-sm">{filtered.length} comentario(s)</div>
        </div>
      }
      visible={actuallyVisible}
      onHide={() => {
        if (isRouteMode) {
          setOpen(false);
          setTimeout(() => {
            if (window.history.length > 1) navigate(-1);
            else navigate(Routes.LANDING_ROUTE);
          }, 0);
        } else {
          onHide?.();
        }
      }}
      style={{ width: "min(1100px, 95vw)" }}
      draggable={false}
      resizable={false}
      footer={footer}
      blockScroll
      dismissableMask
    >
      {isLoading ? (
        <div className="flex justify-content-center align-items-center" style={{ minHeight: 280 }}>
          <ProgressSpinner />
        </div>
      ) : isError ? (
        <div className="text-center p-4">
          <i className="pi pi-exclamation-triangle text-2xl text-red-500" />
          <p className="mt-2">Ocurrió un error al cargar los comentarios.</p>
          <Button label="Reintentar" icon="pi pi-refresh" onClick={() => refetch()} />
        </div>
      ) : (
        <DataTable value={filtered} header={header} paginator rows={10} rowsPerPageOptions={[10, 20, 50]} sortField="FechaCreacion" sortOrder={-1} emptyMessage="Sin comentarios" className="p-datatable-sm" scrollable scrollHeight="50vh" stripedRows dataKey="ComentarioId">
          <Column field="Tipo" header="Tipo" body={(row: IComentario) => (<Tag value={(row.Tipo || "").toString()} severity={getTipoSeverity(row.Tipo)} />)} style={{ width: 100 }} sortable />
          <Column field="Comentario" header="Comentario" body={(row: IComentario) => (<span title={row.Comentario || ""} className="line-clamp-2" style={{ display: "inline-block", maxWidth: 420 }}>{row.Comentario}</span>)} style={{ minWidth: 260 }} />
          <Column field="Nombre" header="Nombre" sortable style={{ minWidth: 160 }} />
          <Column field="Correo" header="Correo" sortable style={{ minWidth: 180 }} />
          <Column field="Telefono" header="Teléfono" style={{ minWidth: 140 }} />
          <Column field="FechaCreacion" header="Fecha" body={(row: IComentario) => formatDate((row as any).FechaCreacion)} sortable style={{ width: 180 }} />
        </DataTable>
      )}
    </Dialog>
  );
};

export default ComentariosDialog;
