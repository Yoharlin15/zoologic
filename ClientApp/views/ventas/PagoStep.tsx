import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement
} from "@stripe/react-stripe-js";
import { Button } from "primereact/button";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !compraId) return;

    setLoading(true);
    setErrorMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmacion-pago`,
      },
      redirect: "if_required", // 👈 importante para que no redirija automáticamente
    });

    if (error) {
      setErrorMessage(error.message || "Ocurrió un error al procesar el pago.");
      setLoading(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      // Guardar el pago en el backend
      crearPago(
        {
          CompraId: compraId,
          StripePaymentIntentId: paymentIntent.id,
        },
        {
          onSuccess: (data) => {
            console.log("Respuesta del backend al crear pago:", data);

            navigate("/successful-payment", {
              state: {
                compraId,
                codigoQR: data.Value.CodigoQR
              },
            });
          },
        }
      );
    } else {
      setErrorMessage("El pago no fue exitoso.");
    }

    setLoading(false);
  };

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
    </div>
  );
};

export default PagoStep;
