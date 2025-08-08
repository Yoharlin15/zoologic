import React, { useState, useMemo } from "react";
import { useFetchTiposBoletos } from "ClientApp/hooks/useFetch/useFetchTiposBoletos";
import { Card } from "primereact/card";
import { Badge } from "primereact/badge";
import { Calendar } from "primereact/calendar";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import { useCreateCompra } from "ClientApp/hooks/useMutation/useMutationCompra";
import { useAuth } from "ClientApp/contexts/AuthContext/AuthContext";
import { Routes } from "#core";

const ComprarBoletos = () => {
  const { data: tiposBoletos, isLoading } = useFetchTiposBoletos();
  const { mutate: crearCompra, isPending } = useCreateCompra();
  const { usuarioId } = useAuth();
  const navigate = useNavigate();

  const [cantidadPorTipo, setCantidadPorTipo] = useState<{ [id: number]: number }>({});
  const [fechaVisita, setFechaVisita] = useState<Date | null>(null);
  const [fechaValida, setFechaValida] = useState(true);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleIncrement = (id: number) => {
    setCantidadPorTipo((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: number) => {
    setCantidadPorTipo((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const validarFecha = (date: Date) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return date >= hoy;
  };

  const totalBoletos = Object.values(cantidadPorTipo).reduce((a, b) => a + b, 0);

  const subtotal =
    tiposBoletos?.reduce((acc, tipo) => {
      const cantidad = cantidadPorTipo[tipo.TipoBoletoId] || 0;
      return acc + cantidad * tipo.Precio;
    }, 0) ?? 0;

  const formatoFecha = fechaVisita
    ? fechaVisita.toLocaleDateString("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No seleccionada";

  // Filtramos solo lo seleccionado para mostrar en el diálogo
  const detalleSeleccionado = useMemo(() => {
    if (!tiposBoletos) return [];
    return tiposBoletos
      .map((t) => ({
        ...t,
        Cantidad: cantidadPorTipo[t.TipoBoletoId] || 0,
        Total: (cantidadPorTipo[t.TipoBoletoId] || 0) * t.Precio,
      }))
      .filter((x) => x.Cantidad > 0);
  }, [tiposBoletos, cantidadPorTipo]);

  const handleCrearCompra = () => {
    if (!usuarioId || !fechaVisita || totalBoletos === 0) return;

    const payload = {
      UsuarioId: usuarioId,
      FechaVisita: fechaVisita.toISOString(),
      DetalleCompra: Object.entries(cantidadPorTipo)
        .filter(([, cantidad]) => cantidad > 0)
        .map(([tipoId, cantidad]) => ({
          TipoBoletoId: Number(tipoId),
          Cantidad: cantidad,
        })),
    };

    crearCompra(payload, {
      onSuccess: (data) => {
        setConfirmVisible(false);
        navigate("/payment", {
          state: {
            compraId: data.Value.CompraId,
            clientSecret: data.Value.ClientSecret,
          },
        });
      },
      onError: (err) => {
        console.error("Error creando la compra:", err);
        alert("Ocurrió un error al crear la compra.");
      },
    });
  };

  const openConfirm = () => {
    // Evitamos abrir si no cumple condiciones
    if (totalBoletos === 0 || !fechaVisita || !fechaValida || isPending) return;
    setConfirmVisible(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 surface-100">
      <div className="w-full max-w-md">
        <Card
          className="shadow-4 border-round-xl overflow-hidden"
          title={
            <div className="flex flex-column gap-2">
              <div className="flex justify-content-between align-items-center">
                <span className="text-xl font-bold">Selecciona tus Boletos</span>
                <Badge value={totalBoletos} severity="success" className="mr-2" style={{ minWidth: "2.5rem" }} />
              </div>
              <div className="flex align-items-center gap-2 mt-2">
                <i className="pi pi-calendar text-primary"></i>
                <span className="font-medium text-sm">
                  Fecha de visita:
                  <span className={`ml-2 ${fechaVisita ? "text-primary font-semibold" : "text-500"}`}>{formatoFecha}</span>
                </span>
              </div>
            </div>
          }
        >
          {/* Selector de Fecha */}
          <div className="mb-2">
            <label className="block text-700 font-medium mb-2">Selecciona tu fecha de visita:</label>
            <Calendar
              value={fechaVisita}
              onChange={(e) => {
                const nuevaFecha = e.value as Date | null;
                setFechaVisita(nuevaFecha);
                setFechaValida(nuevaFecha ? validarFecha(nuevaFecha) : false);
              }}
              dateFormat="dd/mm/yy"
              showIcon
              className="w-full"
              placeholder="Selecciona una fecha"
              minDate={new Date()}
              inputClassName="w-full"
            />
            {!fechaValida && fechaVisita && (
              <small className="text-red-500 mt-1 block">Por favor selecciona una fecha válida (hoy o en el futuro)</small>
            )}
          </div>

          {/* Lista de Boletos */}
          {isLoading ? (
            <div className="flex flex-column align-items-center py-5">
              <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="6" animationDuration=".5s" />
              <p className="mt-4 text-600">Cargando tipos de boletos...</p>
            </div>
          ) : (
            <div className="flex flex-column gap-2">
              <h3 className="text-lg font-semibold border-bottom-1 surface-border pb-2">Tipos de Boletos Disponibles</h3>

              {tiposBoletos?.map((tipo) => (
                <div
                  key={tipo.TipoBoletoId}
                  className="flex align-items-center justify-content-between p-3 border-round surface-card shadow-1 hover:shadow-2 transition-shadow"
                >
                  <div>
                    <p className="font-semibold m-0">{tipo.Descripcion}</p>
                    <p className="text-sm text-600 mt-1">${tipo.Precio.toFixed(2)} c/u</p>
                  </div>
                  <div className="flex align-items-center gap-2">
                    <Button
                      icon="pi pi-minus"
                      onClick={() => handleDecrement(tipo.TipoBoletoId)}
                      className="p-button-rounded p-button-text p-button-sm"
                      disabled={!cantidadPorTipo[tipo.TipoBoletoId]}
                      tooltip="Reducir cantidad"
                      tooltipOptions={{ position: "top" }}
                    />
                    <span className="w-2rem text-center font-medium">{cantidadPorTipo[tipo.TipoBoletoId] || 0}</span>
                    <Button
                      icon="pi pi-plus"
                      onClick={() => handleIncrement(tipo.TipoBoletoId)}
                      className="p-button-rounded p-button-text p-button-sm"
                      tooltip="Aumentar cantidad"
                      tooltipOptions={{ position: "top" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <Divider className="my-4" />

          {/* Resumen de compra */}
          <div className="flex flex-column gap-3">
            <div className="flex justify-between align-items-center">
              <span className="font-medium text-700">Total de Boletos:</span>
              <span className="font-bold text-900">{totalBoletos}</span>
            </div>
            <div className="flex justify-between align-items-center">
              <span className="font-medium text-700">Subtotal:</span>
              <span className="font-bold text-xl text-primary">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-column md:flex-row gap-3 mt-5">
            <Button
              label="Volver"
              icon="pi pi-arrow-left"
              className="w-full md:w-6 p-button-secondary"
              onClick={() => navigate("/steps")}
            />

            <Button
              label="Continuar con el pago"
              icon="pi pi-arrow-right"
              iconPos="right"
              className="w-full md:w-6 py-3 border-round-lg"
              severity="success"
              disabled={totalBoletos === 0 || !fechaVisita || !fechaValida || isPending}
              loading={isPending}
              onClick={openConfirm}
            />
          </div>
        </Card>
      </div>

      {/* Dialog de confirmación */}
      <Dialog
        header="Confirmar compra"
        visible={confirmVisible}
        style={{ width: "32rem", maxWidth: "95vw" }}
        modal
        draggable={false}
        onHide={() => !isPending && setConfirmVisible(false)}
        footer={
          <div className="flex justify-content-end gap-2">
            <Button
              label="Cancelar"
              className="p-button-text"
              disabled={isPending}
              onClick={() => setConfirmVisible(false)}
            />
            <Button
              label={isPending ? "Procesando..." : "Confirmar y pagar"}
              icon="pi pi-check"
              severity="success"
              loading={isPending}
              onClick={handleCrearCompra}
            />
          </div>
        }
      >
        <div className="text-sm">
          <p className="mb-3">
            <span className="font-medium">Fecha de visita:</span>{" "}
            <span className="text-primary font-semibold">{formatoFecha}</span>
          </p>

          {detalleSeleccionado.length > 0 ? (
            <div className="border-1 surface-border border-round p-2">
              <div className="flex font-medium text-700 mb-2">
                <span className="flex-1">Tipo</span>
                <span style={{ width: 60, textAlign: "right" }}>Cant.</span>
                <span style={{ width: 100, textAlign: "right" }}>Precio</span>
                <span style={{ width: 110, textAlign: "right" }}>Total</span>
              </div>
              {detalleSeleccionado.map((row) => (
                <div key={row.TipoBoletoId} className="flex py-1">
                  <span className="flex-1">{row.Descripcion}</span>
                  <span style={{ width: 60, textAlign: "right" }}>{row.Cantidad}</span>
                  <span style={{ width: 100, textAlign: "right" }}>${row.Precio.toFixed(2)}</span>
                  <span style={{ width: 110, textAlign: "right" }}>${row.Total.toFixed(2)}</span>
                </div>
              ))}
              <Divider className="my-2" />
              <div className="flex font-bold">
                <span className="flex-1">Subtotal</span>
                <span style={{ width: 60 }}></span>
                <span style={{ width: 100 }}></span>
                <span style={{ width: 110, textAlign: "right" }}>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <p>No hay boletos seleccionados.</p>
          )}

          <small className="block mt-3 text-600">
            Al confirmar, se creará la compra y serás redirigido al pago. Podrás ver tu factura y código QR al finalizar.
          </small>
        </div>
      </Dialog>
    </div>
  );
};

export default ComprarBoletos;
