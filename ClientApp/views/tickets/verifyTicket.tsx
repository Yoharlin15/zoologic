import React, { useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { ProgressSpinner } from "primereact/progressspinner";
import { useQueryClient } from "@tanstack/react-query";
import type { IValidacionBoleto } from "ClientApp/interfaces/venta";
import { useConfirmTicket, useVerifyTicket } from "ClientApp/hooks/useFetch/useFetchTickets";
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext"; // 👈

const ValidarBoleto: React.FC = () => {
  const toast = useRef<Toast>(null);
  const qc = useQueryClient();
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const code = params.get("code") ?? undefined;

  const { rolId } = useAuth();                            // 👈 rol del usuario
  const canValidate = rolId === 1 || rolId === 3;         // 👈 permiso

  const { data, isLoading, isError } = useVerifyTicket(code);
  const confirmMut = useConfirmTicket();

  const getSeverity = (estado?: string) => {
    switch (estado) {
      case "Válido": return "success";
      case "Usado": return "warning";
      case "Vencido": return "danger";
      default: return "info";
    }
  };

  const onConfirm = () => {
    if (!code || confirmMut.isPending) return;
    confirmMut.mutate(
      { code },
      {
        onSuccess: (resp: IValidacionBoleto) => {
          toast.current?.show({
            severity: resp.Estado === "Usado" ? "success" : "warn",
            summary: resp.Estado,
            detail: resp.mensaje, // ✅ usando `mensaje`
          });
          qc.invalidateQueries({ queryKey: ["verify-ticket", code] });
        },
        onError: () => {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "No se pudo validar el boleto.",
          });
        },
      }
    );
  };

  if (!code) {
    return (
      <div className="p-4 max-w-xl mx-auto">
        <Card title="Validación de Boleto">
          <p>QR inválido: falta el parámetro <b>code</b> en la URL.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Toast ref={toast} />

      <Card title="Validación de Boleto" subTitle={`code: ${code}`}>
        {(isLoading || confirmMut.isPending) && (
          <div className="flex justify-center py-8">
            <ProgressSpinner />
          </div>
        )}

        {!isLoading && isError && (
          <p className="text-red-600">No se pudo validar el boleto.</p>
        )}

        {!isLoading && !isError && data && (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">Estado:</span>
              <Tag value={data.Estado || "—"} severity={getSeverity(data.Estado)} />
            </div>

            {/* ✅ aquí mostramos el mensaje del backend */}
            <p className="text-sm text-gray-600 mb-3">{data.mensaje || "—"}</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-md p-3">
                <div className="text-xs text-gray-500 mb-1">Boleto</div>
                <div><span className="font-medium">ID:</span> {data.BoletoId ?? "—"}</div>
                <div className="break-all">
                  <span className="font-medium">Código QR:</span> {data.CodigoQR ?? "—"}
                </div>
                <div>
                  <span className="font-medium">Vence:</span>{" "}
                  {data.Vencimiento ? new Date(data.Vencimiento).toLocaleString() : "—"}
                </div>
              </div>

              <div className="border rounded-md p-3">
                <div className="text-xs text-gray-500 mb-1">Compra</div>
                <div><span className="font-medium">CompraId:</span> {data.CompraId ?? "—"}</div>
              </div>

              <div className="border rounded-md p-3">
                <div className="text-xs text-gray-500 mb-1">Cantidad</div>
                <div><span className="font-medium">Cantidad:</span> {data.Cantidad ?? "—"}</div>
              </div>
            </div>

            <Divider />

            {/* 🔒 Solo Admin (1) y Boletero (3) pueden validar */}
            {data.Estado === "Válido" && (
              <>
                {canValidate ? (
                  <div className="flex gap-2">
                    <Button
                      label={confirmMut.isPending ? "Validando…" : "Validar y marcar como usado"}
                      icon="pi pi-check"
                      className="p-button-success"
                      onClick={onConfirm}
                      disabled={confirmMut.isPending}
                    />
                    <Button
                      label="Reintentar"
                      icon="pi pi-refresh"
                      className="p-button-secondary"
                      onClick={() => qc.invalidateQueries({ queryKey: ["verify-ticket", code] })}
                    />
                  </div>
                ) : (
                  <p className="text-red-500 font-medium">
                    No tienes permiso para validar el boleto.
                  </p>
                )}
              </>
            )}

            {(data.Estado === "Usado" || data.Estado === "Vencido") && (
              <Button
                label="Reintentar"
                icon="pi pi-refresh"
                className="p-button-secondary"
                onClick={() => qc.invalidateQueries({ queryKey: ["verify-ticket", code] })}
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default ValidarBoleto;
