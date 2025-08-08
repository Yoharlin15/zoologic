import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, Navigate } from "react-router-dom";
import PagoStep from "./PagoStep";

// Cargar la clave pública de Stripe desde el .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const Paso2PagoWrapper = () => {
  const { state } = useLocation();
  const clientSecret: string | undefined = state?.clientSecret;

  if (!clientSecret) {
    // Si no se proporciona el clientSecret, redirige a la vista de boletos
    return <Navigate to="/boletos" />;
  }

  const options = {
    clientSecret: clientSecret,
    appearance: {
      theme: "stripe" as const, // compatible con el tipo esperado
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PagoStep />
    </Elements>
  );
};

export default Paso2PagoWrapper;
