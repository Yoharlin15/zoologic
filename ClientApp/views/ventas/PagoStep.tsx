import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement
} from "@stripe/react-stripe-js";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreatePago } from "ClientApp/hooks/useMutation/useMutationPago";

const PagoStep = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { compraId } = state || {};
  const { mutate: crearPago } = useCreatePago();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);

  // Se abre el diálogo en lugar de pagar directo
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !compraId) return;
    setConfirmVisible(true);
  };

  // Lógica real de pago (se ejecuta al confirmar en el diálogo)
  const proceedPayment = async () => {
    if (!stripe || !elements || !compraId) return;

    setLoading(true);
    setErrorMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmacion-pago`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "Ocurrió un error al procesar el pago.");
      setLoading(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      crearPago(
        {
          CompraId: compraId,
          StripePaymentIntentId: paymentIntent.id,
        },
        {
          onSuccess: (data) => {
            navigate("/successful-payment", {
              state: {
                compraId,
                codigoQR: data.Value.CodigoQR,
                facturaId: data.Value.FacturaId,
                validationUrl: data.Value.ValidationUrl,
              },
            });
          },
          onError: () => {
            setErrorMessage(
              "El pago fue procesado, pero ocurrió un problema al registrar la transacción. Contacta soporte con tu comprobante."
            );
          },
          onSettled: () => setLoading(false),
        }
      );
    } else {
      setErrorMessage("El pago no fue exitoso.");
      setLoading(false);
    }
  };

  const confirmFooter = (
    <div className="flex gap-2 justify-end">
      <Button
        label="Cancelar"
        className="p-button-text"
        onClick={() => setConfirmVisible(false)}
        disabled={loading}
      />
      <Button
        label={loading ? "Procesando..." : "Sí, pagar"}
        onClick={() => {
          setConfirmVisible(false);
          proceedPayment();
        }}
        disabled={loading}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="max-w-lg w-full">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Realiza tu pago</h2>

          <PaymentElement />

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          <Button
            type="submit"
            label={loading ? "Procesando..." : "Pagar"}
            className="w-full mt-4"
            disabled={loading || !stripe || !elements}
          />
        </form>
      </div>

      {/* Diálogo de confirmación */}
      <Dialog
        header="Confirmar pago"
        visible={confirmVisible}
        style={{ width: "32rem", maxWidth: "90vw" }}
        onHide={() => !loading && setConfirmVisible(false)}
        footer={confirmFooter}
        closable={!loading}
        blockScroll
        modal
      >
        <div className="space-y-2">
          <p className="text-base">
            ¿Estás seguro de que deseas proceder con el pago?
          </p>
          <p className="text-sm text-gray-600">
            <strong>Importante:</strong> No se realizan reembolsos una vez
            facturadas las entradas.
          </p>
        </div>
      </Dialog>
    </div>
  );
};

export default PagoStep;
